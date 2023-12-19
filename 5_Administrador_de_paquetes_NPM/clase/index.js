const http = require("http");
const eventsManager = require("../data/fs/events.manager.js");

const events = new eventsManager("../data/fs/evens.json")

events.createEvent({name: "hp1", place: "243"})

const server = http.createServer();

const port = 8080;

const serverReady = () =>
  console.log(`Servidor escuchando en el puerto ${port}`);

server.listen(port, serverReady);
