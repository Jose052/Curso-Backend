const datos = {
  nombre: "Jose",
  apellido: "Valdes",
  edad: 21,
};

const datosExtras = {
  ciudad: "Mexico",
  nacimiento: 2000,
};

//concatenar dos array
const objetosUnidos = {
  ...datos,
  ...datosExtras,
};

//console.log(objetosUnidos);

//desestructuracion de array
const { nombre, nacimiento, ciudad, ...restoDePropiedades} = objetosUnidos;

// console.log(nombre);
// console.log(nacimiento);
// console.log(ciudad);
// console.log(restoDePropiedades);

// estructuracion
const poder = "inteligencia";
const pseudonimo = "iroman";
const equipo = "vengadores";

const heroe = { poder, pseudonimo, equipo };

//console.log(heroe);



