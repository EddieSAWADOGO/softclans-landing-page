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

// Form submission handler (basic example)
function handleSubmit(event) {
    event.preventDefault();
    alert('Message envoyé ! Nous vous contacterons bientôt.');
    // Here you would typically send the form data to a server
    event.target.reset(); // Clear the form
}