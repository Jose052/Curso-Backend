import { Router } from "express";
import { Users as UM} from "../../data/mongo/manager.mongo.js"
import propsUsers from "../../middlewares/propsUsers.mid.js";

const usersRouter = Router();

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const newUser = req.body;
    const response = await UM.create(newUser);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const sortAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { name: 1 },
    };
    const filter = {};
    if (req.query.name) {
      filter.name = new RegExp(req.query.name.trim(), "i");
    }
    if (req.query.sort === "desc") {
      sortAndPaginate.sort.name = "desc";
    }
    const response = await UM.read( filter, sortAndPaginate );
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const response = await UM.readOne(userId);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const response = await UM.destroy(userId);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const data = req.body;
    const response = await UM.update(userId, data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
