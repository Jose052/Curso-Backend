const socket = io();

// socket.on('bienvenido', (data)=>
//     console.log(data)
//     )

// socket.on('NewConection', (data)=>
//     console.log(data)
//     )

// socket.on('todos', (data)=>
//     console.log(data)
//     )

const caja = document.getElementById('caja');
const contenido = document.getElementById('contenido');

caja.addEventListener('input', (event)=>{
    socket.emit('mensaje', {
        mensaje: event.target.value
    })
})

socket.on('newContent', (data)=>{
    let contenidoFinal = "";
    data.forEach(({socketId, mensaje})=>{
        contenidoFinal += `<p>${socketId} dijo: ${mensaje}</p>`
    });

    contenido.innerHTML = contenidoFinal
})