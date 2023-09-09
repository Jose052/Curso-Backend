//evento de conexion

const socket = io()

//agregamos funcionalidad

const input = document.getElementById("textbox")
const texto = document.getElementById("texto")

input.addEventListener("keyup", evt =>{
    if(evt.key == "Enter"){ //inica el evento al dar enter
        socket.emit("message",input.value)//se envia el mensaje al servidor
        input.value == ""

    }
})

socket.on("imprimir", (data)=>{ //metodo que imprimira en el forntend
    let mensajes = ''
    data.forEach(msj=>{
        mensajes += `<br> ${msj.socketId} escribio: ${msj.mensaje} <br/>`
    })
    texto.innerHTML = mensajes
})