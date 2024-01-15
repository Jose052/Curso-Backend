import { Router } from "express";
import PM from "../../data/fs/ProductManager.js"

import productsRouter from "./products.view.js";
import usersRouter from "./users.views.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next)=>{
    try {
        const products = PM.read()
        return res.render("index", { Products: products, title: "HOME" });
      } catch (error) {
        next(error);
      }
})

viewsRouter.use("", productsRouter);
viewsRouter.use("", usersRouter);

export default viewsRouter;