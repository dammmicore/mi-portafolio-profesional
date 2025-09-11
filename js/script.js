document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Hamburguesa Responsive
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        hamburgerMenu.querySelector('i').classList.toggle('fa-bars');
        hamburgerMenu.querySelector('i').classList.toggle('fa-times'); // Cambia el icono a una 'X'
    });

    // Cierra el menú al hacer clic en un enlace (para móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            hamburgerMenu.querySelector('i').classList.remove('fa-times');
            hamburgerMenu.querySelector('i').classList.add('fa-bars');
        });
    });

    // 2. Animación de Barras de Progreso (al hacer scroll)
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');

    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Cuando el 50% de la sección es visible
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                skillObserver.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // 3. Validación de Formulario en Tiempo Real
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    const validateField = (inputElement, errorMessageElement, validationFn) => {
        const value = inputElement.value.trim();
        if (!value) {
            errorMessageElement.textContent = 'Este campo es obligatorio.';
            inputElement.classList.add('invalid');
            return false;
        } else if (validationFn && !validationFn(value)) {
            errorMessageElement.textContent = 'Formato inválido.';
            inputElement.classList.add('invalid');
            return false;
        } else {
            errorMessageElement.textContent = '';
            inputElement.classList.remove('invalid');
            return true;
        }
    };

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    nameInput.addEventListener('input', () => validateField(nameInput, document.getElementById('name-error')));
    emailInput.addEventListener('input', () => validateField(emailInput, document.getElementById('email-error'), isValidEmail));
    messageInput.addEventListener('input', () => validateField(messageInput, document.getElementById('message-error')));

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previene el envío por defecto del formulario

        const isNameValid = validateField(nameInput, document.getElementById('name-error'));
        const isEmailValid = validateField(emailInput, document.getElementById('email-error'), isValidEmail);
        const isMessageValid = validateField(messageInput, document.getElementById('message-error'));

        if (isNameValid && isEmailValid && isMessageValid) {
            formStatus.textContent = 'Enviando mensaje...';
            formStatus.className = 'form-status'; // Resetear clases
            
            // Simular envío de formulario (en un entorno real, enviarías a un backend)
            try {
                // Aquí iría tu código para enviar el formulario, por ejemplo:
                // const response = await fetch('/api/contact', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         name: nameInput.value,
                //         email: emailInput.value,
                //         message: messageInput.value
                //     })
                // });
                // const result = await response.json();

                // Simulamos un retraso y un éxito
                await new Promise(resolve => setTimeout(resolve, 2000));

                formStatus.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
                formStatus.classList.add('success');
                contactForm.reset(); // Limpiar el formulario
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                formStatus.textContent = 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.';
                formStatus.classList.add('error');
            }
        } else {
            formStatus.textContent = 'Por favor, corrige los errores en el formulario.';
            formStatus.classList.add('error');
        }
    });

    // 4. Efecto de desplazamiento suave para anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 5. Animación simple al cargar la página (Hero Section)
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        heroContent.style.opacity = 0;
        heroContent.style.transform = 'translateY(20px)';
        heroImage.style.opacity = 0;
        heroImage.style.transform = 'scale(0.9)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroImage.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroContent.style.opacity = 1;
            heroContent.style.transform = 'translateY(0)';
            heroImage.style.opacity = 1;
            heroImage.style.transform = 'scale(1)';
        }, 300);
    }
});