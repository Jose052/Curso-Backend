import { Router } from "express";

import { Products as PM } from "../../data/mongo/manager.mongo.js";

import productsRouter from "./products.view.js";
import usersRouter from "./users.views.js";
import authRouter from "./auth.views.js";

const viewsRouter = Router();

viewsRouter.get("/", async(req, res, next) => {
  try {
    const Products = await PM.read();
    return res.render("index", { Products : Products , title: "HOME" });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("", productsRouter);
viewsRouter.use("", usersRouter);
viewsRouter.use("", authRouter);

export default viewsRouter;
