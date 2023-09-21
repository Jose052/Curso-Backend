import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import { Server } from "socket.io"

import indexProductsRouter from "./routers/indexProduct.router.js"
import routerProducts from "./routers/products.router.js";

const app = express();

const port = 8080;
const httpserver = app.listen(port, ()=> console.log(`Puerto escuchando ${port}`));

mongoose.connect('mongodb+srv://Jose:7Jlppnxpln13ZssC@cluster0.mdnuwav.mongodb.net/?retryWrites=true&w=majority');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use('/static', express.static('./public'));
app.use(indexProductsRouter);
app.use('/products', routerProducts)