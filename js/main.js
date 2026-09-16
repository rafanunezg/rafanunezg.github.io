// ========================================
// MAIN.JS - Optimizado
// ========================================
document.addEventListener("DOMContentLoaded", () => {

// Scroll suave
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Menú activo al hacer scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
});

// ========================================
// EFECTO TYPING
// ========================================
const text = [
    "Ingeniería de Sistemas",
    "Especialista en Redes",
    "Infraestructura TI",
    "CCTV y Seguridad Electrónica",
    "Desarrollo Web"
];

let index = 0, charIndex = 0, deleting = false;

function typingEffect() {
    const currentText = text[index];
    if (!deleting) {
        document.getElementById("typing").textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            deleting = true;
            setTimeout(typingEffect, 1500);
            return;
        }
    } else {
        document.getElementById("typing").textContent = currentText.substring(0, charIndex--);
        if (charIndex === 0) {
            deleting = false;
            index = (index + 1) % text.length;
        }
    }
    setTimeout(typingEffect, 100);
}
typingEffect();

// ========================================
// CAMBIO DE TEMA
// ========================================
const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        themeButton.innerHTML = "🌙 Oscuro";
        localStorage.setItem("theme", "light");
    } else {
        themeButton.innerHTML = "☀️ Claro";
        localStorage.setItem("theme", "dark");
    }
});

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeButton.innerHTML = "🌙 Oscuro";
}

// ========================================
// MENÚ FLOTANTE
// ========================================
const floatingButton = document.querySelector(".floating-main");
const floatingMenu = document.querySelector(".floating-menu");
const floatingIcon = floatingButton.querySelector("i");

floatingButton.addEventListener("click", (e) => {
    e.stopPropagation();
    floatingMenu.classList.toggle("active");
    floatingIcon.className = floatingMenu.classList.contains("active") ? "fas fa-times" : "fas fa-comments";
});

document.addEventListener("click", () => {
    floatingMenu.classList.remove("active");
    floatingIcon.className = "fas fa-comments";
});

floatingMenu.addEventListener("click", (e) => e.stopPropagation());

// ========================================
// ASISTENTE VIRTUAL
// ========================================
const assistantButton = document.querySelector(".menu-item");
const assistantWindow = document.querySelector(".assistant-window");
const assistantClose = document.querySelector(".assistant-close");

assistantButton.addEventListener("click", (e) => {
    e.preventDefault();
    assistantWindow.classList.add("active");
    floatingMenu.classList.remove("active");
    floatingIcon.className = "fas fa-comments";
});

assistantClose.addEventListener("click", () => {
    assistantWindow.classList.remove("active");
});

// ========================================
// CHAT ASISTENTE
// ========================================
const chatBody = document.getElementById("assistant-body");
const chatInput = document.getElementById("assistant-input");
const chatSend = document.getElementById("assistant-send");

