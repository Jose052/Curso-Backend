import express from "express"
import router from "./src/routers/index.router.js"

const server = express()
const PORT = 8080
const ready = ()=> console.log(`servidor escuchando en el puerto${PORT}`)
server.listen(PORT, ready)

//middlewares
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use("/", router)
