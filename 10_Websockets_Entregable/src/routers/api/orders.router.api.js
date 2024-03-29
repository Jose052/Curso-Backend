import { Router } from "express";
import OM from "../../data/fs/OrderManager.js";
import propdOrders from "../../middlewares/propsOrders.mid.js"

const ordersRouter = Router()


ordersRouter.post("/", propdOrders, async(req, res, next)=>{
    try{
        const newOrder = req.body
        const response = await OM.create(newOrder)
        return res.json({
            statusCode: 201,
            response,
        })
    } catch (error){
        return next(error)
    }
})

ordersRouter.get("/", async(req, res, next)=>{
    try{
        const orders = await OM.read()
        return res.json({
            statusCode: 200,
            response: orders
        })
    } catch (error) {
        return next(error);
      }
})

ordersRouter.get("/:uid", async(req, res, next)=>{
    try{
        const userId = req.params.uid
        const response = await OM.readOne(userId)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error);
      }
})

ordersRouter.delete("/:oid", async(req, res, next)=>{
    try{
        const orderId = req.params.oid
        const response = await OM.destroy(orderId)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error);
      }
})

ordersRouter.put("/:oid", async(req, res, next)=>{
    try{
        const orderId = req.params.oid
        const data = req.body
        const response = await OM.update(orderId, data)
        return res.json({
            statusCode: 201,
            response
        })
    } catch (error) {
        return next(error);
      }
})


export default ordersRouter;