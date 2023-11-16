import { Router } from "express";
import PM from '../class/ProductManager.js'
import { uploader } from "../utils.js";
const ProductManager = new PM();

const router = Router()

router.get('/products', async(req, res)=>{
    const limit = req.query.limit
    const products = await ProductManager.getProducts()
    if(limit != undefined){
        res.send(products.slice(0,limit))
    }else{
        res.send(products)
    }
    
})


router.get('/products/:id', async(req, res)=>{
    const id = req.params.id
    const products = await ProductManager.getProductById(Number(id))
    res.send(products)
})


router.post('/imageUpload', uploader.single('thumbnail'), (req, res)=>{
    const file = req.file
    console.log(file)
    const Product = req.body;
    res.send({status: `imagen de ${Product} cargada exitosamente!`})
})


export default router;