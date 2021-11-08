const socket = io();

let mensaje = document.getElementById('message');
let nombre = document.getElementById('username');
let btn = document.getElementById('send');
let salida = document.getElementById('output');
let acciones = document.getElementById('actions');

btn.addEventListener('click', function() {
    socket.emit('chat:mensaje', {
        mensaje: mensaje.value,
        nombre: nombre.value
    });
});
socket.on('chat:mensaje', function(data) {
    output.innerHTML += `<p>
    <strong>${data.nombre}</strong>: ${data.mensaje}
    </p>`
});