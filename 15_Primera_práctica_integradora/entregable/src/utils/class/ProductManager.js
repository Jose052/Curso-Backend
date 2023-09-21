import { autoModel } from "../../../../clase/src/dao/models/auto.model.js";
import { productsModel } from "../models/products.model.js";

export default class ProductManager{
    getProducts = async()=>{
        const products = await productsModel.find().lean()
        return products
    } 

    getProductById = async(id) =>{
        let productsfile = await fs.promises.readFile(pathfile, 'utf-8');
        const products = JSON.parse(productsfile);
        const productById =  products.filter(product => product.id === id);
        if(productById.length == 0){
            return {'error':'Product not exists'}
        }
            return productById
    }

    addProduct= async(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
        )=>{
        const product = await productsModel.create({
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })
        return product   
    }

    updateProduct = async(id, data)=>{
        const Productos = await this.getProducts()
        const productById =  Productos.filter(product => product.id === id);
        if(productById.length == 0){
            return {'error':'Product not exists'}
        }
            const index = Productos.findIndex((data)=>{return data.id === id});
            if(data.id == undefined){
                if(data.title != undefined){
                    Productos[index].title = data.title;
                }
                Productos[index].title = Productos[index].title
                if(data.description != undefined){
                    Productos[index].description = data.description;
                }
                Productos[index].description = Productos[index].description
                if(data.price != undefined){
                    Productos[index].price = data.price;
                }
                Productos[index].price = Productos[index].price
                if(data.thumbnail != undefined){
                    Productos[index].thumbnail = data.thumbnail;
                }
                Productos[index].thumbnail = Productos[index].thumbnail
                if(data.code != undefined){
                    Productos[index].code = data.code;
                }
                Productos[index].code = Productos[index].code
                if(data.stock != undefined){
                    Productos[index].stock = data.stock;
                }
                Productos[index].stock = Productos[index].stock
                await fs.promises.writeFile(pathfile, JSON.stringify(Productos, null, '\t'))
                return true
            }
            return {sucess:'No es posible modificar el id'}
        
      }

    deleteProduct = async(id)=>{
        const Productos = await this.getProducts()
        const ProdEliminar = Productos.filter(product => product.id != id);
        const existingProduct = Productos.filter(product => product.id === id);
        if(existingProduct.length === 0){
            return{'error':'Product not exists'}
        }
        await fs.promises.writeFile(pathfile, JSON.stringify(ProdEliminar, null, '\t'))
        return true
    }
    
}

// const manager = new ProductManager();
// const env = async()=>{
//     await manager.addProduct({       
//         "title": "Gabinete",
//         "description": "Gabinete para pc",
//         "price": 1000,
//         "thumbnail": "Sin imagen",
//         "code": "Game1-12",
//         "stock": 1
//     })
//     const prod = await manager.getProducts()
//     console.log(prod)
// }

// env()