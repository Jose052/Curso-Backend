import express from 'express'
import routerProducts from './routers/products.routers.js'
import routerCarts from './routers/carts.routers.js'

const app = express()


let puerto = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products/', routerProducts)
app.use('/api/carts/', routerCarts)



app.listen(puerto, ()=>{
    console.log('servidor escuchando en el puerto: '+puerto)
})