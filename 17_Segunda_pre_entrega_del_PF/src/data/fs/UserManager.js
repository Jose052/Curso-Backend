import fs from "fs";
import crypto from "crypto";

class UserManager {
  init() {
    try {
      const file = fs.existsSync(this.path);
      if (file) {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
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
    this.users = [];
    this.init();
  }

  async read() {
    try {
      const error = new Error("no hay usuarios!");
      if (this.users.length === 0) {
        error.statusCode = 404;
        throw error;
      } else {
        return this.users;
      }
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const error = new Error("todos los campos son obligatorios!");
      if (!data.name || !data.photo || !data.email) {
        error.statusCode = 400;
        throw error;
      }
      const newUser = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      this.users.push(newUser);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, "\t")
      );
      return newUser.id;
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const error = new Error(`Usuario con el id ${id} no existe!`);
      const userById = this.users.find((user) => user.id == id);
      if (!userById) {
        error.statusCode = 404;
        throw error;
      }
      return userById;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const user = this.users;
      const error = new Error(`Usuario con el id ${id} no existe!`);
      if (user.find((user) => user.id === id) === undefined) {
        error.statusCode = 404;
        throw error;
      }
      let index = user.findIndex((data) => {
        return data.id === id;
      });
      if (data.name != undefined) {
        user[index].name = data.name;
      }
      user[index].name = user[index].name;

      if (data.photo != undefined) {
        user[index].photo = data.photo;
      }
      user[index].photo = user[index].photo;

      if (data.email != undefined) {
        user[index].email = data.email;
      }
      user[index].email = user[index].email;

      return this.users;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const error = new Error(`Usuario con el id ${id} no existe!`);
      const userById = this.users.find((user) => user.id == id);
      if (!userById) {
        error.statusCode = 404;
        throw error;
      }
      this.users = this.users.filter((user) => user.id != id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, "\t")
      );
      return this.users;
    } catch (error) {
      throw error;
    }
  }
}

const UM = new UserManager("./src/data/fs/db/users.json");
export default UM;
