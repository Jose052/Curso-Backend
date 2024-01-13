import crypto from "crypto";

class ProductManager {
  constructor() {
    this.Products = [];
  }

  create(title, photo, price, stock) {
    if (!title || !photo || !price || !stock) {
      console.log("todos los campos son obligatorios!");
      return;
    }
    const id = crypto.randomBytes(12).toString("hex");
    const newProduct = { id, title, photo, price, stock };
    this.Products.push(newProduct);
  }

  read() {
    return this.Products;
  }

  readOne(id) {
    const productById = this.Products.filter((product) => product.id === id);
    if (productById.length == 0) {
      return `Producto con el id ${id} no encontrado`;
    }
    return productById;
  }

  update(id, data) {
    const product = this.Products;
    if (product.find((product) => product.id === id) !== undefined) {
      let index = product.findIndex((data) => {
        return data.id === id;
      });
      if (data.title != undefined) {
        product[index].title = data.title;
      }
      product[index].title = product[index].title;

      if (data.photo != undefined) {
        product[index].photo = data.photo;
      }
      product[index].photo = product[index].photo;

      if (data.price != undefined) {
        product[index].price = data.price;
      }
      product[index].price = product[index].price;

      if (data.price != undefined) {
        product[index].price = data.price;
      }
      product[index].price = product[index].price;

      if (data.stock != undefined) {
        product[index].stock = data.stock;
      }
      product[index].stock = product[index].stock;
    }
    return `el producto con el id ${id} no encontrado`;
  }

  destroy(id) {
    this.Products = this.Products.filter((product) => product.id != id);
    return this.Products;
  }
}

const manager = new ProductManager();

const env = () => {
  console.log("se crean dos producto");
  manager.create("producto prueba", "sin imagen", 200, 25);
  manager.create("producto prueba 2", "sin imagen", 200, 25);

  let products2 = manager.read();
  console.log("se llama a read -->", products2);

  console.log("se crea un tercer producto pero con datos incompletos-->");
  manager.create("producto prueba3");

  let getProductById = manager.readOne(products2[0]["id"]);
  console.log(
    "se llama a readOne con el id del primer producto-->",
    getProductById
  );

  let getProductById2 = manager.readOne("205bc");
  console.log("se llama a readOne con el id 205-->", getProductById2);

  let deleteProductById = manager.destroy(products2[1]["id"]);
  console.log(
    "se elimina el segundo producto usando su id-->",
    deleteProductById
  );

  manager.update(products2[0]["id"], {
    title: "producto 1 Actualizado",
    photo: "foto actualizada",
  });
  let products3 = manager.read();
  console.log(`se actualizo el producto--->`, products3);
};
env();
