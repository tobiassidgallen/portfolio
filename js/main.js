// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const needle = document.querySelector('.needle');
    const speedValue = document.querySelector('.speed-value');

    // Debug element selection
    console.log('Preloader element:', preloader);
    console.log('Needle element:', needle);
    console.log('Speed value element:', speedValue);

    if (!needle || !speedValue) {
        console.error('Required elements not found!');
        // If elements are not found, hide preloader immediately
        if (preloader) {
            preloader.style.display = 'none';
            document.body.style.overflow = '';
        }
        return;
    }

    // Set target speed to 200 mph
    const targetSpeed = 200;
    // Define rotation range for the needle: -135 degrees (0 MPH) to +45 degrees (200 MPH)
    const initialRotation = -90; // Needle starts at -90 degrees (0 MPH)
    const finalRotation = 135; // Needle ends at +135 degrees (200 MPH - South East)
    const totalRotation = finalRotation - initialRotation; // Should be 225 degrees

    // Function to update the speed value display
    function updateSpeedValue(rotationAngle) {
        // Map the rotation angle (-135 to 45) to the speed (0 to 200)
        let mappedSpeed = (rotationAngle - initialRotation) / totalRotation * targetSpeed;

        // Clamp the speed to the valid range [0, targetSpeed]
        mappedSpeed = Math.max(0, Math.min(targetSpeed, mappedSpeed));

        speedValue.textContent = Math.round(mappedSpeed);

        // Debug speed calculation
        console.log(`Current Rotation (raw): ${gsap.getProperty(needle, 'rotation').toFixed(2)}, Rotation Angle (passed): ${rotationAngle.toFixed(2)}, Mapped Speed: ${mappedSpeed.toFixed(2)}`);
    }

    // Create a timeline for smoother animation
    const tl = gsap.timeline();

    // Animate the needle rotation by changing the CSS transform property
    // This will trigger the CSS transition defined in style.css
    tl.to(needle, {
        duration: 10, // Animation duration in seconds
        rotation: finalRotation, // Target rotation angle
        ease: "power3.out", // Smooth easing function
        onUpdate: function() {
            // Pass the current rotation from the GSAP tween to the update function
            updateSpeedValue(gsap.getProperty(needle, 'rotation'));
        }
    })
    .to(preloader, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5, // Delay before fading out
        onComplete: () => {
            preloader.style.display = 'none';
            // Enable body scroll after preloader is hidden
            document.body.style.overflow = '';
        }
    }, "-=0.5"); // Start fading preloader out 0.5 seconds before needle animation ends
});

// Hero Section Animations
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    gsap.from(heroTitle.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    });
}

// Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax-container > *');
parallaxElements.forEach(element => {
    gsap.to(element, {
        y: () => -window.scrollY * 0.3,
        rotation: () => window.scrollY * 0.02,
        scale: () => 1 + (window.scrollY * 0.001),
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: "power3.inOut"
            });
        }
    });
});

// Navigation Scroll Effect
const nav = document.querySelector('.main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-switch-checkbox'); // Select the checkbox
if (themeToggle) {
    themeToggle.addEventListener('change', () => { // Listen for change event
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDark);
        
        // Animate theme transition (adjusting selectors if needed)
        gsap.to('body', {
            backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
            color: isDark ? '#ffffff' : '#333333',
            duration: 0.5
        });
        
        // No rotation animation needed for the new switch element itself
    });
}

// Check for saved theme preference
if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-theme');
    // Ensure the checkbox is checked if dark theme is active on load
    if (themeToggle) {
        themeToggle.checked = true;
    }
}

