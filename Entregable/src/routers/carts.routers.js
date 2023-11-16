import { Router } from "express";
import CM from '../class/CartManager.js';
const CartsManager = new CM();

const router = Router();

router.get('/:cid', async(req, res)=>{
    const id = req.params.cid
    try{
        const cart = await CartsManager.getCartsById(Number(id))
        res.send(cart)
    } catch(error){
        res.send({succes:error})
    }
})

router.post('/', async(req, res)=>{
    try{
        const cart = await CartsManager.addCart()
        res.send({succes:cart})
    } catch(error){
        res.send({succes:error})
    }
})

router.post('/:cid/product/:pid', async(req, res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    try{
        const cart = await CartsManager.addProductInCart(Number(cid), Number(pid))
        res.send({succes:cart})
    } catch(error){
        res.send({succes:error})
    }
})
    

export default router;