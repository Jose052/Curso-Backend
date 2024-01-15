import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/real", (req, res, next)=>{
    try{
        return res.render("real", {
            title: "REAL"
        })
    } catch (error){
        next(error)
    }
})


productsRouter.get("/form", (req, res, next)=>{
    try{
        return res.render("form", {
            title: "newProduct"
        })
    } catch (error){
        next(error)
    }
})

export default productsRouter;