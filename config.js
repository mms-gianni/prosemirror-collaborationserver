

let port = process.env.PORT || 3000
let docPath = '/tmp'
let stepsPath = '/tmp'
let maxStoredSteps = process.env.MAXSTOREDSTEPS || 1000
let defaultData = {
  "version": 0,
  "doc": { "type": "doc", "content": [{ "type": "paragraph", "content":[{ "type": "text", "text": "Let's start collaborating. Yeah!" }] }] }
}

const config = {
	"port": port,
	"docPath": docPath,
	"stepsPath": stepsPath,
	"maxStoredSteps": maxStoredSteps,
	"defaultData": defaultData,
}

module.exports = config;