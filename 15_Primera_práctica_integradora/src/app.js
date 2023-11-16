import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io'

import viewsRouter from './routes/views.router.js';
import autosRouter from './routes/autos.router.js';
import {mensajeModel} from './dao/models/mensajes.model.js';

const app = express();

const port = 8080;
const httpserver = app.listen(port, ()=> console.log(`servidor escuchando en el puerto ${port}`));
const socketServer = new Server(httpserver)


mongoose.connect('mongodb+srv://Jose:7Jlppnxpln13ZssC@cluster0.mdnuwav.mongodb.net/?retryWrites=true&w=majority');

app.use(express.json());//permite resibir json en post
app.use(express.urlencoded({extended:true}));// permite trabajar con params

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use('/static', express.static('./public'));
app.use(viewsRouter);
app.use('/autos', autosRouter);

socketServer.on('connection', (socket)=>{
    console.log(`se conecto ${socket.id}`);
    socket.on('mensaje', async (data)=>{
        await mensajeModel.create(data)
        const mensajes = await mensajeModel.find().lean()
        socketServer.emit(`mensaje nuevo ${mensajes}`)
    })
})