//import { Schema} from 'prosemirror-model'
const Schema = require('prosemirror-model').Schema

const schema = {
  "nodes": {
    "doc": {
      "content": "block+"
    },
    "text": {
      "group": "inline"
    },
    "paragraph": {
      "content": "inline*",
      "group": "block",
      "draggable": false,
      "parseDOM": [
        {
          "tag": "p"
        }
      ]
    },
    "hard_break": {
      "inline": true,
      "group": "inline",
      "selectable": false,
      "parseDOM": [
        {
          "tag": "br"
        }
      ]
    },
    "heading": {
      "attrs": {
        "level": {
          "default": 1
        }
      },
      "content": "inline*",
      "group": "block",
      "defining": true,
      "draggable": false,
      "parseDOM": [
        {
          "tag": "h1",
          "attrs": {
            "level": 1
          }
        },
        {
          "tag": "h2",
          "attrs": {
            "level": 2
          }
        },
        {
          "tag": "h3",
          "attrs": {
            "level": 3
          }
        }
      ]
    },
    "blockquote": {
      "content": "block+",
      "group": "block",
      "parseDOM": [
        {
          "tag": "blockquote"
        }
      ]
    }
  },
  "marks": {
    "bold": {
      "parseDOM": [
        {
          "tag": "strong"
        },
        {
          "tag": "b"
        },
        {
          "style": "font-weight"
        }
      ]
    },
    "code": {
      "parseDOM": [
        {
          "tag": "code"
        }
      ]
    },
    "italic": {
      "parseDOM": [
        {
          "tag": "i"
        },
        {
          "tag": "em"
        },
        {
          "style": "font-style=italic"
        }
      ]
    },
    "underline": {
      "parseDOM": [
        {
          "tag": "u"
        },
        {
          "tag": "em"
        },
        {
          "style": "text-decoration: underline"
        }
      ]
    },
    "strike": {
      "parseDOM": [
        {
          "tag": "s"
        },
        {
          "tag": "em"
        },
        {
          "style": "text-decoration: line-through;"
        }
      ]
    }
  }
}

module.exports = new Schema(schema)