import { Router } from "express";

const authRouter = Router();

authRouter.get("/register", (req, res, next) => {
  try {
    return res.render("register", {
      title: "REGISTER",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/login", (req, res, next) => {
    try {
      return res.render("login", {
        title: "LOGIN",
      });
    } catch (error) {
      next(error);
    }
  });

export default authRouter;