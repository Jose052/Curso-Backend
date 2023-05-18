import fs from 'fs'

const pathfile = '../db/productos.json'

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
        let products = await this.getProducts()
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
            console.log("todos los campos son obligatorios!")
        }
        const products = await this.getProducts()
        const existingProduct = products.filter(product => product.code === code);
        if (existingProduct.length > 0) {
          console.log('Product with the same code already exists')
          return;
        }
        const id = products.length ? products[products.length-1].id + 1 : 1;
        const newProduct = {id, title, description, price, thumbnail, code, stock};
        products.push(newProduct)
        if (!fs.existsSync(pathfile)) {
            fs.writeFileSync(pathfile, JSON.stringify(products, null, '\t'));
          } else {
            await fs.promises.writeFile(pathfile, JSON.stringify(products, null, '\t'));
          }
    }

    updateProduct = async(id, data)=>{
        const Productos = await this.getProducts()
        let index = Productos.findIndex((data)=>{return data.id === id});
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
        }
        return {'error':'No es posible modificar el id'}
        
      }

    deleteProduct = async(id)=>{
        const Productos = await this.getProducts()
        const ProdEliminar = Productos.filter(product => product.id != id);
        const existingProduct = Productos.filter(product => product.id === id);
        if(existingProduct.length === 0){
            console.log({'error':'Product not exists'}) 
        }
        await fs.promises.writeFile(pathfile, JSON.stringify(ProdEliminar, null, '\t'))
    }
    
}

// const manager = new ProductManager();
// const env = async()=>{
//     let prod = await manager.getProductById(3)
//     console.log(prod)
// }

// env()