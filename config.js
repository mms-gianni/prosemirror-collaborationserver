
let allowedOrigins = process.env.ALLOWEDORIGINS || '*:*'
let port = process.env.PORT || 3000
let docPath = '/tmp'
let maxStoredSteps = process.env.MAXSTOREDSTEPS || 1000
let defaultData = {
  "version": 0,
  "doc": { "type": "doc", "content": [{ "type": "paragraph", "content":[{ "type": "text", "text": "Let's start collaborating. Yeah!" }] }] }
}

const config = {
	"port": port,
	"docPath": docPath,
	"maxStoredSteps": maxStoredSteps,
	"defaultData": defaultData,
	'allowedOrigins': allowedOrigins,
}

module.exports = config;