import { productsModel } from "../models/products.model";

export default class cartManager{
    getCarts = async()=>{
        const products = await productsModel.find().lean()
        return products
    } 

    getCartsById = async(id) =>{
        let cartsfile = await fs.promises.readFile(pathfile, 'utf-8');
        const carts = JSON.parse(cartsfile);
        const cartById =  carts.filter(cart => cart.id === id);
        if(cartById.length == 0){
            return {'error':'Cart not exists'}
        }
            const products = cartById[0].product
            console.log(products)
            if(products == []){
                return products
            }
            return {'error':'Este carrito no contiene productos aun'}
    }

    addCart= async()=>{
        const carts = await this.getCarts()
        const id = carts.length ? carts[carts.length-1].id + 1 : 1;
        const newCart = {id, product:[]};
        carts.push(newCart)
        if (!fs.existsSync(pathfile)) {
            fs.writeFileSync(pathfile, JSON.stringify(carts, null, '\t'));
            return true
        } else {
            await fs.promises.writeFile(pathfile, JSON.stringify(carts, null, '\t'));
            return true
        }
    }

    addProductInCart= async(
        cartId,
        prodId
        )=>{
        if(!cartId||!prodId){
            return{sucess:"todos los campos son obligatorios!"};
        }else{
            let cartsfile = await fs.promises.readFile(pathfile, 'utf-8');
            const carts = JSON.parse(cartsfile);
            const cartById =  carts.filter(cart => cart.id === cartId);
            if (cartById.length == 0) {
            return {sucess:`el carrito con el id ${cartId} aun no existe`};
            }
            const product = cartById[0].product.filter(prod => prod.product === prodId)
            console.log(product)
            if(product.length==0){
                cartById[0].product.push({product:prodId, quantity:1})
            }else{
                const index = product.findIndex((data)=>{return data.product === prodId});
                product[index].quantity = product[index].quantity+1
                
            }
            if (!fs.existsSync(pathfile)) {
                fs.writeFileSync(pathfile, JSON.stringify(cartById, null, '\t'));
                return true
            } else {
                await fs.promises.writeFile(pathfile, JSON.stringify(cartById, null, '\t'));
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