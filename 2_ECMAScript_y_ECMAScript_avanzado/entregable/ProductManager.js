class ProductManager {
  constructor() {
    this.Products = [];
  }

  create(title, photo, price, stock) {
    if (!title || !photo || !price || !stock) {
      console.log("todos los campos son obligatorios!");
    }
    const id = this.Products.length
      ? this.Products[this.Products.length - 1].id + 1
      : 1;
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

  let getProductById = manager.readOne(1);
  console.log("se llama a readOne con el id 1-->", getProductById);

  let getProductById2 = manager.readOne(205);
  console.log("se llama a readOne con el id 205-->", getProductById2);
};

env();
