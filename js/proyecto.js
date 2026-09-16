// ========================================
// PROYECTO.JS - Optimizado
// ========================================
document.addEventListener("DOMContentLoaded", () => {

// ========================================
// GALERÍA PROFESIONAL
// ========================================
const thumbs = document.querySelectorAll(".miniaturas img");
const imagenes = Array.from(thumbs).map(img => img.dataset.full || img.src);
let indice = 0;

// Crear lightbox
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.innerHTML = `<span id="cerrar">&times;</span><span id="anterior">&#10094;</span><span id="cargando" class="lightbox-loader"></span><img id="imagenActual" src=""><span id="siguiente">&#10095;</span><div id="contador"></div>`;
document.body.appendChild(lightbox);

// Elementos
const btn = document.getElementById("btnGaleria");
const imagenActual = document.getElementById("imagenActual");
const contador = document.getElementById("contador");
const cerrar = document.getElementById("cerrar");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const cargando = document.getElementById("cargando");

// Precargar imagen al fondo (evita parpadeo al cambiar)
let preloaded = "";

// Mostrar imagen
function mostrarImagen() {
    cargando.style.display = "flex";
    imagenActual.style.opacity = "0";
    imagenActual.src = imagenes[indice];
    contador.innerHTML = (indice + 1) + " / " + imagenes.length;
    precargarSiguiente();
}

// Precargar siguiente imagen
function precargarSiguiente() {
    const siguienteIndice = (indice + 1) % imagenes.length;
    if (imagenes[siguienteIndice] !== preloaded) {
        preloaded = imagenes[siguienteIndice];
        const img = new Image();
        img.src = imagenes[siguienteIndice];
    }
}

// Imagen cargada
imagenActual.addEventListener("load", () => {
    cargando.style.display = "none";
    imagenActual.style.opacity = "1";
});

imagenActual.addEventListener("error", () => {
    cargando.style.display = "none";
});

// Abrir galería
btn.addEventListener("click", () => {
    lightbox.classList.add("activo");
    mostrarImagen();
});

// Cerrar
cerrar.addEventListener("click", () => lightbox.classList.remove("activo"));

// Siguiente
siguiente.addEventListener("click", () => {
    indice = (indice + 1) % imagenes.length;
    mostrarImagen();
});

// Anterior
anterior.addEventListener("click", () => {
    indice = (indice - 1 + imagenes.length) % imagenes.length;
    mostrarImagen();
});

// Teclado
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("activo")) return;
    if (e.key === "ArrowRight") siguiente.click();
    if (e.key === "ArrowLeft") anterior.click();
    if (e.key === "Escape") cerrar.click();
});

// Cerrar al hacer clic en fondo
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) cerrar.click();
});

// Miniaturas
thumbs.forEach((img, index) => {
    img.addEventListener("click", () => {
        indice = index;
        lightbox.classList.add("activo");
        mostrarImagen();
    });
});

// ========================================
// CAMBIO DE TEMA
// ========================================
const btnTema = document.getElementById("btnTema");
const iconoTema = btnTema.querySelector("i");

// Siempre iniciar en oscuro
document.body.classList.add("tema-oscuro");
document.body.classList.remove("tema-claro");
iconoTema.className = "fas fa-moon";

btnTema.addEventListener("click", () => {
    if (document.body.classList.contains("tema-claro")) {
        document.body.classList.remove("tema-claro");
        document.body.classList.add("tema-oscuro");
        iconoTema.className = "fas fa-moon";
    } else {
        document.body.classList.remove("tema-oscuro");
        document.body.classList.add("tema-claro");
        iconoTema.className = "fas fa-sun";
    }
});

}); // Fin DOMContentLoaded
