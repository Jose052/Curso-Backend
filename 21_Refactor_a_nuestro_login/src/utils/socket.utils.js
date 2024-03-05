import { socketServer } from "../../server.js";
import { Products as PM } from "../data/mongo/manager.mongo.js";
import { Orders as OM } from "../data/mongo/manager.mongo.js";
import propsProducts from "../utils/propsProducts.mid.js";

export default async (socket) => {
  socket.emit("products", await PM.read());

  socket.on("newItem", async (data) => {
    try {
      propsProducts(data);
      await PM.create(data);
      socketServer.emit("products", PM.read());
      window.location.href = "/products/real";
    } catch (error) {}
  });

  socket.on("filterProduct", async (val) => {
    try {
      const filter = {};
      filter.title = new RegExp(val.trim(), "i");
      console.log(filter)
      socketServer.emit("products", await PM.read(filter));
    } catch (error) {}
  });

  socket.emit("orders", await OM.ordersByUser("65c405d2b343f63a79276e99"));
};
