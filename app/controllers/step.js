const fs = require('fs')
const config = require('../../config.js')

exports.getSteps = function (version, docName) {
  console.log("getSteps")
  try {
    const steps = JSON.parse(fs.readFileSync(config.stepsPath+docName+"-steps.json", 'utf8'))
    return steps.filter(step => step.version > version)
  } catch(e) {
    return []
  }
}

exports.storeSteps = function ({steps, version}, docName) {
  console.log("storeSteps")
  var oldData = []

  try {
  	oldData = JSON.parse(fs.readFileSync(config.stepsPath+docName+"-steps.json", 'utf8'))
  } catch(e) {
    oldData = []
  }
  const limitedOldData = oldData.slice(Math.max(oldData.length - config.maxStoredSteps))

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

  fs.writeFileSync(config.stepsPath+docName+"-steps.json", JSON.stringify(newData))
}
