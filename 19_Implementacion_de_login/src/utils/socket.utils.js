import { socketServer } from "../../server.js";
import { Products as PM } from "../data/mongo/manager.mongo.js";
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
};
