import { Router } from "express";
import ProductManager from "../utils/class/ProductManager.js";

const router = Router();
const productManager = new ProductManager();


router.post('/addProduct', async(req, res)=>{
    console.log('body:',req.body)
    const { title, description, price, image, code, stock } = req.body;
    //const image = req.file.originalname
    const auto = await productManager.addProduct(title, description, price, image, code, stock)
    res.status(200).send(auto)
});



export default router