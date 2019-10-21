const fs = require('fs')
const config = require('../../config.js')

exports.getSelections = function (version, docName) {
  try {
    const selections = JSON.parse(fs.readFileSync(config.docPath+docName+"-selections.json", 'utf8'))
    return selections
      //.filter(selection => selection.version >= version)
  } catch(e) {
    return []
  }
}

exports.updateSelections = function(selections, pos, length) {
	selections.map(selection_A => {
		//console.log('------------')
		//console.log(selection_A)
	})
	return selections

	if (selection.from > pos) {
		selection.from = selection.from + length
		selection.to = selection.to + length
	}
	//console.log(selections)
	return selections
}

exports.storeSelections = function({ version, selection, clientID, socketID }, docName) {
  let oldData = [] 
  try {
  	oldData = JSON.parse(fs.readFileSync(config.docPath+docName+"-selections.json", 'utf8'))
      // .filter(selection => selection.version >= version)
  } catch(e) {
    oldData = []
  }
  const timeStamp = Date.now()
  
  const newData = oldData
    .filter(item => item.clientID !== clientID)
    .filter(item => item.timeStamp > (timeStamp - 1000 * 60))
  
  newData.push({version, selection, clientID, socketID, timeStamp })
  //console.log(newData)
  fs.writeFileSync(config.docPath+docName+"-selections.json", JSON.stringify(newData))

}