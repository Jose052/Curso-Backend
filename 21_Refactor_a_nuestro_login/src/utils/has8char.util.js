function has8char(password) {
  if (password.length < 8) {
    const error = new Error("La contraseña debe de tener almenos 8 caracteres");
    error.statusCode = 400;
    throw error;
  }
}

export default has8char;
