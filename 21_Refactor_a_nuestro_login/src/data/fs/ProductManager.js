import fs from "fs";
import crypto from "crypto";

class ProductManager {
  init() {
    try {
      const file = fs.existsSync(this.path);
      if (file) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
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
    this.products = [];
    this.init();
  }

  read() {
    try {
      const error = new Error("no hay productos!");
      if (this.products.length === 0) {
        error.statusCode = 404;
        throw error;
      } else {
        return this.products;
      }
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const error = new Error("todos los campos son obligatorios!");
      if (!data.title || !data.photo || !data.price || !data.stock) {
        error.statusCode = 400;
        throw error;
      }
      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      this.products.push(newProduct);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return newProduct.id;
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const error = new Error(`Producto con el id ${id} no existe!`);
      const productById = this.products.find((product) => product.id === id);
      if (!productById) {
        error.statusCode = 404;
        throw error;
      }
      return productById;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const error = new Error(`Producto con el id ${id} no existe!`);
      const product = this.products;
      if (product.find((product) => product.id === id) === undefined) {
        error.statusCode = 404;
        throw error;
      }
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

      this.products = product;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return this.products;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const error = new Error(`Producto con el id ${id} no existe!`);
      const idProducttoDelete = this.products.find(
        (product) => product.id === id
      );
      if (!idProducttoDelete) {
        error.statusCode = 404;
        throw error;
      }
      this.products = this.products.filter((product) => product.id != id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return this.products;
    } catch (error) {
      throw error;
    }
  }
}

const PM = new ProductManager("./src/data/fs/db/products.json");
export default PM;
