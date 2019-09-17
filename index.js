/*
const fs = require('fs')
const schema = require('./schema.js')
const Step = require('prosemirror-transform').Step
*/

const io = require("socket.io");


var config = require('./config.js')
/*
const port = process.env.PORT || 3000
const simulateSlowServerDelay = 0 // milliseconds
const docPath = '/tmp/db.json'
const stepsPath = '/tmp/db_steps.json'
const maxStoredSteps = 1000
const defaultData = {
  "version": 0,
  "doc": { "type": "doc", "content": [{ "type": "paragraph", "content":[{ "type": "text", "text": "Let's start collaborating. Yeah!" }] }] }
}
*/

var events = require('./app/events/events.js')
const server = io.listen(config.port);
/*
const sleep = (ms) => (new Promise(resolve => setTimeout(resolve, ms)));

function storeDoc(data) {
  console.log("storeDoc")
  fs.writeFileSync(docPath, JSON.stringify(data, null, 2))
}

function storeSteps({steps, version}) {
  const oldData = JSON.parse(fs.readFileSync(stepsPath, 'utf8'))
  const limitedOldData = oldData.slice(Math.max(oldData.length - maxStoredSteps))

  console.log("storeSteps")
  const newData = [
    ...limitedOldData,
    ...steps.map((step, index) => {
      return {
        step: JSON.parse(JSON.stringify(step)),
        version: version + index + 1,
        clientID: step.clientID,
      }
    })
  ]

  fs.writeFileSync(stepsPath, JSON.stringify(newData))
}

function getSteps(version) {
  console.log("getSteps")
  try {
    const steps = JSON.parse(fs.readFileSync(stepsPath, 'utf8'))
    return steps.filter(step => step.version > version)
  } catch(e) {
    return []
  }
}

function getDoc() {
  console.log("getDoc")
  try {
    return JSON.parse(fs.readFileSync(docPath, 'utf8'))
  } catch(e) {
    return defaultData
  }
}
*/

server.of(/^\/dynamic-\d+$/).on("connection", events)
//server.of('/my-namespace').on("connection", events)
//server.on("connection", events)

/*
server.on("connection", socket => {  
  socket.on('update', async ({ version, clientID, steps }) => {

    const storedData = getDoc()

    await sleep(simulateSlowServerDelay)

    // version mismatch: the stored version is newer
    // so we send all steps of this version back to the user
    if (storedData.version !== version) {
      socket.emit('update', {
        version,
        steps: getSteps(version),
      })
      return
    }

    let doc = schema.nodeFromJSON(storedData.doc)

    await sleep(simulateSlowServerDelay)

    let newSteps = steps.map(step => {
      const newStep = Step.fromJSON(schema, step)
      newStep.clientID = clientID

      // apply step to document
      let result = newStep.apply(doc)
      doc = result.doc

      return newStep
    })

    await sleep(simulateSlowServerDelay)

    // calculating a new version number is easy
    const newVersion = version + newSteps.length

    // store data
    storeSteps({ version, steps: newSteps })
    storeDoc({ version: newVersion, doc })

    await sleep(simulateSlowServerDelay)

    // send update to everyone (me and others)
    console.log(io)
    server.sockets.emit('update', {
      version: newVersion,
      steps: getSteps(version),
    })

  })
  
  // send latest document
  socket.emit('init', getDoc())
  console.log('init')
  
  // send client count
  server.sockets.emit('getCount', server.engine.clientsCount)
  socket.on('disconnect', () => {
    server.sockets.emit('getCount', server.engine.clientsCount)
  })
  
})
*/
