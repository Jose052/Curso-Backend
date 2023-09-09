import { Router } from "express";
import PM from '../class/ProductManager.js'
const ProductManager = new PM();

const router = Router()

router.get('/', async(req, res)=>{
    const limit = req.query.limit
    const products = await ProductManager.getProducts()
    if(limit != undefined){
        res.send(products.slice(0,limit))
    }else{
        res.send(products)
    }
    
})


router.get('/:pid', async(req, res)=>{
    const id = req.params.pid
    const products = await ProductManager.getProductById(Number(id))
    res.send(products)
})


router.post('/', async(req, res)=>{
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const thumbnail = req.body.thumbnail
    const code = req.body.code
    const stock = req.body.stock
    try{
        const addProduct = await ProductManager.addProduct(title,
                                        description,
                                        price,
                                        thumbnail,
                                        code,
                                        stock)
        res.send({status:addProduct})
    } catch(error){
        res.send({status:error})
    }
    
})

router.put('/:pid', async(req, res)=>{
    const id = req.params.pid
    const product = req.body
    try{
        const updateProduct = await ProductManager.updateProduct(Number(id), product)
        res.send({success:updateProduct})
    }catch(error){
        res.send({success:error})
    }
})

router.delete('/:pid', async(req, res)=>{
    const id = req.params.pid
    try{
        const deleteProduct = await ProductManager.deleteProduct(Number(id))
        res.send({success:deleteProduct})
    }catch{
        res.send({success:false})
    }
})

export default router;