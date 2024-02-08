function propsEvents(req, res, next) {
  const { name, photo, email } = req.body;
  if (!name || !photo || !email) {
    const error = new Error(`todos los campos son obligatorios!`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  }
}

export default propsEvents;
