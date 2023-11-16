import fs from 'fs'

const pathfile = './src/db/productos.json'

export default class ProductManager{
    getProducts = async()=>{
        if(fs.existsSync(pathfile)){
        const data = await fs.promises.readFile(pathfile, 'utf-8');
        const products = JSON.parse(data);
        return products
        }else{
            return []
        }
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
        if(!title||!description||!price||!thumbnail||!code||!stock){
            return{sucess:"todos los campos son obligatorios!"};
        }else{
            const products = await this.getProducts()
            const existingProduct = products.filter(product => product.code === code);
            if (existingProduct.length > 0) {
            return {sucess:`el codigo ${code} ya esta en uso`};
            }
            const id = products.length ? products[products.length-1].id + 1 : 1;
            const newProduct = {id, title, description, price, thumbnail, code, stock};
            products.push(newProduct)
            if (!fs.existsSync(pathfile)) {
                fs.writeFileSync(pathfile, JSON.stringify(products, null, '\t'));
                return true
            } else {
                await fs.promises.writeFile(pathfile, JSON.stringify(products, null, '\t'));
                return true
            }
        }
        
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