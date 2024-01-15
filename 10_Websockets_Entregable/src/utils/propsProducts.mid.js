function propsProducts(data) {
  const {title, photo, price, stock} = data;
  console.log(data)
  if (!title || !photo || !price || !stock) {
    const error = new Error(`todos los campos son obligatorios!`);
    error.statusCode = 404;
    throw error;
  }
}

export default propsProducts;
