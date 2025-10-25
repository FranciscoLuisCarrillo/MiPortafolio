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
            // Cambiar a ícono de SOL para sugerir el modo CLARO
            icon.classList.replace('fa-moon', 'fa-sun'); 
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            // Cambiar a ícono de LUNA para sugerir el modo OSCURO
            icon.classList.replace('fa-sun', 'fa-moon'); 
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
        rootMargin: '0px',
        threshold: 0.5 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const targetId = `#${entry.target.id}`;
            const navLink = document.querySelector(`header nav ul li a[href="${targetId}"]`);
            
            if (navLink) {
                navLinks.forEach(link => link.classList.remove('active'));

                if (entry.isIntersecting) {
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // =========================================================
    // 4. ANIMACIONES AL SCROLL (AOS - Intersection Observer)
    // =========================================================
    const aosItems = document.querySelectorAll('.aos-item');
    const aosObserverOptions = {
        rootMargin: '0px',
        threshold: 0.1 
    };

    const aosObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);

                observer.unobserve(element);
            }
        });
    }, aosObserverOptions);

    aosItems.forEach(item => {
        aosObserver.observe(item);
    });
});