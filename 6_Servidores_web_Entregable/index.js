import express from "express";
import ProductManager from "./data/fs/ProductManager.js";
import UserManager from "./data/fs/UserManager.js";

const PM = new ProductManager()
const US = new UserManager()

const server = express();
const PORT = 8080;
const ready = () => console.log(`servidor escuchando en el puerto ${PORT}`);

server.use(express.urlencoded({ extended: true }))
server.listen(PORT, ready);

server.get('/api/products', async(req, res)=>{
  const products = await PM.read();
  if(products.length == 0){
    return res.status(404).send({
      success:false,
      response: "no found!"
    })
  }
  return res.status(202).send({
    success:true,
    response: products
  })
})

server.get('/api/products/:pid', async(req, res)=>{
  const pid = req.params.pid
  const product = await PM.readOne(pid);
  if(product.length == 0){
    return res.status(404).send({
      success:false,
      response: "no found!"
    })
  }
  return res.status(202).send({
    success:true,
    response: product
  })
})

server.get('/api/users',async (req, res)=>{
  const Users = await US.read();
  console.log(Users)
  if(Users.length == 0){
    return res.status(404).send({
      success:false,
      response: "no found!"
    })
  }
  return res.status(202).send({
    success:true,
    response: Users
  })
})

server.get('/api/users/:uid', async(req, res)=>{
  const uid = req.params.uid
  const user = await PM.readOne(uid);
  console.log(user)
  if(user.length == 0){
    return res.status(404).send({
      success:false,
      response: "no found!"
    })
  }
  return res.status(202).send({
    success:true,
    response: user
  })
})