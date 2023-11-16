import express from 'express'
import handlebars from 'express-handlebars'
import viewsRouter from "./routers/viewRouter.js"
import { Server } from 'socket.io';

const app = express();

const httpServer = app.listen(8080, ()=> console.log('servidor activo'));
const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));


app.use('/', viewsRouter);

const mensajes = [];

socketServer.on('connection', (socket)=>{
    console.log(`se conecto el usuario con el socket id: ${socket.id}`);

    // socket.emit('bienvenido', {
    //     mensaje: `saludos socket ${socket.id}`
    // });

    // socket.broadcast.emit('NewConection', {
    //     mensaje: `el usuario con el socket id ${socket.id} se acab de conectar`
    // })

    // socketServer.emit('todos', {
    //     mensaje:'Hola'
    // })

    socket.on('mensaje', (data)=>{
        mensajes.push({socketId: socket.id, mensaje: data.mensaje})
        socketServer.emit('newContent', mensajes)
    })
});

