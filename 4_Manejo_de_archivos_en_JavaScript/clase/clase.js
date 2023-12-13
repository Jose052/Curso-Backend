
//SINCRONISMO
const fs = require("fs")

//crear archivo con datos de forma asincrona
const path1 = "./tickets.json";
const data = JSON.stringify([{title: "harry potter"},{title:"harry potter 2"}],null,2)

fs.writeFileSync(path1,data)

let config = "utf-8"

const datosLeidos = fs.readFileSync(path1, config)
const datosParseados = JSON.parse(datosLeidos)
console.log(datosParseados)

//eliminar dato asincronicamente

fs.unlinkSync(path1)

//verifcar que un archivo existe

const existe = fs.existsSync(path1)

console.log(existe)

//ASINCRONISMO
const fs = require("fs")

const path2 = './ticketsAsync.json';

const content = JSON.stringify([{title: "hp1"},{title: "hp1"},{title: "hp1"}])

fs.writeFile(path2, content, (error)=>{
    if(error){
        return error
    }
})


fs.readFile(path2, 'utf-8', (error,exito)=>{
    if(error){
         console.log(error)
    }else{
        console.log(exito)
    }
})


fs.unlink(path2, (error)=>{
    if(error){
        return error
    }
})

//PROMISES

const fs = require("fs")

const ruta = "./ticketsPromises.json"

const contenido = JSON.stringify([{title: "hp1"},{title: "hp1"},{title: "hp1"}]);

fs.promises.writeFile(ruta, contenido)
.catch((error)=>console.log(error))

fs.promises.readFile(ruta, 'utf-8')
.then(res=>console.log(JSON.parse(res)))
.catch((error)=>console.log(error))

fs.promises.unlink(ruta)
.catch((error)=>console.log(error))