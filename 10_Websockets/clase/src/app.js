import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import {Server} from 'socket.io'

import viewsRouter from './routers/views.router.js'
import routerProducts from './routers/products.routers.js'
import routerCarts from './routers/carts.routers.js'


const app = express()
app.use(express.static(__dirname+"/public"))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


let puerto = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', viewsRouter)
app.use('/api/products/', routerProducts)
app.use('/api/carts/', routerCarts)



 const expressServer = app.listen(puerto, ()=>{
    console.log('servidor escuchando en el puerto: '+puerto)
})

const socketServer = new Server(expressServer)

const mensajes = []
socketServer.on("connection", (socket)=>{


    console.log('conexion establecida')
    socket.on("message", (data) => {
        mensajes.push({socketId: socket.id, mensaje: data})//procesa el mensaje y se guarda en un arreglo
        socketServer.emit('imprimir', mensajes)//se envia una ves se almacena se emite
    })
})

