function propsProducts(req, res, next) {
  const { title, photo, price, stock } = req.body;
  if (!title || !photo || !price || !stock) {
    const error = new Error(`todos los campos son obligatorios!`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  }
}

export default propsProducts;
