const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "../db/products.json";
    this.products = [];
    this.init();
  }

  async init(){
    const file = fs.existsSync(this.path);
    if (file) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
    } else {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    }
  };

  read() {
    return this.products;
  }

  async create(title, photo, price, stock){
    if (!title || !photo || !price || !stock) {
      console.log("todos los campos son obligatorios!");
    } else {
      const id = this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 1;
      const newProduct = { id, title, photo, price, stock };
      this.products.push(newProduct);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    }
  };

  readOne(id) {
    const productById = this.products.filter((product) => product.id === id);
    if (productById.length == 0) {
      return `Producto con el id ${id} no encontrado`;
    }
    return productById;
  }
}

const manager = new ProductManager();

const env = async () => {
  console.log("se crean dos producto");
  manager.create("producto prueba", "sin imagen", 200, 25);
  manager.create("producto prueba 2", "sin imagen", 200, 25);

  let products2 = await manager.read();
  console.log("se llama a read -->", products2);

  console.log("se crea un tercer producto pero con datos incompletos-->");
  manager.create("producto prueba3");

  let getProductById = manager.readOne(1);
  console.log("se llama a readOne con el id 1-->", getProductById);

  let getProductById2 = manager.readOne(205);
  console.log("se llama a readOne con el id 205-->", getProductById2);
};

env();
