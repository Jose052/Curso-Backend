import fs from "fs";
import crypto from "crypto";

export default class ProductManager {
  constructor() {
    this.path = './data/fs/products.json';
    this.products = [];
    this.init();
  }

  async init() {
    const file = fs.existsSync(this.path);
    if (file) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
    } else {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    }
  }

  read() {
    return this.products;
  }

  async create(title, photo, price, stock) {
    if (!title || !photo || !price || !stock) {
      return "todos los campos son obligatorios!";
    }
    const id = crypto.randomBytes(12).toString("hex");
    const newProduct = { id, title, photo, price, stock };
    this.products.push(newProduct);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, "\t")
    );
  }

  readOne(id) {
    const productById = this.products.filter((product) => product.id === id);
    if (productById.length == 0) {
      return `Producto con el id ${id} no encontrado`;
    }
    return productById;
  }

  async destroy(id) {
    this.Products = this.Products.filter((product) => product.id != id);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.Products, null, "\t")
    );
  }
}
