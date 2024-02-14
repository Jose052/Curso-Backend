import fs from "fs";
import crypto from "crypto";

class orderManager {
  init() {
    try {
      const file = fs.existsSync(this.path);
      if (file) {
        this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } else {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      }
    } catch (error) {
      throw error;
    }
  }
  constructor(path) {
    this.path = path;
    this.Orders = [];
    this.init();
  }

  read() {
    try {
      const error = new Error("no hay ordenes!");
      if (this.orders.length === 0) {
        error.statusCode === 404;
        throw error;
      } else {
        return this.orders;
      }
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const error = new Error("todos los campos son obligatorios!");
      if (!data.pid || !data.uid || !data.quantity) {
        error.statusCode = 400;
        throw error;
      }
      const newOrder = {
        id: crypto.randomBytes(12).toString("hex"),
        uid: data.uid,
        pid: data.pid,
        quantity: data.quantity,
        state: 0,
      };
      this.orders.push(newOrder);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, "\t")
      );
      return newOrder.id;
    } catch (error) {
      throw error;
    }
  }

  readOne(uid) {
    try {
      const error = new Error(
        `el usuario con el id ${uid} no a creado ninguna orden!`
      );
      const orderByUser = this.orders.find((order) => order.uid === uid);
      if (!orderByUser) {
        error.statusCode = 404;
        throw error;
      }
      return orderByUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const error = new Error(`la orden con el id ${id} no existe!`);
      const orders = this.orders;
      if (orders.find((order) => order.id === id) === undefined) {
        error.statusCode = 404;
        throw error;
      }
      let index = orders.findIndex((order) => {
        return order.id === id;
      });

      if (data.quantity != undefined) {
        orders[index].quantity = data.quantity;
      }
      orders[index].quantity = orders[index].quantity;

      if (data.state != undefined) {
        orders[index].state = data.state;
      }
      orders[index].state = orders[index].state;

      this.orders = orders;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, "\t")
      );
      return this.orders;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const error = new Error(`Orden con el ${id} no existe`);
      const idOrderToDelete = this.orders.find((order) => order.id === id);
      if (!idOrderToDelete) {
        error.statusCode = 404;
        throw error;
      }
      this.orders = this.orders.filter((order) => order.id !== id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, "\t")
      );
      return this.orders;
    } catch (error) {
      throw error;
    }
  }
}

const OM = new orderManager("./src/data/fs/db/orders.json");
export default OM;
