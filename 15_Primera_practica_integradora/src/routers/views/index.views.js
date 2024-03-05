import { Router } from "express";

import { Products as PM } from "../../data/mongo/manager.mongo.js";

import productsRouter from "./products.view.js";
import usersRouter from "./users.views.js";

const viewsRouter = Router();

viewsRouter.get("/", async(req, res, next) => {
  try {
    const Products = await PM.read();
    console.log('Products:',Products)
    return res.render("index", { Products : Products , title: "HOME" });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("", productsRouter);
viewsRouter.use("", usersRouter);

export default viewsRouter;
