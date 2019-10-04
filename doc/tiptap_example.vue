<template>
  <div class="editor">
    <h2>
      Collaborative Editing
    </h2>
    <div class="message">
    </div>
    <template v-if="editor && !loading">
      <div class="user-list">
        <div v-for="participant in participants" class="user-block">
          <img class="img-circle img-bordered-sm" src="https://randomuser.me/api/portraits/men/17.jpg" alt="user image" :style="{ border: '2px solid '+participant.displaycolor}">
            <span class="username">
                <a href="#">{{participant.displayname}}</a>
            </span>
        </div>
      </div>
      <div class="count">
        {{ count }} {{ count === 1 ? 'user' : 'users' }} connected
      </div>
      <editor-content class="editor__content" :editor="editor"  />
    </template>
    <em v-else>
      Connecting to socket server …
    </em>
  </div>
</template>

<script>

import io from 'socket.io-client'
import { Editor, EditorContent } from 'tiptap'
import {
  HardBreak,
  Heading,
  Bold,
  Code,
  Italic,
  History,
  Collaboration,
} from 'tiptap-extensions'
import Participants from '../extensions/Participants.js'

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      loading: true,
      editor: null,
      socket: null,
      count: 0,
      participants: null,
    }
  },
  methods: {  
    onInit({ doc, version }) {
      this.loading = false
      if (this.editor) {
        this.editor.destroy()
      }
      this.editor = new Editor({
        content: doc, 
        extensions: [
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Bold(),
          new Code(),
          new Italic(),
          new History(),

          // Participants is currently not a part of tiptap and you have to import it separatly
          new Participants({
            socket: this.socket,
            displayname: document.querySelector('meta[name="userName"]').getAttribute('content'),
            displaycolor: this.getDisplaycolor(this.socket.id),
            //displaycolor: this.getDisplaycolor(document.querySelector('meta[name="userName"]').getAttribute('content')),
            //displaycolor: '#555',
          }),
          new Collaboration({

            // use the socket id as a unique ID
            clientID: this.socket.id,

            // the initial version we start with
            // version is an integer which is incremented with every change
            version,

            // disable debounce, to keep the collaboration cursors on sync with the content (working on it)
            debounce: 0,
            // onSendable is called whenever there are changes we have to send to our server
            onSendable: ({ sendable }) => {
              this.socket.emit('update', sendable)
            },
          }),
        ],
      })
    },
    setCount(count) {
      this.count = count
    },
    setParticipants(participants){
      this.participants = participants
    },

    // Calculate a color based on a string
    getDisplaycolor: (str) => {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = '#';
      for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
      }
      return colour;
    },
  },
  mounted() {

    // use a dynamic path here for yout namespaced document communication instad of "dynamic-99"
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

  },
  beforeDestroy() {
    this.editor.destroy()
    this.socket.destroy()
  },
}
</script>

<style lang="scss">
.selected {

  font-weight: bold;
}
.count {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #27b127;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-size: 0.7rem;
  line-height: 1;
  &:before {
    content: '';
    display: inline-flex;
    background-color: #27b127;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    margin-right: 0.3rem;
  }
}

.cursor.me {
  display: none; /*disable this to see your own cursor */
  /*background-color: #F55;*/ /*enable this to see your own cursor */
}
.cursor.inactive {
    opacity: 0.5;
}
.cursor.me::after{
  display: none;
    border-color: inherit;
}
.cursor.inactive::after {
    opacity: inherit;
    border-color: inherit;
}

.cursor {
    /*background-color: #555;*/ /*enable this to see your own cursor */
    color: #fff;
    text-align: center;
    border-radius: 6px 6px 6px 0px;
    padding: 5px;
    margin-left: -4.5px;
    position: absolute;
    z-index: 1;
    bottom: 5px;
    left: -50%;
    opacity: 0.85;
    white-space: nowrap;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
.cursor::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0%;
  border-width: 5px;
  border-style: solid;
  border-color: inherit
}

.ProseMirror-widget {
  position:absolute;
  width: 0.1px;
}
</style>