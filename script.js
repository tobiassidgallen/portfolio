
// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section');
const header = document.querySelector('nav');

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Animate nav items
    if (navLinks.classList.contains('active')) {
        navItems.forEach((item, index) => {
            item.style.setProperty('--i', index);
            item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        });
    } else {
        navItems.forEach(item => {
            item.style.animation = 'none';
        });
    }
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    // Update scroll progress
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / height) * 100;
    scrollProgress.style.width = `${scrolled}%`;
    
    // Header show/hide on scroll
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
    
    // Navbar background on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active nav link
    setActiveNavLink();
});

// Set active navigation link based on scroll position
function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animate project cards
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            
            // Animate timeline items
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
        img.addEventListener('load', () => img.classList.add('loaded'));
    });
    
    // Observe sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Initial active nav link
    setActiveNavLink();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});