function propsEvents(req, res, next) {
  const { uid, pid, quantity } = req.body;
  if (!uid || !pid || !quantity) {
    const error = new Error(`todos los campos son obligatorios!`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  }
}

export default propsEvents;
