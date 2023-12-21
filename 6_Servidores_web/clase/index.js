import express from "express";

const server = express();

const PORT = 8080;

const ready = () => console.log(`servidor escuchando en el puerto ${PORT}`);

server.use(express.urlencoded({ extended: true }))
server.listen(PORT, ready);

const ruta = "/";
const function1 = (req, res) => {
  return res.status(200).send("my first express server");
};

const ruta2 = "/events";
const function2 = (req, res) => {
    const all = [1,2,3,4,5,6,7,8]
  return res.status(200).send(all);
};


server.get(ruta2, function2)
server.get(ruta, function1);


//PARAMS

const rutaWithParams = "/api/produts/:pid"

const cbParams =(req, res)=>{
    const {pid} = req.params
    return res.status(200).send(`el id del roducto a buscar es${pid}`)

}
server.get(rutaWithParams, cbParams)

const rutaWithParams2 = "/api/produts/:title/:category/:price/:stock"

const cbParams2 =(req, res)=>{
    const {title, category, price, stock} = req.params
    return res.status(200).json({
        title,
        category,
        price,
        category
    })

}
server.get(rutaWithParams2, cbParams2)

//QUERY

const rutaWithQuery = "/api/events"

const cbQuery =(req, res)=>{
    const {title, category, price, stock} = req.query
    return res.status(200).json({
        title,
        category,
        price,
        category,
        stock
    })

}
server.get(rutaWithQuery, cbQuery)
