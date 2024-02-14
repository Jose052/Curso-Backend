import crypto from "crypto";

class orderManager {
  constructor() {
    this.Orders = [];
  }

  create(pid, uid, quantity) {
    if (!pid || !uid || !quantity) {
      console.log("todos los campos son obligatorios!");
      return;
    }
    const id = crypto.randomBytes(12).toString("hex");
    const newOrder = { id, uid, pid, quantity, state: 0 };
    this.Orders.push(newOrder);
  }

  read() {
    return this.Orders;
  }

  readOne(uid) {
    const orderByUser = this.Orders.filter((order) => order.uid === uid);
    if (orderByUser.length === 0) {
      return `Orden del usuario ${uid} no encontrado`;
    }
    return orderByUser;
  }

  update(id, quantity, state) {
    const orders = this.Orders;
    if (orders.find((order) => order.id === id) === undefined) {
      return `Orden con el id ${id} no encontrado`;
    }
    let index = orders.findIndex((order) => {
      return order.id === id;
    });
    if (quantity != undefined) {
      orders[index].quantity = quantity;
    }
    orders[index].quantity = orders[index].quantity;

    if (state != undefined) {
      orders[index].state = quantity;
    }
    orders[index].state = orders[index].state;
  }

  destroy(id) {
    this.Orders = this.Orders.filter((order) => order.id !== id);
    return this.Orders;
  }
}

const manager = new orderManager();

const env = () => {
  console.log("se crean dos ordenes");
  manager.create("idProducto1", "idUsuario1", 3);
  manager.create("idProducto1", "idUsuario2", 5);

  console.log("se llama a read: ", manager.read());

  console.log(
    "se crea una tercer tercer pero con datos incompletos-->",
    manager.create("producto prueba3")
  );

  const producto1 = manager.read()[0]["uid"];
  console.log(
    "se llama a readOne con el id de la primer orden-->",
    manager.readOne(producto1)
  );

  console.log(
    "se llama a readOne con el id inexistente-->",
    manager.readOne("404")
  );

  console.log(
    "se actualiza la segunda orden-->",
    manager.update(manager.read()[1]["id"], 1, true),
    manager.read()
  );

  console.log(
    "se elimina el primer producto usando su id-->",
    manager.read()[0]["id"],
    manager.destroy(manager.read()[0]["id"])
  );
};
env();
