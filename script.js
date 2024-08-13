document.getElementById('mensaje').addEventListener('input', function() {
    // Obtiene el valor del textarea
    let texto = this.value;

    // Convierte todo el texto a minúsculas
    texto = texto.toLowerCase();

    // Verifica si hay caracteres no permitidos (acentos, números, caracteres especiales)
    if (/[^a-z\s]/.test(texto)) {
        // Muestra un alerta si hay caracteres no permitidos
        alert('Por favor, ingresa solo letras minúsculas y espacios. No se permiten acentos ni caracteres especiales.');

        // Filtra el texto para que solo contenga letras minúsculas y espacios
        texto = texto.replace(/[^a-z\s]/g, '');
    }

    // Establece el texto filtrado en el textarea
    this.value = texto;
});

document.getElementById('encriptar').addEventListener('click', function() {
    const textoContainer = document.querySelector('.mensaje .texto-mostrado') || document.querySelector('.mensaje .texto');
    
    // Obtiene el valor del textarea
    const mensaje = document.getElementById('mensaje').value;
    if (verificarYRestaurar(mensaje)) {
        return;
    }
    
    // Realiza la encriptación
    const mensajeEncriptado = encriptarTexto(mensaje);

    // Muestra el mensaje encriptado en el contenedor
    textoContainer.innerHTML = `<p>${mensajeEncriptado}</p>`;

    // Asegura que el contenedor tenga la clase 'texto-mostrado'
    textoContainer.classList.add('texto-mostrado');
    textoContainer.classList.remove('texto');
});

document.getElementById('desencriptar').addEventListener('click', function() {
    const textoContainer = document.querySelector('.mensaje .texto-mostrado') || document.querySelector('.mensaje .texto');

    // Obtiene el valor del textarea
    const mensaje = document.getElementById('mensaje').value;
    if (verificarYRestaurar(mensaje)) {
        return;
    }
    
    // Realiza la desencriptación
    const mensajeDesencriptado = desencriptarTexto(mensaje);

    // Muestra el mensaje desencriptado en el contenedor
    textoContainer.innerHTML = `<p>${mensajeDesencriptado}</p>`;

    // Asegura que el contenedor tenga la clase 'texto-mostrado'
    textoContainer.classList.add('texto-mostrado');
    textoContainer.classList.remove('texto');
});



function verificarYRestaurar(mensaje) {
    const textoContainer = document.querySelector('.mensaje .texto-mostrado') || document.querySelector('.mensaje .texto');
    
    if (!mensaje) {
        textoContainer.classList.add('texto');
        textoContainer.classList.remove('texto-mostrado');
        textoContainer.innerHTML = `
            <img src="assets/person.png" alt="Imagen de persona con una lupa" />
            <h2>Ningún mensaje fue encontrado</h2>
            <p>Ingresa el texto que deseas encriptar o desencriptar</p>
        `;
        return true;  // Retorna verdadero si se restauró el contenedor
    }

    return false;  // Retorna falso si no se restauró el contenedor
}

document.getElementById('copiar').addEventListener('click', function() {
    const textoContainer = document.querySelector('.mensaje .texto-mostrado p');

    if (textoContainer) {
        const texto = textoContainer.textContent;

        navigator.clipboard.writeText(texto).then(function() {
            alert('Texto copiado al portapapeles');
        }).catch(function(err) {
            alert('Error al copiar el texto: ', err);
        });
    } else {
        alert('No hay texto para copiar.');
    }
});

function encriptarTexto(texto) {
    return texto
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

function desencriptarTexto(texto) {
    return texto
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}
