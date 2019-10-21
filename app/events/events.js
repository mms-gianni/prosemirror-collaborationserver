'use strict';

const DocController = require('../controllers/doc.js')
const StepController = require('../controllers/step.js')
const DecorationsController = require('../controllers/decorations.js')
const SelectionsController = require('../controllers/selections.js')
const Schema = require('../schemas/schema.js')
const Step = require('prosemirror-transform').Step
const DecorationSet = require('prosemirror-view').DecorationSet
const Decoration = require('prosemirror-view').Decoration
const config = require('../../config.js')


var events = function(socket) {
    var nspName = socket.nsp.name
    //console.log("Namespace: "+nspName)

    socket.on('update', async ({ version, steps, clientID, selection}) => {


        var storedData = DocController.getDoc(nspName)


        var selections = SelectionsController.getSelections({ version: version }, nspName)
        // version mismatch: the stored version is newer
        // so we send all steps of this version back to the user
        if (storedData.version !== version) {
            socket.emit('update', {
                version,
                steps: StepController.getSteps(version, nspName),
                selections: selections,
                clientID: socket.id
            })
          return
        }

        let doc = Schema.nodeFromJSON(storedData.doc)

        console.log(selections)

        let newSteps = steps.map(step => {
            const newStep = Step.fromJSON(Schema, step)

            //console.log(newStep.from)
            //console.log(newStep.slice.content.size)
            //selections = SelectionsController.updateSelections(selections, newStep.from, newStep.slice.content.size)

            newStep.clientID = socket.id

            // apply step to document
            let result = newStep.apply(doc)
            doc = result.doc

            return newStep
        })

        // calculating a new version number is easy
        const newVersion = version + newSteps.length

        // store data
        SelectionsController.storeSelections({ version: newVersion, selection, clientID, socketID: socket.id }, nspName)
        StepController.storeSteps({ version, steps: newSteps }, nspName)
        DocController.storeDoc({ version: newVersion, doc }, nspName)

        // send update to everyone (me and others)

        let update = {
            version: newVersion,
            steps: StepController.getSteps(version, nspName),
            selections: selections,
            clientID: socket.id
        }
        //console.log(update)
        socket.nsp.emit('update', update )
        
        return
    })

    socket.on('disconnect', () => {
        //console.log('main.disconnect')
        socket.nsp.emit('getCount', socket.server.engine.clientsCount) 

        // delete Cursor, since user is not connected
        const cursorDecorations = DecorationsController.getDecoration(nspName)
        delete cursorDecorations[socket.id] 
        socket.nsp.emit('cursorupdate', cursorDecorations) 
        DecorationsController.storeDecoration(cursorDecorations, nspName)

        return
    })

    socket.emit('init', DocController.getDoc(nspName))


    socket.nsp.emit('getCount', socket.server.engine.clientsCount) 

}


module.exports = events