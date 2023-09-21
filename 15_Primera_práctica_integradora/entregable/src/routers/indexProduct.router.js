import { Router } from "express";
import ProductsManager from '../utils/class/ProductManager.js'

const router = Router();
const ProductManager = new ProductsManager();

router.get('/', async(req, res)=>{
    const products = await ProductManager.getProducts();
    res.render('home', {products})
});

router.get('/createp', async(req, res)=>{
    res.render('createp')
});


export default router;
