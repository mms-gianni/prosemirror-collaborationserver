'use strict';

const docController = require('../controllers/doc.js')
const stepController = require('../controllers/step.js')
const decorationsController = require('../controllers/decorations.js')
const schema = require('../../schema.js')
const Step = require('prosemirror-transform').Step


var events = function(socket) {
    var nspName = socket.nsp.name
    console.log("Namespace: "+nspName)

    socket.on('update', async ({ version, clientID, steps, cursor}) => {
        var storedData = docController.getDoc(nspName)

        // load and update decortaions for the cursor
        /*
        const CursorDecorations = decorationsController.getDecoration(nspName)
        CursorDecorations[clientID] = {'position': cursor, 'clientID': clientID} 
        decorationsController.storeDecoration(CursorDecorations, nspName)
        */
        const CursorDecorations = {}

        // version mismatch: the stored version is newer
        // so we send all steps of this version back to the user
        if (storedData.version !== version) {
          socket.emit('update', {
            version,
            steps: stepController.getSteps(version),
            decorations: CursorDecorations,
            clientID: clientID
          })
          return
        }

        let doc = schema.nodeFromJSON(storedData.doc)

        let newSteps = steps.map(step => {
          const newStep = Step.fromJSON(schema, step)
          newStep.clientID = clientID

          // apply step to document
          let result = newStep.apply(doc)
          doc = result.doc

          return newStep
        })

        // calculating a new version number is easy
        const newVersion = version + newSteps.length


        // store data
        stepController.storeSteps({ version, steps: newSteps })
        docController.storeDoc({ version: newVersion, doc }, nspName)

        // send update to everyone (me and others)
        socket.nsp.emit('update', {
            version: newVersion,
            steps: stepController.getSteps(version),
            decorations: CursorDecorations,
            clientID: clientID
        })
        
        return
    })

    socket.on('disconnect', () => {
        console.log('main.disconnect')
        socket.nsp.emit('getCount', socket.server.engine.clientsCount) 

        const CursorDecorations = decorationsController.getDecoration(nspName)
        delete CursorDecorations[socket.id] 
        socket.nsp.emit('cursorupdate', CursorDecorations) 
        decorationsController.storeDecoration(CursorDecorations, nspName)
    })

    socket.on('cursorchange', async ({ clientID, cursor, focused}) => {
        console.log('main.cursorchange')
        const CursorDecorations = decorationsController.getDecoration(nspName)
        CursorDecorations[clientID] = {'clientID': clientID, 'cursor': cursor, 'focused': focused} 
        socket.nsp.emit('cursorupdate', CursorDecorations) 
        decorationsController.storeDecoration(CursorDecorations, nspName)
    })

    socket.on('cursorremove', async ({ clientID}) => {
        console.log('main.cursorremove'+clientID)
        const CursorDecorations = decorationsController.getDecoration(nspName)
        delete CursorDecorations[clientID] 
        socket.nsp.emit('cursorupdate', CursorDecorations) 
        decorationsController.storeDecoration(CursorDecorations, nspName)
    })

    socket.emit('init', docController.getDoc(nspName), decorationsController.getDecoration(nspName))

    var CursorDecorations = decorationsController.getDecoration(nspName)
    socket.emit('cursorupdate', CursorDecorations)

    socket.nsp.emit('getCount', socket.server.engine.clientsCount) 

}


module.exports = events