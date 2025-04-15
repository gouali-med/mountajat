// Navigation mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('nav-active');

    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger animation
    burger.classList.toggle('toggle');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Configuration de l'API Google Sheets
const scriptURL = 'VOTRE_URL_DE_SCRIPT_GOOGLE_APPS'; // À remplacer par votre URL de script Google Apps

// Gestion du formulaire
const form = document.getElementById('order-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Désactiver le bouton pendant l'envoi
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';

    try {
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            size: formData.get('size'),
            address: formData.get('address'),
            product: 'Robe Élégante Montajaat',
            price: '299€',
            date: new Date().toLocaleString('fr-FR')
        };

        // Envoyer les données à Google Sheets
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Afficher un message de succès
            alert('Merci pour votre commande ! Nous vous contacterons bientôt pour confirmer les détails.');
            form.reset();
        } else {
            throw new Error('Erreur lors de l\'envoi des données');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
        // Réactiver le bouton
        submitButton.disabled = false;
        submitButton.textContent = 'Commander maintenant';
    }
});

// Scroll animations
const fadeInElements = document.querySelectorAll('.product-card, .about-content');

const fadeInOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"
};

const fadeInOnScroll = new IntersectionObserver((entries, fadeInOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fade-in');
        fadeInOnScroll.unobserve(entry.target);
    });
}, fadeInOptions);

fadeInElements.forEach(element => {
    fadeInOnScroll.observe(element);
}); 