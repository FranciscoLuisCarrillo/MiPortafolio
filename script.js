/* --- script.js: Funcionalidad de Scroll Suave (Smooth Scrolling) en ES6+ --- */

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces de la navegación
    const navLinks = document.querySelectorAll('header nav ul li a');

    // Añade un listener a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Previene el comportamiento de salto inmediato del ancla
            event.preventDefault();

            // Obtiene el ID del destino (ej: #sobre-mi)
            const targetId = link.getAttribute('href');
            
            // Si el destino es un hash (#), procede con el scroll suave
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Utiliza scrollIntoView con el comportamiento 'smooth'
                    // El CSS ya tiene scroll-behavior: smooth en el body como fallback
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // Alinea la parte superior del elemento con la parte superior del viewport
                    });
                }
            }
        });
    });

    // Pequeño ajuste adicional: si hay un hash en la URL al cargar, hacer scroll suave a ese elemento
    if (window.location.hash) {
        const hashElement = document.querySelector(window.location.hash);
        if (hashElement) {
            // Retraso para dar tiempo a que el CSS se aplique y el contenido se renderice
            setTimeout(() => {
                hashElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100); 
        }
    }
});