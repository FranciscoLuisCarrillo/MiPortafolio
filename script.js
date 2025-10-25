/* --- script.js: Funcionalidad de Scroll Suave, Modo Oscuro, Navegación Activa y Animaciones AOS (ES6+) --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. MODO OSCURO (Dark Mode)
    // =========================================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    
    // Función para aplicar el tema
    const applyTheme = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        }
    };

    // Inicialización del tema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // Listener para el toggle
    darkModeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');
        applyTheme(!isDark);
    });


    // =========================================================
    // 2. SCROLL SUAVE y BOTÓN VOLVER ARRIBA
    // =========================================================
    const navLinks = document.querySelectorAll('header nav ul li a');
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    // Scroll Suave para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Lógica del Botón "Volver Arriba"
    const toggleBackToTopButton = () => {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (window.scrollY > viewportHeight) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleBackToTopButton);
    
    backToTopBtn.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    toggleBackToTopButton();

    // =========================================================
    // 3. NAVEGACIÓN ACTIVA (Intersection Observer)
    // =========================================================
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        // El umbral se establece para el 50% de la sección visible para considerarla activa
        rootMargin: '0px',
        threshold: 0.5 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const targetId = `#${entry.target.id}`;
            const navLink = document.querySelector(`header nav ul li a[href="${targetId}"]`);
            
            if (navLink) {
                // Quitamos la clase 'active' de todos los enlaces primero
                navLinks.forEach(link => link.classList.remove('active'));

                // Si la sección está intersectando (visible) y es la actual, la activamos
                if (entry.isIntersecting) {
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observamos todas las secciones principales (excepto el header/inicio)
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // =========================================================
    // 4. ANIMACIONES AL SCROLL (AOS - Intersection Observer)
    // =========================================================
    const aosItems = document.querySelectorAll('.aos-item');
    const aosObserverOptions = {
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const aosObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;

                // Aplicar el retardo si está definido
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);

                // Dejamos de observar el elemento después de animarlo para que no se repita
                observer.unobserve(element);
            }
        });
    }, aosObserverOptions);

    aosItems.forEach(item => {
        aosObserver.observe(item);
    });
});