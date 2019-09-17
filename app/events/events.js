'use strict';

const docController = require('../controllers/doc.js')
const stepController = require('../controllers/step.js')
const schema = require('../../schema.js')
const Step = require('prosemirror-transform').Step


var events = function(socket) {
	var nspName = socket.nsp.name
	console.log("Namespace: "+nspName)

	socket.on('update', async ({ version, clientID, steps }) => {
		var storedData = docController.getDoc(nspName)

	    // version mismatch: the stored version is newer
	    // so we send all steps of this version back to the user
	    if (storedData.version !== version) {
	      socket.emit('update', {
	        version,
	        steps: stepController.getSteps(version),
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
	    })
	    

        return
	})

	socket.on('disconnect', () => {
		console.log('main.disconnect')
    	socket.nsp.emit('getCount', socket.server.engine.clientsCount) 
	})

  	socket.emit('init', docController.getDoc(nspName))
    socket.nsp.emit('getCount', socket.server.engine.clientsCount) 

}


module.exports = events