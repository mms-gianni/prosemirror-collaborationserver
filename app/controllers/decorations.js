const fs = require('fs')
const config = require('../../config.js')

exports.getDecoration = function (docName) {
  //console.log("getDecoration: "+docName)
  try {
    return JSON.parse(fs.readFileSync(config.docPath+docName+"-decoration.json", 'utf8'))
  } catch(e) {
    return {}
  }
}

exports.storeDecoration = function(data, docName) {
  //console.log("storeDecoration: "+docName)

  //console.log(data)
  fs.writeFileSync(config.docPath+docName+"-decoration.json", JSON.stringify(data))
}