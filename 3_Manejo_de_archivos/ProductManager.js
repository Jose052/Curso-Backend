import fs from 'fs'

export default class ProductManager{
    constructor (){
        this.path = './productos.json'
    }
    getProducts = async()=>{
        if(fs.existsSync(this.path)){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        return products
        }else{
            return []
        }
    } 

    getProductById = async(id) =>{
        let productsfile = await fs.promises.readFile(this.path, 'utf-8');
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
            if (!fs.existsSync(this.path)) {
                fs.writeFileSync(this.path, JSON.stringify(products, null, '\t'));
                return true
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
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
                await fs.promises.writeFile(this.path, JSON.stringify(Productos, null, '\t'))
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
        await fs.promises.writeFile(this.path, JSON.stringify(ProdEliminar, null, '\t'))
        return true
    }
    
}


const manager = new ProductManager()
const env = async()=>{
    let products = await manager.getProducts()
    console.log("se llama a GetProduct Manager -->",products)

    console.log('se llama a addProduct')
    let addProduct = await manager.addProduct(
        "producto prueba",
        "Este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
        )

    let products2 = await manager.getProducts()
    console.log("se llama a GetProduct Manager segunda vez -->",products2)


    console.log('se llama a addProduct segunda vez con los mismos datos-->')
    let addProduct2 = await manager.addProduct(
        "producto prueba",
        "Este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
        )


    let getProductById = await  manager.getProductById(1)
    console.log('se llama a getProductById con el id 1-->', getProductById)

    let getProductById2 = await  manager.getProductById(205)
    console.log('se llama a getProductById con el id 205-->', getProductById2)


    let updateProduct = await manager.updateProduct(1,{code:'def456'})
    console.log('se llama a UpdateProduct modificando el codigo a def456', updateProduct)

    let updateProduct2 = await manager.updateProduct(1,{id:3})
    console.log('se llama a UpdateProduct tratando de modificar el id', updateProduct2)

    let deleteProduct = await manager.deleteProduct(1)
    console.log('se llama a deleteProduct eliminando el producto con el id 1', deleteProduct)

    let deleteProduct2 = await manager.deleteProduct(123)
    console.log('se llama a deleteProduct eliminando el producto con el id 123', deleteProduct2)
}

env()