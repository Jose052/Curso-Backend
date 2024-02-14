function isValidPass(formPassword, dbPassword) {
  if (formPassword !== dbPassword) {
    const error = new Error("datos invalidos");
    error.statusCode = 401;
    throw error;
  }
}

export default isValidPass;
