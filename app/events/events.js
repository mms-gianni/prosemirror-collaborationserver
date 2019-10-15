'use strict';

const DocController = require('../controllers/doc.js')
const StepController = require('../controllers/step.js')
const DecorationsController = require('../controllers/decorations.js')
const Schema = require('../schemas/schema.js')
const Step = require('prosemirror-transform').Step
const config = require('../../config.js')


var events = function(socket) {
    var nspName = socket.nsp.name
    //console.log("Namespace: "+nspName)

    // Join a cursor room to broadcast without your self
    socket.join("cursor", () => {
        let rooms = Object.keys(socket.rooms);
        console.log(rooms); 
        const cursorDecorations = DecorationsController.getDecoration(nspName)
        socket.emit('cursorupdate', cursorDecorations)
    });

    socket.on('update', async ({ version, clientID, steps, cursor}) => {
        var storedData = DocController.getDoc(nspName)
       
        const cursorDecorations = {}

        // version mismatch: the stored version is newer
        // so we send all steps of this version back to the user
        if (storedData.version !== version) {
            socket.emit('update', {
                version,
                steps: StepController.getSteps(version, nspName),
                decorations: cursorDecorations,
                clientID: socket.id
            })
          return
        }

        let doc = Schema.nodeFromJSON(storedData.doc)

        let newSteps = steps.map(step => {
            const newStep = Step.fromJSON(Schema, step)
            newStep.clientID = socket.id

            // apply step to document
            let result = newStep.apply(doc)
            doc = result.doc

            return newStep
        })

        // calculating a new version number is easy
        const newVersion = version + newSteps.length


        // store data
        StepController.storeSteps({ version, steps: newSteps }, nspName)
        DocController.storeDoc({ version: newVersion, doc }, nspName)

        // send update to everyone (me and others)
        socket.nsp.emit('update', {
            version: newVersion,
            steps: StepController.getSteps(version, nspName),
            decorations: cursorDecorations,
            clientID: socket.id
        })
        
        return
    })

    socket.on('disconnect', () => {
        //console.log('main.disconnect')
        socket.nsp.emit('getCount', socket.server.engine.clientsCount) 

        // delete Cursor, since user is not connected
        const cursorDecorations = DecorationsController.getDecoration(nspName)
        delete cursorDecorations[socket.id] 
        socket.to('cursor').emit('cursorupdate', cursorDecorations) 
        DecorationsController.storeDecoration(cursorDecorations, nspName)

        return
    })

    // Update collaborators about your cursor postition
    socket.on('cursorchange', async (participant) => {
        //console.log('main.cursorchange')
        const cursorDecorations = DecorationsController.getDecoration(nspName)
        cursorDecorations[socket.id] = participant
        cursorDecorations[socket.id]['clientID'] = socket.id
        socket.to('cursor').emit('cursorupdate', cursorDecorations)
        DecorationsController.storeDecoration(cursorDecorations, nspName)

        return
    })
    
    socket.emit('init', DocController.getDoc(nspName))


    socket.nsp.emit('getCount', socket.server.engine.clientsCount) 

}


module.exports = events