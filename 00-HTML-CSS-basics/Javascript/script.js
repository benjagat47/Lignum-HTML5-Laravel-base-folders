document.addEventListener("DOMContentLoaded", function() {
    var hiddenSection = document.getElementById("hiddenSection");

    // Muestra la sección oculta después de que la página ha cargado
    hiddenSection.style.display = "block";

    // Inicia la animación de fade in
    setTimeout(function() {
        hiddenSection.style.opacity = 1;
    }, 100);
});
