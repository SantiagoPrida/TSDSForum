setInterval(function () {
    location.reload(true); // El parámetro true forza una recarga desde el servidor y no desde la caché
}, 300000);

function actualizarAnuncio() {
    const nuevoAnuncio = document.getElementById("txtNotice").value;

    if (nuevoAnuncio !== null) {
        // Almacenar el nuevo anuncio en el almacenamiento local
        localStorage.setItem('anuncioTexto', nuevoAnuncio);

        // Redireccionar de nuevo a index.html
        window.location.href = 'dashboard.html';
    }
}

// Recuperar el valor del anuncio desde el almacenamiento local
const anuncioTexto = document.getElementById('noticeMessage');
const storedAnuncio = localStorage.getItem('anuncioTexto');
if (storedAnuncio) {
    anuncioTexto.textContent = storedAnuncio;
}
