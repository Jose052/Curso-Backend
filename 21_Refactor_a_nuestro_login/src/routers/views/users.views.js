import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/register", (req, res, next) => {
  try {
    return res.render("register", {
      title: "REGISTER",
    });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
