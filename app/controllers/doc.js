const fs = require('fs')
const config = require('../../config.js')

exports.getDoc = function (docName) {
  console.log("getDoc: "+docName)
  try {
    return JSON.parse(fs.readFileSync(config.docPath+docName+"-db.json", 'utf8'))
  } catch(e) {
    return config.defaultData
  }
}

exports.storeDoc = function(data, docName) {
  console.log("storeDoc: "+docName)
  fs.writeFileSync(config.docPath+docName+"-db.json", JSON.stringify(data, null, 2))
}