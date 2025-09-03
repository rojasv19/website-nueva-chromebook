document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos todos los elementos que queremos animar, sin importar la página
    const animatedElements = document.querySelectorAll('.content-section, .proyecto-card, .service-card');

    // Opciones para el Intersection Observer
    const observerOptions = {
        root: null, // Observa en relación al viewport
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    // Creamos una instancia del Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento está entrando en la vista
            if (entry.isIntersecting) {
                // Añadimos la clase que dispara la animación CSS
                entry.target.classList.add('is-visible');
                // Dejamos de observar el elemento una vez que ha sido animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicamos el observador a cada elemento que queremos animar
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Pequeño ajuste para el "active" de la navegación
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        link.classList.remove('active'); // Remover clase active de todos los links primero

        if (currentPage === 'index.html' || currentPage === '') {
            if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#' || link.getAttribute('href').startsWith('index.html#')) {
                link.classList.add('active');
            }
        } 
        else if (currentPage === 'portafolio.html' && link.getAttribute('href') === 'portafolio.html') {
            link.classList.add('active');
        }
        else if (currentPage === 'servicios.html' && link.getAttribute('href') === 'servicios.html') {
            link.classList.add('active');
        }
    });

    // Ajuste adicional para el scroll suave a la sección de servicios en la página de inicio
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajusta el offset para el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });

});