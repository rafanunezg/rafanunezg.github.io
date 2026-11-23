// ========================================
// MAIN.JS - Portafolio Rafael Núñez
// ========================================
document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ------------------------------------
    // Año del footer
    // ------------------------------------
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ------------------------------------
    // Scroll suave + menú activo
    // ------------------------------------
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        });
    });

    const sections = document.querySelectorAll("main section[id]");
    const updateActiveLink = () => {
        let current = "";
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) current = section.id;
        });
        navLinks.forEach(link => {
            const isActive = link.getAttribute("href") === "#" + current;
            link.classList.toggle("active", isActive);
            if (isActive) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
        });
    };
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();

    // ------------------------------------
    // Efecto typing (Desarrollo Web primero)
    // ------------------------------------
    const typingTexts = [
        "Desarrollo Web",
        "Ingeniería de Sistemas",
        "Especialista en Redes",
        "Infraestructura TI",
        "CCTV y Seguridad Electrónica"
    ];
    const typingEl = document.getElementById("typing");

    if (typingEl) {
        if (reduceMotion) {
            typingEl.textContent = typingTexts[0];
        } else {
            let index = 0, charIndex = 0, deleting = false;
            const type = () => {
                const current = typingTexts[index];
                if (!deleting) {
                    typingEl.textContent = current.substring(0, charIndex++);
                    if (charIndex > current.length) {
                        deleting = true;
                        setTimeout(type, 1600);
                        return;
                    }
                } else {
                    typingEl.textContent = current.substring(0, charIndex--);
                    if (charIndex === 0) {
                        deleting = false;
                        index = (index + 1) % typingTexts.length;
                    }
                }
                setTimeout(type, 95);
            };
            type();
        }
    }

    // ------------------------------------
    // Tema claro / oscuro (compartido con las fichas de proyecto)
    // ------------------------------------
    const themeButton = document.getElementById("theme-toggle");
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    const applyTheme = (theme) => {
        const isLight = theme === "light";
        document.body.classList.toggle("light-mode", isLight);
        if (themeButton) themeButton.innerHTML = isLight ? "🌙 Oscuro" : "☀️ Claro";
        if (themeMeta) themeMeta.setAttribute("content", isLight ? "#f5f5f5" : "#0b0b0b");
    };

    applyTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            const next = document.body.classList.contains("light-mode") ? "dark" : "light";
            localStorage.setItem("theme", next);
            applyTheme(next);
        });
    }

    // ------------------------------------
    // Menú flotante
    // ------------------------------------
    const floatingButton = document.querySelector(".floating-main");
    const floatingMenu = document.querySelector(".floating-menu");
    const floatingIcon = floatingButton.querySelector("i");

    floatingButton.addEventListener("click", (e) => {
        e.stopPropagation();
        floatingMenu.classList.toggle("active");
        floatingIcon.className = floatingMenu.classList.contains("active")
            ? "fas fa-times" : "fas fa-comments";
    });
    document.addEventListener("click", () => {
        floatingMenu.classList.remove("active");
        floatingIcon.className = "fas fa-comments";
    });
    floatingMenu.addEventListener("click", (e) => e.stopPropagation());

    // ------------------------------------
    // Asistente virtual Frida
    // ------------------------------------
    const assistantButton = document.querySelector(".menu-item");
    const assistantWindow = document.querySelector(".assistant-window");
    const assistantClose = document.querySelector(".assistant-close");
    const chatBody = document.getElementById("assistant-body");
    const chatInput = document.getElementById("assistant-input");
    const chatSend = document.getElementById("assistant-send");

    const openAssistant = () => {
        assistantWindow.classList.add("active");
        floatingMenu.classList.remove("active");
        floatingIcon.className = "fas fa-comments";
        chatInput.focus();
    };
    assistantButton.addEventListener("click", (e) => {
        e.preventDefault();
        openAssistant();
    });
    assistantClose.addEventListener("click", () => assistantWindow.classList.remove("active"));

    const sanitizeInput = (text) => {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    };

    const openings = ["¡Claro!", "Con gusto:", "¡Buena pregunta!", "Por supuesto:"];
    const closings = ["¿Te gustaría saber algo más?", "¿Puedo ayudarte con algo más?", "¿Quieres conocer otro tema?"];
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Base de conocimiento sincronizada con el portafolio real
    const fridaKnowledge = {
        saludos: {
            keywords: ["hola", "buenos", "buenas", "saludos", "hey", "hi", "hello"],
            responses: [
                "¡Hola! ¿Qué te gustaría conocer de Rafael? Puedo hablarte de experiencia, proyectos, desarrollo web, habilidades o contacto.",
                "¡Hola! Estoy aquí para ayudarte. Pregúntame, por ejemplo, por los proyectos del INR o de Bimbo."
            ]
        },
        proyectos: {
            keywords: ["proyecto", "proyectos", "portafolio", "portfolio", "casos", "bimbo", "inr", "rehabilitacion", "hospital"],
            responses: [
                "Sus proyectos más recientes son:\n\n• Instituto Nacional de Rehabilitación (CDMX, abr–nov 2025): 150 cámaras IP MOBOTIX, 45 nodos certificados, 500 bocinas y 2 NAS QNAP.\n\n• Grupo Bimbo (Jalisco, nov–dic 2025): videovigilancia, control de acceso y videoportero con 18 circuitos instalados.",
                "En la sección Proyectos hay dos casos reales con galería fotográfica: el hospitalario (INR) y el industrial (Bimbo). Ambos incluyen alcance, objetivos, cifras y resultados."
            ]
        },
        web: {
            keywords: ["web", "pagina", "página", "sitio", "desarrollo", "codigo", "código", "html", "css", "javascript", "js", "php", "python", "django", "mysql", "programacion", "programación", "frontend", "backend", "responsive"],
            responses: [
                "Además de TI e infraestructura, Rafael desarrolla soluciones web con HTML5, CSS3, JavaScript, PHP, Python/Django y MySQL/MariaDB.\n\nEste portafolio es su demo en vivo: maquetación responsive, modo claro/oscuro, scroll spy, chat y galerías con lightbox, todo sin frameworks pesados. Puedes ver el código en github.com/rafanunezg.",
                "En desarrollo web trabaja desde la maquetación responsiva hasta la lógica y la base de datos. Puede construir sitios corporativos, paneles administrativos (CRUD) e integraciones con APIs. También aplica SEO técnico: metadatos, canonical y datos estructurados.",
                "Sus aplicaciones web publicadas incluyen RALP Soluciones Integrales (sitio corporativo de infraestructura TI, seguridad e Odoo ERP) y OVRISD (plataforma institucional con comunicados, videoteca y banco de talento con más de 600 profesionales). Verás ambas con miniatura y enlace en la sección Desarrollo Web."
            ]
        },
        experiencia: {
            keywords: ["experiencia", "trabajo", "laboral", "empleo", "curriculum", "cv", "profesional", "trayectoria"],
            responses: [
                "Su trayectoria combina tres áreas:\n\n• Ingeniería de Sistemas y Desarrollo Web: soluciones tecnológicas, soporte, bases de datos y aplicaciones web.\n\n• Seguridad Electrónica: CCTV, control de acceso, videoporteros y alarmas.\n\n• Infraestructura Tecnológica: redes, cableado estructurado, NAS y soporte empresarial.",
                "Puedes ver su CV completo y descargarlo como PDF desde la sección Contacto o en cv.html. Incluye proyectos con fechas, métricas y habilidades técnicas."
            ]
        },
        habilidades: {
            keywords: ["habilidades", "skills", "sabe", "conocimientos", "competencias", "tecnologias", "tecnologías", "stack"],
            responses: [
                "Sus habilidades principales son:\n\n• Redes e Infraestructura (90%)\n• CCTV y Seguridad Electrónica (90%)\n• Soporte TI (85%)\n• Administración de Sistemas (80%)\n• Desarrollo Web (75%)\n\nTrabaja con Hikvision, MOBOTIX, Hanwha Vision y QNAP.",
                "Su stack web incluye HTML5, CSS3, JavaScript, PHP, Python, Django, MySQL/MariaDB, Bootstrap y Git. En infraestructura: cableado estructurado, nodos certificados, NAS y videovigilancia IP."
            ]
        },
        cctv: {
            keywords: ["cctv", "camaras", "cámaras", "camara", "seguridad", "videovigilancia", "hikvision", "mobotix", "alarmas", "acceso"],
            responses: [
                "Rafael es especialista en seguridad electrónica:\n\n• Videovigilancia IP y analógica (Hikvision, MOBOTIX, Hanwha Vision)\n• Control de acceso facial y biométrico\n• Videoporteros y alarmas\n• Instalación, configuración y mantenimiento",
                "En el INR instaló 150 cámaras IP MOBOTIX y en Bimbo implementó cámaras Hikvision junto con control de acceso y videoportero."
            ]
        },
        redes: {
            keywords: ["redes", "network", "cableado", "servidor", "nas", "infraestructura", "conectividad", "qnap"],
            responses: [
                "En infraestructura y redes tiene experiencia en:\n\n• Cableado estructurado y nodos certificados\n• Configuración de switches y conectividad empresarial\n• Almacenamiento NAS QNAP y respaldo centralizado\n• Soporte y mantenimiento de infraestructura",
                "En el proyecto del INR se instalaron 45 nodos certificados y 2 servidores NAS QNAP para centralizar las grabaciones de videovigilancia."
            ]
        },
        formacion: {
            keywords: ["educacion", "educación", "estudios", "universidad", "grado", "formacion", "formación", "certificados", "certificaciones", "diploma", "cursos"],
            responses: [
                "Rafael es Ingeniero de Sistemas y cuenta con certificaciones de formación técnica. Puedes ver el detalle en la sección Formación y el repositorio de certificados desde el botón del inicio."
            ]
        },
        contacto: {
            keywords: ["contacto", "contactar", "email", "correo", "telefono", "teléfono", "whatsapp", "instagram", "comunicar", "contratar"],
            responses: [
                "Puedes contactar a Rafael por:\n\n• Email: rafanunezgmex@gmail.com\n• Teléfono / WhatsApp: +52 566 755 3924\n• GitHub: github.com/rafanunezg\n• Instagram: @rafa_nunezg",
                "Si tienes un proyecto web o de infraestructura, escríbele por WhatsApp desde el botón de Contacto. También puede ver su CV en cv.html."
            ]
        }
    };

    const findResponse = (message) => {
        const lower = message.toLowerCase();
        for (const category in fridaKnowledge) {
            const entry = fridaKnowledge[category];
            if (entry.keywords.some(keyword => lower.includes(keyword))) {
                return pick(entry.responses);
            }
        }
        return "Puedo ayudarte con: proyectos, desarrollo web, experiencia, habilidades, CCTV, redes, formación y contacto. ¿Cuál te interesa?";
    };

    const showTypingIndicator = () => {
        const indicator = document.createElement("div");
        indicator.className = "typing-indicator";
        indicator.id = "typing-indicator";
        indicator.innerHTML = "<span></span><span></span><span></span>";
        chatBody.appendChild(indicator);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const showFridaMessage = (text) => {
        const el = document.createElement("div");
        el.className = "assistant-message";
        el.style.animation = "assistantMessage .45s ease";
        el.textContent = text;
        chatBody.appendChild(el);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const sendChatMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        const userMessage = document.createElement("div");
        userMessage.className = "user-message";
        userMessage.textContent = sanitizeInput(text.substring(0, 200));
        chatBody.appendChild(userMessage);
        chatInput.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;

        showTypingIndicator();
        setTimeout(() => {
            const indicator = document.getElementById("typing-indicator");
            if (indicator) indicator.remove();
            showFridaMessage(`${pick(openings)}\n\n${findResponse(text)}\n\n${pick(closings)}`);
        }, reduceMotion ? 0 : 900 + Math.random() * 700);
    };

    chatSend.addEventListener("click", sendChatMessage);
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendChatMessage();
    });

    document.querySelectorAll(".quick-questions button").forEach(button => {
        button.addEventListener("click", () => {
            chatInput.value = button.dataset.question;
            sendChatMessage();
        });
    });

    // ------------------------------------
    // Reveal on scroll
    // ------------------------------------
    const revealItems = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach(el => el.classList.add("visible"));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach(el => observer.observe(el));
    }

    // ------------------------------------
    // Volver arriba
    // ------------------------------------
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        const toggleBackToTop = () => backToTop.classList.toggle("visible", window.scrollY > 500);
        window.addEventListener("scroll", toggleBackToTop, { passive: true });
        toggleBackToTop();
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        });
    }

}); // Fin DOMContentLoaded
