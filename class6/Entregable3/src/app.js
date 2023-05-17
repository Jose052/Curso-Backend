import express from 'express'
const app = express()
import PM from './ProductManager.js'
const ProductManager = new PM();

let puerto = 8080

app.use(express.urlencoded({extended:true}))

app.get('/products', async(req, res)=>{
    const limit = req.query.limit
    const products = await ProductManager.getProducts()
    if(limit != undefined){
        res.send(products.slice(0,limit))
    }else{
        res.send(products)
    }
    
})


app.get('/products/:id', async(req, res)=>{
    const id = req.params.id
    const products = await ProductManager.getProductById(Number(id))
    res.send(products)
})



app.listen(puerto, ()=>{
    console.log('servidor escuchando en el puerto: '+puerto)
})