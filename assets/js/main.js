// Mobile menu toggle
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu-open');
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
         mobileMenu.classList.remove('mobile-menu-open');
    });
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Header fade-in on scroll
const header = document.querySelector('header');
const headerScrollThreshold = 800; // Pixels from top to trigger fade-in

function handleHeaderVisibility() {
    if (!header) return; // Exit if header element not found

    if (window.scrollY > headerScrollThreshold) {
        header.classList.remove('opacity-0', 'invisible');
        header.classList.add('bg-white', 'shadow-md', 'visible', 'opacity-100'); // Make visible, add background/shadow
    } else {
        header.classList.add('opacity-0', 'invisible');
        header.classList.remove('bg-white', 'shadow-md', 'visible', 'opacity-100'); // Make invisible, remove background/shadow
    }
}

// Initial check in case page loads scrolled
handleHeaderVisibility();

// Add scroll listener
window.addEventListener('scroll', handleHeaderVisibility);

// Home section content fade on scroll
const homeSection = document.getElementById('home');
const homeContent = document.getElementById('home-content-container');

function handleHomeFade() {
    if (!homeSection || !homeContent) return; // Exit if elements not found

    const scrollY = window.scrollY;
    const sectionHeight = homeSection.offsetHeight;

    // Calculate opacity: 1 at top, 0 when scrolled half the section height
    const opacity = Math.max(0, 1 - (scrollY / (sectionHeight / 2)));

    // Apply opacity to the content container
    homeContent.style.opacity = opacity.toFixed(2); // Limit decimal places
}

// Initial call in case page loads scrolled
handleHomeFade();

// Add listener
window.addEventListener('scroll', handleHomeFade);

// Section fade-in on scroll
const sections = document.querySelectorAll('main > section:not(#home)'); // Select all sections in main except #home

const observerOptions = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 0.25 // visible amount of item shown in relation to root (0.25 = 25%)
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
            entry.target.classList.remove('is-visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-in-section'); // Add initial class to hide sections
    observer.observe(section); // Start observing the section
});
