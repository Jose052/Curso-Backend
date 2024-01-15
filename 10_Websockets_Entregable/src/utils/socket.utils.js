import { socketServer } from "../../server.js";
import PM from "../data/fs/ProductManager.js"
import propsProducts from "../utils/propsProducts.mid.js"

export default (socket) => {
  socket.emit("products", PM.read());

  socket.on("newItem", async (data) => {
    try {
      propsProducts(data)
      await PM.create(data);
      console.log(data)
      socketServer.emit("products", PM.read());
      window.location.href = '/products/real';
    } catch (error) {

    }
  });
};
