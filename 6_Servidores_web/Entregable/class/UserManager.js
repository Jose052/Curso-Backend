const fs = require("fs");

class UserManager {
  constructor() {
    this.path = "../db/users.json";
    this.users = [];
    this.init();
  }

  init = async () => {
    const file = fs.existsSync(this.path);
    if (file) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.users = JSON.parse(data);
    } else {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    }
  };

  read = async () => {
    return this.users;
  };

  create = async (name, photo, email) => {
    if (!name || !photo || !email) {
      console.log("todos los campos son obligatorios!");
    } else {
      const id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
      const newUser = { id, name, photo, email };
      this.users.push(newUser);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, "\t")
      );
    }
  };

  readOne(id) {
    const userById = this.users.filter((user) => user.id === id);
    if (userById.length == 0) {
      return `Usuario con el id ${id} no encontrado`;
    }
    return userById;
  }
}

const manager = new UserManager();

const env = async () => {
  console.log("se crean dos usuarios");
  manager.create("usuario 1", "sin foto", "usuario1@emial.com");
  manager.create("usuario 2", "sin foto", "usuario2@emial.com");

  let usuarios = await manager.read();
  console.log("se llama a read -->", usuarios);

  console.log("se crea un tercer usuario pero con datos incompletos-->");
  manager.create("Usuario 3");

  let getUserById = manager.readOne(1);
  console.log("se llama a readOne con el id 1-->", getUserById);

  let getUserById2 = manager.readOne(245605);
  console.log("se llama a readOne con el id 205-->", getUserById2);
};

env();
