import { Router } from "express";
import PM from "../../data/fs/ProductManager.js";
import propsProducts from "../../middlewares/propsProducts.mid.js"

const productsRouter = Router()


productsRouter.post("/", propsProducts, async(req, res, next)=>{
    try{
        const newProduct = req.body
        const response = await PM.create(newProduct)
        return res.json({
            statusCode: 201,
            response,
        })
    } catch (error){
        return next(error)
    }
})

productsRouter.get("/", async(req, res, next)=>{
    try{
        const products = await PM.read()
        return res.json({
            statusCode: 200,
            response: products
        })
    } catch (error) {
        return next(error);
      }
})

productsRouter.get("/:pid", async(req, res, next)=>{
    try{
        const productId = req.params.pid
        const response = await PM.readOne(productId)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error);
      }
})

productsRouter.delete("/:pid", async(req, res, next)=>{
    try{
        const productId = req.params.pid
        const response = await PM.destroy(productId)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error);
      }
})

productsRouter.put("/:pid", async(req, res, next)=>{
    try{
        const productId = req.params.pid
        const data = req.body
        const response = await PM.update(productId, data)
        return res.json({
            statusCode: 201,
            response
        })
    } catch (error) {
        return next(error);
      }
})


export default productsRouter;