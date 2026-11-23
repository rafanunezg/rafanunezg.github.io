// ========================================
// PROYECTO.JS - Galerías y tema compartido
// ========================================
document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ========================================
    // CAMBIO DE TEMA (sincronizado con el portafolio)
    // ========================================
    const btnTema = document.getElementById("btnTema");
    const iconoTema = btnTema.querySelector("i");
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    const applyTheme = (theme) => {
        const isLight = theme === "light";
        document.body.classList.toggle("tema-claro", isLight);
        document.body.classList.toggle("tema-oscuro", !isLight);
        iconoTema.className = isLight ? "fas fa-sun" : "fas fa-moon";
        btnTema.setAttribute("aria-label", isLight ? "Activar tema oscuro" : "Activar tema claro");
        if (themeMeta) themeMeta.setAttribute("content", isLight ? "#f4f6f9" : "#0b0b0b");
    };

    applyTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");

    btnTema.addEventListener("click", () => {
        const next = document.body.classList.contains("tema-claro") ? "dark" : "light";
        localStorage.setItem("theme", next);
        applyTheme(next);
    });

    // ========================================
    // GALERÍA PROFESIONAL
    // ========================================
    const thumbs = document.querySelectorAll(".miniaturas img");
    const imagenes = Array.from(thumbs).map(img => img.dataset.full || img.src);
    let indice = 0;

    if (thumbs.length) {
        const lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-label", "Galería de imágenes del proyecto");
        lightbox.innerHTML = `<span id="cerrar" role="button" aria-label="Cerrar galería">&times;</span><span id="anterior" role="button" aria-label="Imagen anterior">&#10094;</span><span id="cargando" class="lightbox-loader"></span><img id="imagenActual" src="" alt="Imagen del proyecto"><span id="siguiente" role="button" aria-label="Imagen siguiente">&#10095;</span><div id="contador"></div>`;
        document.body.appendChild(lightbox);

        const btn = document.getElementById("btnGaleria");
        const imagenActual = document.getElementById("imagenActual");
        const contador = document.getElementById("contador");
        const cerrar = document.getElementById("cerrar");
        const anterior = document.getElementById("anterior");
        const siguiente = document.getElementById("siguiente");
        const cargando = document.getElementById("cargando");

        let preloaded = "";

        const mostrarImagen = () => {
            cargando.style.display = "flex";
            imagenActual.style.opacity = "0";
            imagenActual.src = imagenes[indice];
            imagenActual.alt = thumbs[indice].alt;
            contador.textContent = (indice + 1) + " / " + imagenes.length;

            const siguienteIndice = (indice + 1) % imagenes.length;
            if (imagenes[siguienteIndice] !== preloaded) {
                preloaded = imagenes[siguienteIndice];
                const img = new Image();
                img.src = imagenes[siguienteIndice];
            }
        };

        imagenActual.addEventListener("load", () => {
            cargando.style.display = "none";
            imagenActual.style.opacity = "1";
        });
        imagenActual.addEventListener("error", () => {
            cargando.style.display = "none";
        });

        btn.addEventListener("click", () => {
            lightbox.classList.add("activo");
            mostrarImagen();
        });

        cerrar.addEventListener("click", () => lightbox.classList.remove("activo"));
        siguiente.addEventListener("click", () => {
            indice = (indice + 1) % imagenes.length;
            mostrarImagen();
        });
        anterior.addEventListener("click", () => {
            indice = (indice - 1 + imagenes.length) % imagenes.length;
            mostrarImagen();
        });

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("activo")) return;
            if (e.key === "ArrowRight") siguiente.click();
            if (e.key === "ArrowLeft") anterior.click();
            if (e.key === "Escape") cerrar.click();
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) cerrar.click();
        });

        thumbs.forEach((img, index) => {
            img.addEventListener("click", () => {
                indice = index;
                lightbox.classList.add("activo");
                mostrarImagen();
            });
        });
    }

    // ========================================
    // ANIMACIÓN DE ENTRADA EN TARJETAS
    // ========================================
    const animar = document.querySelectorAll(".animar, .card, .stat");
    if (reduceMotion || !("IntersectionObserver" in window)) {
        animar.forEach(el => el.classList.add("mostrar"));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("mostrar");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animar.forEach(el => {
            el.classList.add("animar");
            observer.observe(el);
        });
    }

}); // Fin DOMContentLoaded
