const socket = io()

let usuario =''

Swal.fire({
    title: 'ingresa un correo',
    input: 'text',
    confirmButtonText: 'ingresar'
}).then((result) => {
    usuario = result.value;
})

const caja = document.getElementById('caja');
const contenido = document.getElementById('contenido');

caja.addEventListener('change', (e)=>{
    socket.emit('mensaje', {
        correo: usuario,
        mensaje: e.target.value,
    });
});


socket.on(' mensaje nuevo ', (data) => {
    const mensajes = data.map(({correo, mensaje})=>{
        return `<p>${correo} dijo ${mensaje}</p>`
    });
    contenido.innerHTML = mensajes.join('')
});