// Project Cards Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Animate tech stack
        gsap.from(card.querySelectorAll('.project-tech span'), {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top center",
            toggleActions: "play none none reverse"
        },
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Contact Form Animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Cursor Effect
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorText = document.createElement('div');
cursorText.classList.add('cursor-text');
cursor.appendChild(cursorText);

// Smooth cursor movement using GSAP
// gsap.to(cursor, { duration: 0.1, ease: "power2.out", x: "clientX", y: "clientY" }); // Removed GSAP ticker for position

// Handle cursor hover effects and text
document.addEventListener('mousemove', (e) => {
    // Update cursor position using CSS properties
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Ensure cursor is visible on mouse movement
    if (cursor.style.display === 'none') {
        cursor.style.display = 'block';
    }
});

const interactiveElements = document.querySelectorAll('a, button, .project-card, [data-cursor-text]');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        // Set cursor text if data-cursor-text attribute exists
        if (element.dataset.cursorText) {
            cursorText.textContent = element.dataset.cursorText;
            gsap.to(cursor, { scale: 2, duration: 0.3, ease: "power2.out" });
        }

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.querySelector('.custom-cursor').style.display = 'none';
        }        
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        // Clear cursor text and reset scale
        cursorText.textContent = '';
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
});

// Ensure cursor is hidden when not over the body (optional, but good practice)
document.body.addEventListener('mouseenter', () => { 
    // cursor.style.display = 'block'; // Handled by mousemove now
});
document.body.addEventListener('mouseleave', () => { 
    cursor.style.display = 'none'; 
});

// Initial hide (handled by CSS now with display: block)
// cursor.style.display = 'none'; // Removed as CSS sets display: block

// GSAP ScrollTrigger Animations for Sections and Elements

// Section Headers
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// About Content (text and image)
gsap.utils.toArray('.about-text, .about-image').forEach(element => {
    gsap.from(element, {
        opacity: 0,
        x: element.classList.contains('about-text') ? -50 : 50, // Slide from left or right
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Project Cards
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Timeline Items
gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Contact Section (form and info)
gsap.utils.toArray('.contact-form, .contact-info').forEach(element => {
    gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Skill Tags Animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    // Initial animation
    gsap.from(tag, {
        scrollTrigger: {
            trigger: tag,
            start: "top bottom",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out"
    });
    
    // Hover animation
    tag.addEventListener('mouseenter', () => {
        gsap.to(tag, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Smooth Scroll Enhancement
const smoothScroll = (target, duration = 1) => {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    
    gsap.to(window, {
        duration: duration,
        scrollTo: {
            y: targetPosition,
            offsetY: 70
        },
        ease: "power3.inOut"
    });
};

// Enhanced Navigation
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            smoothScroll(target);
        }
    });
});

// Resume Button Animation
const resumeBtn = document.querySelector('.resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('mouseenter', () => {
        gsap.to(resumeBtn.querySelector('.btn-icon'), {
            x: 5,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    resumeBtn.addEventListener('mouseleave', () => {
        gsap.to(resumeBtn.querySelector('.btn-icon'), {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksMobile = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

if (mobileMenuBtn && navLinksMobile) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinksMobile.classList.toggle('active');
        document.body.style.overflow = navLinksMobile.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinksMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinksMobile.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinksMobile.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinksMobile.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Enhanced Scroll Animations
const scrollElements = document.querySelectorAll('[data-scroll]');
scrollElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-animation');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loader.style.display = 'none';
            }
        });
    }
});

// Enhanced Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScroll(target);
            // Close mobile menu if open
            mobileMenuBtn.classList.remove('active');
            navLinksMobile.classList.remove('active');
        }
    });
});

// Contact Form Handling
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Here you would typically send the form data to your backend
        // For now, we'll just simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully!';
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        formInputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        
    } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Failed to send message. Please try again.';
        contactForm.appendChild(errorMessage);
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
        
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Social Media Links Animation
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px) rotate(360deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Footer Animation
const footer = document.querySelector('.footer');
const footerLinks = document.querySelectorAll('.footer-links a');

footerLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(5px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
    });
});

// Scroll to Contact Section
document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Navigation Links and Logo
document.querySelector('.logo a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fix all navigation links
document.querySelectorAll('.nav-link, .hero-cta a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (document.querySelector('.mobile-menu-btn').classList.contains('active')) {
                document.querySelector('.mobile-menu-btn').classList.remove('active');
                document.querySelector('.nav-links').classList.remove('active');
            }
        }
    });
});

// Footer Navigation Links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You could also send this to an error tracking service
});

// Performance Metrics Logging
window.addEventListener('load', function() {
    // Log performance metrics
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page Load Time:', pageLoadTime);
}); 