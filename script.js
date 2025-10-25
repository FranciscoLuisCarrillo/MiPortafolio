/* --- script.js: Funcionalidades de Portafolio --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL SUAVE PARA NAVEGACIÓN (Fallback si CSS no funciona)
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Previene el salto instantáneo del anclaje por defecto
            event.preventDefault();

            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Función nativa para scroll suave, con fallback de polyfill si es necesario
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Otras funcionalidades (a implementar en futuras etapas, por ejemplo:
    //    - Botón "Volver Arriba" (Back to Top)
    //    - Animaciones al hacer scroll (AOS)
    //    - Detección de sección activa
    //    - Implementación de un modo oscuro/claro
    //    - Validación avanzada de formularios
});