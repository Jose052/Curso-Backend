import { Router } from "express";

const ordersRouter = Router();

ordersRouter.get("/orders", (req, res, next) => {
  try {
    return res.render("orders", {
      title: "ORDERS",
    });
  } catch (error) {
    next(error);
  }
});

export default ordersRouter;
