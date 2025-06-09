
// Modern Portfolio JavaScript with Enhanced Interactivity

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAnimations();
    this.setupNavigation();
    this.setupCursor();
    this.setupHeroAnimations();
    this.setupSkillsAnimation();
    this.setupProjectFilter();
    this.initializeIntersectionObserver();
  }

  setupEventListeners() {
    window.addEventListener('load', () => this.onPageLoad());
    window.addEventListener('scroll', utils.throttle(() => this.onScroll(), 16));
    window.addEventListener('resize', utils.debounce(() => this.onResize(), 250));
  }

  onPageLoad() {
    document.body.classList.add('loaded');
    this.animateHeroContent();
  }

  onScroll() {
    this.updateNavbar();
    this.updateActiveNavLink();
    this.handleScrollAnimations();
  }

  onResize() {
    this.handleResponsiveElements();
  }

  // Navigation Setup
  setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuToggle?.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });

    navItems.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          this.smoothScrollTo(targetSection);
          // Close mobile menu if open
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.classList.remove('nav-open');
        }
      });
    });
  }

  smoothScrollTo(element) {
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Cursor Setup
  setupCursor() {
    const cursor = document.querySelector('.cursor-follower');
    
    // Only enable cursor on devices with precise pointing
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      const speed = 0.15;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      
      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursor.style.borderColor = 'var(--accent-secondary)';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        cursor.style.borderColor = 'var(--accent-primary)';
      });
    });
  }

  // Hero Animations
  setupHeroAnimations() {
    this.setupRoleRotation();
    this.setupTypingAnimation();
  }

  setupRoleRotation() {
    const roleItems = document.querySelectorAll('.role-item');
    let currentIndex = 0;

    setInterval(() => {
      roleItems[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % roleItems.length;
      roleItems[currentIndex].classList.add('active');
    }, 3000);
  }

  setupTypingAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
      line.style.animationDelay = `${index * 0.5}s`;
    });
  }

  animateHeroContent() {
    const heroElements = document.querySelectorAll('.hero-text > *');
    
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        element.style.transition = 'all 0.8s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }

  // Skills Animation
  setupSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateSkill = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillItem = entry.target;
          const progressBar = skillItem.querySelector('.skill-progress');
          const level = skillItem.getAttribute('data-level');
          
          skillItem.classList.add('animate');
          progressBar.style.setProperty('--progress-width', `${level}%`);
          
          observer.unobserve(skillItem);
        }
      });
    };

    const skillObserver = new IntersectionObserver(animateSkill, {
      threshold: 0.5
    });

    skillItems.forEach(item => {
      skillObserver.observe(item);
    });
  }

  // Project Filter
  setupProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach((card, index) => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              card.style.transition = 'all 0.5s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 100);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Intersection Observer for scroll animations
  initializeIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Stagger animations for child elements
          const children = entry.target.querySelectorAll('.stagger-item');
          children.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.classList.add('fade-in-up');
          });
        }
      });
    }, observerOptions);

    // Observe sections and cards
    const observeElements = document.querySelectorAll('section, .project-card, .timeline-item, .contact-card');
    observeElements.forEach(element => {
      observer.observe(element);
    });
  }

  initializeAnimations() {
    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
      .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s ease forwards;
      }
      
      .animate-in {
        animation: slideInFromBottom 0.8s ease forwards;
      }
      
      @keyframes slideInFromBottom {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .stagger-item {
        opacity: 0;
        transform: translateY(20px);
      }
    `;
    document.head.appendChild(style);
  }

  handleScrollAnimations() {
    // Parallax effect for floating elements
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements::before, .floating-elements::after');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  handleResponsiveElements() {
    const screenWidth = window.innerWidth;
    
    // Adjust animations for mobile
    if (screenWidth < 768) {
      this.disableHeavyAnimations();
    } else {
      this.enableHeavyAnimations();
    }
  }

  disableHeavyAnimations() {
    const animatedElements = document.querySelectorAll('.floating-elements, .grid-overlay');
    animatedElements.forEach(element => {
      element.style.animation = 'none';
      element.style.opacity = '0.3';
    });
  }

  enableHeavyAnimations() {
    const animatedElements = document.querySelectorAll('.floating-elements, .grid-overlay');
    animatedElements.forEach(element => {
      element.style.animation = '';
      element.style.opacity = '';
    });
  }
}

// Form Enhancement
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.submitBtn = document.querySelector('.submit-btn');
    this.init();
  }

  init() {
    if (this.form) {
      this.setupFormValidation();
      this.setupSubmitHandler();
    }
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    this.clearError(field);
    
    if (!value) {
      this.showError(field, `${fieldName} is required`);
      return false;
    }
    
    if (fieldName === 'email' && !this.isValidEmail(value)) {
      this.showError(field, 'Please enter a valid email address');
      return false;
    }
    
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(field, message) {
    field.style.borderColor = '#EF4444';
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.style.color = '#EF4444';
      errorElement.style.fontSize = '0.875rem';
      errorElement.style.marginTop = '0.25rem';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  clearError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  setupSubmitHandler() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(this.form);
      const isValid = this.validateForm();
      
      if (isValid) {
        this.submitForm(formData);
      }
    });
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  async submitForm(formData) {
    const originalText = this.submitBtn.innerHTML;
    this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    this.submitBtn.disabled = true;
    
    try {
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        this.showSuccessMessage();
        this.form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      this.showErrorMessage();
    } finally {
      this.submitBtn.innerHTML = originalText;
      this.submitBtn.disabled = false;
    }
  }

  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
    message.style.cssText = `
      background: #10B981;
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      text-align: center;
    `;
    
    this.form.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 5000);
  }

  showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.';
    message.style.cssText = `
      background: #EF4444;
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      text-align: center;
    `;
    
    this.form.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 5000);
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.optimizeAnimations();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  optimizeAnimations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  new ContactForm();
  new PerformanceOptimizer();
});

// Add some utility functions
const utils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PortfolioApp, ContactForm, PerformanceOptimizer };
}