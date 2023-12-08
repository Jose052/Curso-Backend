let cuenta = 0;

function contador(numero) {
  cuenta = cuenta + numero;
  console.log(cuenta);
}

//contador(2);
//contador(4);
//contador(5);

const concatenar = () => {
  let primera = "hola";
  let segunda = "saludos";
  console.log(primera, segunda);
  console.log(primera + " " + segunda);
  console.log(`${primera} ${segunda}`);
};

//concatenar();

function validate(array) {
  const dataType = array.map((each) => ({
    value: each,
    dataType: typeof each,
  }));
  console.log(dataType);
  return dataType;
}

// const resultado = validate([1, "hola", null, false])
// validate([NaN, undefined, true, resultado])

class Persona {
    static admin = "coderhouse"
    static Quantitypeople = 0
  constructor(name, lastName, oldYears, city) {
    this.name = name;
    this.lastName = lastName;
    this.oldYears = oldYears;
    this.city = city;
    this.RegistryOrder = Persona.Quantitypeople
  }
  imprimir() {
    console.log(this);
  }

  imprimirCompleteName = () => console.log(this.name, this.lastName);
  
  meetAdmin = () => console.log(Persona.admin);
}

const profe = new Persona("Jose", "valdes", 21, "Mexico");
profe.imprimir();
const tutor = new Persona("german", "koning", 30, "Cordoba");
tutor.imprimir();
tutor.imprimirCompleteName();
console.log(tutor.city);
Persona.meetAdmin();
