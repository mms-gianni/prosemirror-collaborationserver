
# Prosemirror Collaboration Socket Server

This socket server manages your collaboration communication between your editors participants. 

It handles multiple documents in parallel and shows also your participants position. It's all ready to run in a Docker instance or Heroku.

An exampleimplementation with vue.js and tiptap can be found here: 
https://tiptap-collaboration-demo.netlify.com/ 

![screencapture](https://github.com/mms-gianni/prosemirror-collaborationserver/raw/master/doc/tiptap_big.gif "Logo Title Text 1")

See full video here : https://www.youtube.com/watch?v=wNdEUkifCao 

## Requirements  
- Docker

## Document
Every Document has his own Socket.io namespace.

## Usage

### Events

#### On update
This event is triggered when a participants has a updated his local document.
 - emits update

#### On disconnect
A participant hast diconnected. Provide your participants with a actual list of participants.
 - emits getCount
 - emits cursorupdate

#### On cursorchange
A participant has changed his cursor position.
 - emits cursorupdate

#### Emit cursorupdate 
Let all your participants know, where your current position is.

#### Emit getCount 
Send the current connected participants.

#### Emit udpate
Send the lates Version of the document to the participants.


### Clientside socket setup 

		this.socket = io('ws://localhost:3000/dynamic-99')
		  // get the current document and its version
		  .on('init', data => this.onInit(data))
		  // send all updates to the collaboration extension
		  .on('update', data => this.editor.extensions.options.collaboration.update(data))
		  // get count of connected users
		  .on('getCount', count => this.setCount(count))
		  // update Cursor position of collaborators
		  .on('cursorupdate', participants => {
		  	this.editor.extensions.options.participants.update(participants)
		  	this.setParticipants(participants)
		  })


## TODO 
- [ ] add mongodb support
- [ ] global participants list (currently only per document)
- [ ] improve logging and remove console.log() messages



