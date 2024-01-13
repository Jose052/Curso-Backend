import express from "express"
import morgan from "morgan"

import router from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

const server = express()
const Port = 8080
const ready =()=> console.log(`Servidor escuhcando en el puerto ${Port}`)

server.listen(Port, ready)

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan("dev"))
//server.use(errorHandler)
//server.use(pathHandler)

server.use("/",router)