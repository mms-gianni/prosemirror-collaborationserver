
let allowedOrigins = process.env.ALLOWEDORIGINS || '*:*'
let port = process.env.PORT || 3000
let docPath = '/tmp'
let maxStoredSteps = process.env.MAXSTOREDSTEPS || 1000
/*let defaultData = {
  "version": 0,
  "doc": { "type": "doc", "content": [{ "type": "paragraph", "content":[{ "type": "text", "text": "Let's start collaborating. Yeah!" }] }] }
}
*/
let defaultData = {
  "version": 0,
  "doc": {
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": {
          "level": 1
        },
        "content": [
          {
            "type": "text",
            "text": "Ich liebe Hip-Hop – bin es aber nicht"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Es gibt einen Grund, wieso ich bisher nie am Openair Frauenfeld war. Hip-Hop ist für mich eine Musikrichtung, eine Szene und kulturelle Bewegung, die ich von aussen betrachte. Nicht aber ein - und vor allem nicht mein - Lebensgefühl. Dieses Jahr fahre ich aber ans grösste Hip-Hop-Festival Europas."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Ja ich liebe Hip-Hop. Lebe ihn aber nicht. Als Ende 80er erste Schulkollegen mit Public Enemy- und "
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "bold"
              }
            ],
            "text": "Run-D.M.C"
          },
          {
            "type": "text",
            "text": ".-Shirts rumhingen, hielt ich sie für verrückt. Ich war ein Teenie mit Gitarren im Bauch und Bier in der Birne. Mit dem Kiffen wuchs das Interesse für Reggae und Musik aus den 60ern und 70ern. Nicht aber für Rapper in zu grossen Klamotten, bei welchen noch die Preisschilder dran waren. Ja, liebe Leute, ich habe Rap und Hip-Hop damals schlicht und einfach nicht verstanden. "
          }
        ]
      },
      {
        "type": "blockquote",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "Nicht einmal im Ansatz."
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "marks": [
              {
                "type": "bold"
              }
            ],
            "text": "Aerosmith als Türöffner"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Als sich Run-D.M.C. 1986 den Aerosmith-Klassiker "
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "bold"
              }
            ],
            "text": "«Walk This Way»"
          },
          {
            "type": "text",
            "text": " krallten und ich auf MTV "
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "italic"
              }
            ],
            "text": "(damals stand das „M“ von MTV tatsächlich noch für Musik)"
          },
          {
            "type": "text",
            "text": " sah, dass sich meine grossen Helden, Originalinterpreten und Urheber des Songs, Steven Tyler und Joe Perry, für diese Kollaboration gewinnen liessen, war ich fasziniert. Endlos fasziniert."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Zugeben, dass dieses verdammte Crossover-Glanzstück schlichtweg besser war als das Original, konnte ich allerdings erst Jahre später. Der Magnetismus dieser Perle, die wohl vielen genre-verkrampften Teenies aus den 80ern eine Tür aufgestossen hat, ist für mich noch heute unbeschreiblich."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "marks": [
              {
                "type": "bold"
              }
            ],
            "text": "Und dann? Haare ab und Hose runter?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Nein. Meine wachsende Begeisterung für Rap-Musik sah man mir nicht an. Es war der Grunge und nicht der Hip-Hop, der meinen Look Anfang 90er stark beeinflusste. Danach wurde ich zum Shirts-"
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "underline"
              }
            ],
            "text": "Jeans-Chucks-Langweiler"
          },
          {
            "type": "text",
            "text": ". Mein Hörverhalten und Popverständnis hingegen wurde vom Hip-Hop nachhaltig geprägt."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Und irgendwann realisierte ich auch, dass ich Rap mochte, bevor es ihn offiziell und so eingebettet in die Hip-Hop-Kultur überhaupt gab. Was zum Beispiel Bob Dylan in den 60ern an Sprechgesang ablieferte, wurde zwar nicht Rap genannt, überzeugte aber natürlich nicht zuletzt durch seinen Flow."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "marks": [
              {
                "type": "bold"
              }
            ],
            "text": "Danke Hip-Hop"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Das Beste am Hip-Hop ist aber, dass er nicht totzukriegen ist. Natürlich ist auch Rockmusik alles andere als tot. Doch beim Hip-Hop… STOP! Während ich dies schreibe, realisiere ich, dass ich eigentlich gar nicht mehr in Genres denke. Der Grund, wieso ich Hip-Hop und Rap nach wie vor attraktiv finde, hat vor allem damit zu tun, dass er längst nicht mehr puristisch durch die Gassen zieht."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Vielleicht beansprucht der bekennende Hip-Hopper für sich und sein Verständnis des hier zentralen Terminus eine gewisse orthodoxe Haltung. Aber das betrifft mich ja nicht. Denn: Ich liebe es einfach. Ich lebe es nicht. Und so fahre ich in diesem Jahr ans Openair Frauenfeld und betreibe da dann wohl Feldforschung. Oder so."
          }
        ]
      }
    ]
  }
}


const config = {
	"port": port,
	"docPath": docPath,
	"maxStoredSteps": maxStoredSteps,
	"defaultData": defaultData,
	'allowedOrigins': allowedOrigins,
}

module.exports = config;