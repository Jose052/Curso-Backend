import express from 'express'
import userRouter from  './routers/users.router.js'
import mongoose from 'mongoose'

const app = express()
const puerto = 8080
const httpserver = app.listen(8080, ()=> console.log(`servidor escuchando en el puerto ${puerto}`))

mongoose.connect('mongodb+srv://Jose:7Jlppnxpln13ZssC@cluster0.mdnuwav.mongodb.net/?retryWrites=true&w=majority')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter)