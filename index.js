
const io = require("socket.io");
var config = require('./config.js')

var events = require('./app/events/events.js')
const server = io.listen(config.port);
server.origins(config.allowedOrigins);

server.of(/^\/doc-\d+$/).on("connection", events)
