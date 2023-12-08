class UserManager {
  constructor() {
    this.Users = [];
  }

  create(name, photo, email) {
    if (!name || !photo || !email) {
      console.log("todos los campos son obligatorios!");
    }
    const id = this.Users.length ? this.Users[this.Users.length - 1].id + 1 : 1;
    const newUser = { id, name, photo, email };
    this.Users.push(newUser);
  }

  read() {
    return this.Users;
  }

  readOne(id) {
    const userById = this.Users.filter((user) => user.id === id);
    if (userById.length == 0) {
      return `Usuario con el id ${id} no encontrado`;
    }
    return userById;
  }
}


const manager = new UserManager()

const env =()=>{
    console.log('se crean dos usuarios')
    manager.create(
        "usuario 1",
        "sin foto",
        "usuario1@emial.com"
        )
    manager.create(
        "usuario 2",
        "sin foto",
        "usuario2@emial.com"
        )

    let usuarios = manager.read()
    console.log("se llama a read -->",usuarios)


    console.log('se crea un tercer usuario pero con datos incompletos-->')
    manager.create(
        "Usuario 3",
        )


    let getUserById =  manager.readOne(1)
    console.log('se llama a readOne con el id 1-->', getUserById)

    let getUserById2 =  manager.readOne(245605)
    console.log('se llama a readOne con el id 205-->', getUserById2)
}

env()