// Sanitización XSS
function sanitizeInput(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Aperturas y cierres
const openings = ["¡Claro que sí!", "¡Por supuesto!", "Con gusto te cuento:", "¡Excelente pregunta!", "¡Buena pregunta!", "¡Con mucho gusto!", "¡Genial pregunta!"];
const closings = ["¿Te gustaría saber algo más?", "¿Puedo ayudarte con algo más?", "¿Hay algo más que quieras saber?", "¿Quieres conocer más detalles?", "¿Te interesa saber algo más de Rafael?", "¿Necesitas información adicional?"];

const getRandomOpening = () => openings[Math.floor(Math.random() * openings.length)];
const getRandomClosing = () => closings[Math.floor(Math.random() * closings.length)];

// Base de conocimiento Frida
const fridaKnowledge = {
    saludos: {
        keywords: ["hola", "buenos", "buenas", "saludos", "hey", "hi", "hello"],
        responses: [
            "¡Hola! ¿En qué puedo ayudarte hoy?",
            "¡Hola! Cuéntame, ¿qué te gustaría saber de Rafael?",
            "¡Hola! Estoy aquí para lo que necesites. Puedes preguntarme sobre su experiencia, proyectos o contacto.",
            "¡Hola! Con gusto te ayudo. ¿Qué información necesitas?",
            "¡Hola! Dime, ¿qué te interesa saber?",
            "¡Hola! Me alegra que estés aquí. ¿En qué te puedo ayudar?"
        ]
    },
    experiencia: {
        keywords: ["experiencia", "trabajo", "laboral", "empleo", "curriculum", "cv", "profesional"],
        responses: [
            "Rafael cuenta con amplia experiencia en tres áreas principales:\n\n• Ingeniería de Sistemas - Desarrollo de soluciones tecnológicas, soporte TI, infraestructura, redes y administración de sistemas.\n\n• Seguridad Electrónica - CCTV, control de acceso y videoporteros. Instalación y mantenimiento de sistemas de videovigilancia IP y analógicos.\n\n• Infraestructura Tecnológica - Cableado estructurado, almacenamiento NAS, configuración de equipos y soporte empresarial.",
            "En su trayectoria profesional, Rafael ha trabajado en:\n\n• Soluciones tecnológicas para empresas industriales\n• Implementación de sistemas de seguridad en centros médicos\n• Diseño de infraestructura TI empresarial\n• Desarrollo de herramientas digitales\n\n¿Te gustaría conocer más detalles de alguna área?"
        ]
    },
    habilidades: {
        keywords: ["habilidades", "skills", "sabe", "conocimientos", "competencias", "tecnologias"],
        responses: [
            "Las principales habilidades de Rafael son:\n\n• Redes e Infraestructura (90%)\n• CCTV y Seguridad Electrónica (90%)\n• Soporte TI (85%)\n• Desarrollo Web (75%)\n\nDomina marcas como Hikvision, HanwhaVision, Mobotix y QNAP.",
            "Rafael domina diversas tecnologías:\n\n• Infraestructura de redes y cableado estructurado\n• Sistemas de videovigilancia IP y analógicos\n• Almacenamiento NAS y servidores\n• Soporte técnico especializado\n• Desarrollo de soluciones web\n\n¿Quieres saber en qué proyectos ha aplicado estas habilidades?"
        ]
    },
    proyectos: {
        keywords: ["proyectos", "portfolio", "portafolio", "trabajos", "casos"],
        responses: [
            "Rafael ha trabajado en proyectos destacados:\n\n• Proyecto Empresa Industrial - Implementación de soluciones tecnológicas y sistemas integrados.\n\n• Proyecto Centro Médico - Soluciones tecnológicas para seguridad y operación.\n\n• Proyecto Infraestructura TI - Diseño e instalación de infraestructura tecnológica.\n\n• Proyecto Desarrollo Digital - Creación de soluciones web y herramientas digitales.",
            "En su portafolio, Rafael tiene proyectos como:\n\n• Sistemas CCTV para empresas industriales\n• Infraestructura de redes para centros médicos\n• Servidores y almacenamiento NAS empresarial\n• Aplicaciones web y soluciones digitales\n\n¿Te gustaría más detalles de algún proyecto específico?"
        ]
    },
    cctv: {
        keywords: ["cctv", "camaras", "camara", "seguridad", "videovigilancia", "hikvision", "mobotix"],
        responses: [
            "Rafael es especialista en CCTV y Seguridad Electrónica:\n\n• Instalación y configuración de sistemas IP y analógicos\n• Marcas: Hikvision, HanwhaVision y Mobotix\n• Control de acceso y videoporteros\n• Mantenimiento preventivo y correctivo\n\n¿Quieres saber en qué tipo de proyectos ha trabajado?",
            "En el área de seguridad electrónica, Rafael domina:\n\n• Cámaras IP y analógicas de alta resolución\n• Sistemas de grabación NVR y DVR\n• Control de acceso biométrico y por tarjeta\n• Videoporteros y porteros automáticos\n• Marcas certificadas: Hikvision, HanwhaVision, Mobotix\n\n¿Te interesa conocer sus proyectos de CCTV?"
        ]
    },
    redes: {
        keywords: ["redes", "network", "cableado", "servidor", "nas", "infraestructura", "conectividad"],
        responses: [
            "En Infraestructura y Redes, Rafael tiene experiencia en:\n\n• Diseño e implementación de redes empresariales\n• Cableado estructurado certificado\n• Configuración de servidores y almacenamiento NAS (QNAP)\n• Soporte técnico empresarial\n\n¿Puedo ayudarte con algo más?",
            "Rafael domina la infraestructura tecnológica:\n\n• Redes LAN/WAN empresariales\n• Cableado estructurado categorías 5e, 6 y 6a\n• Servidores físicos y virtuales\n• Almacenamiento NAS y soluciones de respaldo\n• Monitoreo y mantenimiento de infraestructura\n\n¿Quieres conocer sus proyectos de redes?"
        ]
    },
    contacto: {
        keywords: ["contacto", "contactar", "email", "telefono", "whatsapp", "instagram", "comunicar"],
        responses: [
            "Puedes contactar a Rafael por:\n\n• Email: rafanunezgmex@gmail.com\n• Teléfono: +52 566 755 3924\n• Instagram: @rafa_nunezg\n\nTambién puedes usar los botones de redes sociales en el menú lateral.",
            "Aquí tienes los datos de contacto de Rafael:\n\n• Email: rafanunezgmex@gmail.com\n• Teléfono/WhatsApp: +52 566 755 3924\n• Instagram: @rafa_nunezg\n\n¿Hay algo más que quieras saber sobre él?"
        ]
    },
    web: {
        keywords: ["web", "pagina", "sitio", "desarrollo", "codigo", "html", "css", "javascript", "programacion"],
        responses: [
            "Rafael tiene experiencia en Desarrollo Web:\n\n• Creación de aplicaciones web modernas\n• Desarrollo de bases de datos\n• Soluciones digitales para optimización de procesos\n• Este portafolio fue desarrollado con HTML5, CSS3 y JavaScript.",
            "En desarrollo web, Rafael domina:\n\n• HTML5, CSS3 y JavaScript vanilla\n• Diseño responsive y mobile-first\n• Integración de APIs y servicios externos\n• Optimización de rendimiento web\n\n¿Te gustaría saber algo más?"
        ]
    }
};

// Buscar respuesta
function findResponse(userMessage) {
    const messageLower = userMessage.toLowerCase();
    for (const category in fridaKnowledge) {
        const entry = fridaKnowledge[category];
        for (const keyword of entry.keywords) {
            if (messageLower.includes(keyword)) {
                return entry.responses[Math.floor(Math.random() * entry.responses.length)];
            }
        }
    }
    return "No tengo esa información en mi base de datos. Puedes preguntarme sobre: experiencia, habilidades, proyectos, CCTV, redes, contacto o desarrollo web.";
}

// Indicador de escritura
function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";
    typingDiv.id = "typing-indicator";
    typingDiv.innerHTML = "<span></span><span></span><span></span>";
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) indicator.remove();
}

// Enviar mensaje
function sendChatMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === "") return;

    const sanitizedMessage = sanitizeInput(messageText.substring(0, 200));
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = sanitizedMessage;
    chatBody.appendChild(userMessage);
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        const mainResponse = findResponse(messageText);
        const opening = getRandomOpening();
        const closing = getRandomClosing();
        showFridaMessage(`${opening}\n\n${mainResponse}\n\n${closing}`);
    }, 1000 + Math.random() * 1000);
}

chatSend.addEventListener("click", sendChatMessage);
chatInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendChatMessage(); });

// Mostrar mensaje de Frida
function showFridaMessage(text) {
    const fridaMessage = document.createElement("div");
    fridaMessage.className = "assistant-message";
    fridaMessage.textContent = text;
    chatBody.appendChild(fridaMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
}

}); // Fin DOMContentLoaded
