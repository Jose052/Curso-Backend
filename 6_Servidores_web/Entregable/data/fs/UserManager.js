import fs from "fs";
import crypto from "crypto";

export default class UserManager {
  constructor() {
    this.path = "./data/fs/users.json";
    this.users = [];
    this.init();
  }

  async init(){
    const file = fs.existsSync(this.path);
    if (file) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.users = JSON.parse(data);
    } else {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    }
  };

  async read(){
    return this.users;
  };

  async create(name, photo, email){
    if (!name || !photo || !email) {
      return "todos los campos son obligatorios"
    }
    const id = crypto.randomBytes(12).toString('hex')
    const newUser = { id, name, photo, email };
    this.users.push(newUser);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.users, null, "\t")
    );
    return
  };

  readOne(id){
    const userById = this.users.filter((user) => user.id == string(id));
    if (userById.length == 0) {
      return [];
    }
    return userById;
  }

  async destroy(id) {
    this.users = this.users.filter((user) => user.id != id);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.users, null, "\t")
    );
  }
}
