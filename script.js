// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileToggle = document.getElementById('mobileToggle');
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileToggle = document.getElementById('mobileToggle');
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
}

// Scroll to Top Button
window.addEventListener('scroll', function() {
    const scrollTopButton = document.getElementById('scrollTop');
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Contact Modal
const contactModal = document.getElementById('contactModal');
const contactButtons = document.querySelectorAll('a[href="#contact"].nav-cta, .btn-secondary[href="#contact"]'); // Select all elements that open the modal

contactButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
});

function closeModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside content
window.addEventListener('click', function(event) {
    if (event.target === contactModal) {
        closeModal();
    }
});

// Fade-in on scroll animation
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.2, // When 20% of the item is visible
    rootMargin: "0px 0px -100px 0px" // Start animation 100px before reaching the bottom of the viewport
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Hero Image Carousel
let currentSlide = 0; // 0-indexed
const slides = document.querySelectorAll('.carousel-image');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    // Deactivate all dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Ensure n is within bounds
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }

    // Show the current slide and activate the corresponding dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Initial call to display the first slide
showSlide(currentSlide);

// Automatic slideshow every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Manual navigation with dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval); // Stop automatic slideshow
        showSlide(index); // Show the clicked slide
        slideInterval = setInterval(nextSlide, 5000); // Restart automatic slideshow
    });
});

// Fonction pour afficher des notifications personnalisées
function showNotification(message, type = 'success') {
    let container = document.querySelector('.notification-container');
    
    // Créer le conteneur s'il n'existe pas
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <div class="notification-text">${message}</div>
    `;

    container.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => notification.classList.add('active'), 100);

    // Suppression automatique après 5 secondes
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Form submission handler (basic example)
function handleSubmit(event) {
    event.preventDefault();
    const btnSubmit = event.target.querySelector('.btn-submit');
    const originalBtnText = btnSubmit.innerHTML;
    
    // Désactiver le bouton pendant l'envoi
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    const formData = new FormData(event.target);
    // Ajouter votre clé d'accès Web3Forms ici
    formData.append("access_key", "VOTRE_CLE_ICI"); 

    const data = Object.fromEntries(formData.entries());

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response) => {
        if (response.status == 200) {
            showNotification('Merci ' + data.nom + ' ! Votre demande de devis a été envoyée avec succès.', 'success');
            event.target.reset();
        } else {
            showNotification('Une erreur est survenue. Veuillez nous contacter via WhatsApp.', 'error');
        }
    }).finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnText;
    });
}