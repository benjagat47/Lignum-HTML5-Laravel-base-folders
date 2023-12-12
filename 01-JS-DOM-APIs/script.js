document.addEventListener("DOMContentLoaded", function() {

    var inputBusqueda = document.getElementById("busqueda");
    var botonBuscar = document.getElementById("buscar");
    var resultadoDiv = document.getElementById("resultado");


// Obtener la sección
var miSeccion = document.getElementById("miSeccion");

function ajax(config) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(config.method, config.url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`Error en la solicitud: ${xhr.status} ${xhr.statusText}`));
                }
            }
        };
        xhr.onerror = function () {
            reject(new Error("Error de red"));
        };
        xhr.send();
    });
}


    // Función para mostrar un mensaje de alerta
    function mostrarMensaje() {
        // Llamar a la función para realizar la llamada AJAX a la API de Chuck Norris
        realizarLlamadaAJAX({ method: 'GET', url: 'https://api.chucknorris.io/jokes/random' })
            .then(function(response) {
                // Mostrar la respuesta en la sección
                miSeccion.style.color = ''; // Restablecer el color de texto
                miSeccion.innerHTML = JSON.parse(response).value;
            })
            .catch(function(error) {
                // Manejar errores y poner el contenido de la sección en rojo
                miSeccion.style.color = 'red';
                miSeccion.innerHTML = 'Error al obtener el chiste: ' + error.message;
            });
    }


// Obtener Repositorios de GitHub

function obtenerRepositorios(terminoBusqueda) {
    const apiUrl = `https://api.github.com/search/repositories?q=${terminoBusqueda}`;

    ajax({ method: 'GET', url: apiUrl })
        .then(function(data) {
            mostrarRepositorios(data.items);
        })
        .catch(function(error) {
            console.error(error);
            resultadoDiv.style.color = 'red';
            resultadoDiv.textContent = 'Error al obtener repositorios.';
        });
}

function mostrarRepositorios(repositorios) {
    // Limpiar resultados anteriores
    resultadoDiv.innerHTML = "";

    if (repositorios && repositorios.length > 0) {
        // Crear una lista (ul) para mostrar los repositorios
        var listaRepositorios = document.createElement("ul");

        // Iterar a través de los repositorios y agregar elementos de lista (li)
        repositorios.forEach(function(repo) {
            var elementoLista = document.createElement("li");
            elementoLista.textContent = repo.full_name;
            listaRepositorios.appendChild(elementoLista);
        });

        // Mostrar la lista en el resultadoDiv
        resultadoDiv.appendChild(listaRepositorios);
    } else {
        // Mostrar mensaje si no se encontraron repositorios
        resultadoDiv.style.color = 'red';
        resultadoDiv.textContent = 'No se encontraron repositorios.';
    }
}

// Adjuntar evento de clic al botón de búsqueda
botonBuscar.addEventListener("click", function() {
    var terminoBusqueda = inputBusqueda.value.trim();
    if (terminoBusqueda !== "") {
        resultadoDiv.style.color = ''; // Restablecer el color de texto
        obtenerRepositorios(terminoBusqueda);
    } else {
        resultadoDiv.style.color = 'red';
        resultadoDiv.textContent = 'Ingrese un término de búsqueda.';
    }
});
});
