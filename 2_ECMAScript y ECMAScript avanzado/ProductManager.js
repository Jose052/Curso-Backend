class ProductManager{
    constructor(){
        this.Products = []
    }

    getProducts = async()=>{
        return this.Products
    }  

    getProductById = async(id) =>{
        const productById =  this.Products.filter(product => product.id === id);
        if(productById.length == 0){
            return 'Not found'
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
        const existingProduct = this.Products.filter(product => product.code === code);
        if (existingProduct.length > 0) {
          console.log('Product with the same code already exists')
          return;
        }
        const id = this.Products.length ? this.Products[this.Products.length-1].id + 1 : 1;
        const newProduct = {id, title, description, price, thumbnail, code, stock};
        this.Products.push(newProduct)
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
}

env()