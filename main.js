/**
 * Grey 18 Studio - Main JavaScript
 * Handles core functionality and imports
 */

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
      // Enable scroll after preloader is hidden
      document.body.style.overflow = 'auto';
      // Trigger initial animations
      animateOnScroll();
    }, 1500);
  }

  // Sticky Header
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (nav && nav.classList.contains('active') && 
      !e.target.closest('nav') && 
      !e.target.closest('.menu-toggle')) {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        // Close mobile menu if open
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Update active nav link
          document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
          });
          this.classList.add('active');
        }
      }
    });
  });

  // Update active nav based on scroll position
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Service Cards Expanded View
  const serviceCards = document.querySelectorAll('.service-card');
  const expandedViews = document.querySelectorAll('.service-expanded-view');
  const expandButtons = document.querySelectorAll('.service-expand-btn');
  const closeBtns = document.querySelectorAll('.expanded-close');
  
  if (expandButtons.length > 0) {
    expandButtons.forEach((btn, index) => {
      btn.addEventListener('click', function() {
        expandedViews[index].style.display = 'block';
        setTimeout(() => {
          expandedViews[index].classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
      });
    });
  }
  
  if (closeBtns.length > 0) {
    closeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const view = this.closest('.service-expanded-view');
        view.classList.remove('active');
        setTimeout(() => {
          view.style.display = 'none';
        }, 500);
        document.body.style.overflow = 'auto';
      });
    });
  }

  // Close expanded view when clicking outside content
  expandedViews.forEach(view => {
    view.addEventListener('click', function(e) {
      if (e.target === this) {
        view.classList.remove('active');
        setTimeout(() => {
          view.style.display = 'none';
        }, 500);
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Testimonial Slider - Fixed for proper display
  const testimonials = document.querySelectorAll('.testimonial-content');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    const testimonialSlides = document.querySelectorAll('.testimonial');
    
    testimonialSlides.forEach((slide, i) => {
      slide.style.transform = `translateX(-${index * 100}%)`;
      slide.style.opacity = i === index ? '1' : '0.5';
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }
  
  if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
          currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
          currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
      });
    }
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
      });
    });
    
    // Auto slide testimonials
    setInterval(() => {
      currentTestimonial++;
      if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
      }
      showTestimonial(currentTestimonial);
    }, 8000);
  }

  // Video testimonials
  const videoTestimonials = document.querySelectorAll('.video-testimonial');
  const videoPrevBtn = document.querySelector('.video-prev-btn');
  const videoNextBtn = document.querySelector('.video-next-btn');
  const videoDots = document.querySelectorAll('.video-dot');
  let currentVideoTestimonial = 0;
  
  function showVideoTestimonial(index) {
    videoTestimonials.forEach(testimonial => {
      testimonial.style.display = 'none';
    });
    
    videoDots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    if (videoTestimonials[index]) {
      videoTestimonials[index].style.display = 'block';
    }
    
    if (videoDots[index]) {
      videoDots[index].classList.add('active');
    }
  }
  
  if (videoTestimonials.length > 0) {
    showVideoTestimonial(currentVideoTestimonial);
    
    if (videoPrevBtn) {
      videoPrevBtn.addEventListener('click', function() {
        currentVideoTestimonial--;
        if (currentVideoTestimonial < 0) {
          currentVideoTestimonial = videoTestimonials.length - 1;
        }
        showVideoTestimonial(currentVideoTestimonial);
      });
    }
    
    if (videoNextBtn) {
      videoNextBtn.addEventListener('click', function() {
        currentVideoTestimonial++;
        if (currentVideoTestimonial >= videoTestimonials.length) {
          currentVideoTestimonial = 0;
        }
        showVideoTestimonial(currentVideoTestimonial);
      });
    }
    
    videoDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentVideoTestimonial = index;
        showVideoTestimonial(currentVideoTestimonial);
      });
    });
  }

  // Tab functionality for testimonials
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all buttons
        tabBtns.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Show selected tab content
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
          selectedTab.classList.add('active');
        }
      });
    });
  }

  // Portfolio Filter - Removed from index.html but kept in case used elsewhere
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filter === 'all') {
            item.style.display = 'block';
            setTimeout(() => {
              item.classList.add('show');
            }, 50);
          } else if (item.classList.contains(filter)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.classList.add('show');
            }, 50);
          } else {
            item.style.display = 'none';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Video modal
  const videoTriggers = document.querySelectorAll('.play-btn, .video-trigger');
  const videoModal = document.querySelector('.video-modal');
  const videoClose = document.querySelector('.video-close');
  const videoFrame = document.querySelector('.video-frame');
  
  if (videoTriggers.length > 0 && videoModal) {
    videoTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const videoSrc = this.getAttribute('data-video');
        videoFrame.setAttribute('src', videoSrc);
        videoModal.style.display = 'flex';
        setTimeout(() => {
          videoModal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
      });
    });
    
    if (videoClose) {
      videoClose.addEventListener('click', function() {
        videoModal.classList.remove('active');
        setTimeout(() => {
          videoModal.style.display = 'none';
          videoFrame.setAttribute('src', '');
        }, 500);
        document.body.style.overflow = 'auto';
      });
    }
    
    videoModal.addEventListener('click', function(e) {
      if (e.target === this) {
        videoModal.classList.remove('active');
        setTimeout(() => {
          videoModal.style.display = 'none';
          videoFrame.setAttribute('src', '');
        }, 500);
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animation, .service-card, .testimonial-content, .contact-item, .contact-form');
    
    elements.forEach((element, index) => {
      if (isElementInViewport(element)) {
        // Set card-index for staggered animations
        element.style.setProperty('--card-index', index % 3);
        // Add animated class after a small delay
        setTimeout(() => {
          element.classList.add('animated');
        }, 100 * (index % 5));
      }
    });
  }
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }
  
  // Add scroll event listener for animations
  window.addEventListener('scroll', animateOnScroll);
  
  // Initial animation trigger
  setTimeout(animateOnScroll, 500);

  // Hero section parallax enhancements
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    // Set a background image if not already set
    if (!heroSection.style.backgroundImage) {
      heroSection.style.backgroundImage = 'url(https://source.unsplash.com/random/1920x1080/?studio)';
    }
    
    // Enhanced parallax effect
    document.addEventListener('mousemove', function(e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Smoother parallax with GSAP if available
      if (typeof gsap !== 'undefined') {
        gsap.to(heroSection, {
          backgroundPosition: `${50 + x * 10}% ${50 + y * 10}%`,
          duration: 1,
          ease: "power2.out"
        });
      } else {
        heroSection.style.backgroundPosition = `${50 + x * 10}% ${50 + y * 10}%`;
      }
      
      // Additional parallax for hero content
      const heroContent = heroSection.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translate(${x * 10 - 5}px, ${y * 10 - 5}px)`;
      }
    });
  }

  // Custom cursor with magnetic effect
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    document.addEventListener('mousemove', function(e) {
      // Default cursor positioning
      const posX = e.clientX;
      const posY = e.clientY;
      
      // Use GSAP for smoother cursor movement if available
      if (typeof gsap !== 'undefined') {
        gsap.to(cursor, {
          left: posX,
          top: posY,
          duration: 0.2,
          ease: "power2.out"
        });
      } else {
        cursor.style.left = `${posX}px`;
        cursor.style.top = `${posY}px`;
      }
    });
    
    // Enhanced magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .social-icon');
    
    magneticElements.forEach(item => {
      item.addEventListener('mouseenter', function() {
        cursor.classList.add('cursor-active');
        
        // Scale effect
        if (typeof gsap !== 'undefined') {
          gsap.to(cursor, {
            scale: 1.5,
            opacity: 0.9,
            duration: 0.3
          });
        } else {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursor.style.opacity = '0.9';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        cursor.classList.remove('cursor-active');
        
        // Reset scale
        if (typeof gsap !== 'undefined') {
          gsap.to(cursor, {
            scale: 1,
            opacity: 0.7,
            duration: 0.3
          });
        } else {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.opacity = '0.7';
        }
      });
      
      // Magnetic pull effect
      item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        if (typeof gsap !== 'undefined') {
          gsap.to(cursor, {
            left: e.clientX - deltaX * 0.2,
            top: e.clientY - deltaY * 0.2,
            duration: 0.2
          });
        }
      });
    });
  }

  // Enhanced form validation with better feedback
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Add input event listeners for real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Add focus/blur events for animation
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        if (this.value) {
          this.parentElement.classList.add('has-value');
        } else {
          this.parentElement.classList.remove('has-value');
        }
      });
      
      // Validation events
      input.addEventListener('input', function() {
        validateInput(this);
      });
      
      input.addEventListener('blur', function() {
        validateInput(this, true);
      });
    });
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all inputs
      let valid = true;
      inputs.forEach(input => {
        if (!validateInput(input, true)) {
          valid = false;
        }
      });
      
      if (valid) {
        // Show loading indicator
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Remove any existing messages
        const existingMsg = contactForm.querySelector('.form-message');
        if (existingMsg) {
          existingMsg.remove();
        }
        
        // Simulate form submission with a more realistic delay
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          // Show success message with animation
          const successMsg = document.createElement('div');
          successMsg.className = 'form-message success-message';
          successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
          contactForm.appendChild(successMsg);
          
          // Animate message in
          successMsg.style.opacity = '0';
          successMsg.style.transform = 'translateY(-10px)';
          
          // Force reflow
          successMsg.offsetHeight;
          
          // Fade in
          successMsg.style.transition = 'all 0.4s ease';
          successMsg.style.opacity = '1';
          successMsg.style.transform = 'translateY(0)';
          
          // Remove success message after a delay
          setTimeout(() => {
            // Fade out
            successMsg.style.opacity = '0';
            successMsg.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
              successMsg.remove();
            }, 400);
          }, 5000);
          
          // Reset fields validation state
          inputs.forEach(input => {
            input.classList.remove('error', 'valid');
            input.parentElement.classList.remove('has-value', 'focused');
            const feedback = input.parentElement.querySelector('.input-feedback');
            if (feedback) {
              feedback.remove();
            }
          });
        }, 2000);
      }
    });
    
    function validateInput(input, showMessage = false) {
      let isValid = true;
      let message = '';
      const value = input.value.trim();
      
      // Remove any existing feedback
      const existingFeedback = input.parentElement.querySelector('.input-feedback');
      if (existingFeedback) {
        existingFeedback.remove();
      }
      
      // Validate based on input type
      if (input.hasAttribute('required') && value === '') {
        isValid = false;
        message = 'This field is required';
      } else if (input.type === 'email' && value !== '' && !isValidEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
      } else if (input.type === 'tel' && value !== '' && !isValidPhone(value)) {
        isValid = false;
        message = 'Please enter a valid phone number';
      } else if (input.tagName === 'SELECT' && input.value === '' && input.hasAttribute('required')) {
        isValid = false;
        message = 'Please select an option';
      }
      
      // Update input class
      input.classList.remove('error', 'valid');
      input.classList.add(isValid ? 'valid' : 'error');
      
      // Show message if requested (on blur or submit)
      if (showMessage && !isValid) {
        const feedback = document.createElement('span');
        feedback.className = 'input-feedback';
        feedback.textContent = message;
        input.parentElement.appendChild(feedback);
      }
      
      return isValid;
    }
    
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    
    function isValidPhone(phone) {
      const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      return re.test(String(phone));
    }
  }

  // Back to top button with smoother animation
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        if (!backToTopBtn.classList.contains('show')) {
          backToTopBtn.classList.add('show');
          backToTopBtn.style.display = 'flex';
          
          // Animate in
          setTimeout(() => {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
          }, 10);
        }
      } else {
        if (backToTopBtn.classList.contains('show')) {
          // Animate out
          backToTopBtn.style.opacity = '0';
          backToTopBtn.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            backToTopBtn.classList.remove('show');
            backToTopBtn.style.display = 'none';
          }, 300);
        }
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Smooth scroll with easing if GSAP is available
      if (typeof gsap !== 'undefined') {
        gsap.to(window, {
          scrollTo: 0,
          duration: 1.5,
          ease: "power4.out"
        });
      } else {
        // Standard smooth scroll fallback
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  // Theme toggle with smoother transitions
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      // Add transition class to body for smoother theme transitions
      document.body.classList.add('theme-transitioning');
      
      // Toggle theme
      document.body.classList.toggle('light-mode');
      
      // Save preference to localStorage
      if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggle.querySelector('i').className = 'fas fa-moon';
      } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.querySelector('i').className = 'fas fa-sun';
      }
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 1000);
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      if (themeToggle.querySelector('i')) {
        themeToggle.querySelector('i').className = 'fas fa-moon';
      }
    }
  }

  // Enhanced AOS alternative - improved animation on scroll
  const animatedElements = document.querySelectorAll('[data-animation]');
  
  function checkAnimation() {
    animatedElements.forEach(element => {
      const animationType = element.dataset.animation;
      const delay = parseInt(element.dataset.delay) || 0;
      const duration = parseInt(element.dataset.duration) || 800;
      
      if (isElementInViewport(element)) {
        setTimeout(() => {
          // Apply animation using GSAP if available
          if (typeof gsap !== 'undefined') {
            let animProps = {};
            
            // Set appropriate animation properties based on animation type
            switch(animationType) {
              case 'fade-up':
                animProps = {opacity: 1, y: 0, duration: duration/1000};
                break;
              case 'fade-down':
                animProps = {opacity: 1, y: 0, duration: duration/1000};
                break;
              case 'fade-left':
                animProps = {opacity: 1, x: 0, duration: duration/1000};
                break;
              case 'fade-right':
                animProps = {opacity: 1, x: 0, duration: duration/1000};
                break;
              case 'zoom-in':
                animProps = {opacity: 1, scale: 1, duration: duration/1000};
                break;
              default:
                animProps = {opacity: 1, duration: duration/1000};
            }
            
            // Apply animation
            gsap.to(element, animProps);
          } else {
            // Fallback to class-based animations if GSAP isn't available
            element.classList.add(animationType);
            element.classList.add('animated');
          }
        }, delay);
      }
    });
  }
  
  window.addEventListener('scroll', checkAnimation);
  checkAnimation(); // Check on page load
  
  // Run animations on about section stats when it comes into view
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const countElements = statsSection.querySelectorAll('.count');
    let animationTriggered = false;
    
    function animateStats() {
      if (isElementInViewport(statsSection) && !animationTriggered) {
        animationTriggered = true;
        
        countElements.forEach(countElement => {
          const targetCount = parseInt(countElement.textContent);
          const duration = 2000; // 2 seconds
          const startTime = Date.now();
          const startValue = 0;
          
          function updateCount() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime < duration) {
              const progress = elapsedTime / duration;
              // Easing function for smoother counting
              const easedProgress = 1 - Math.pow(1 - progress, 3);
              const currentCount = Math.floor(startValue + (targetCount - startValue) * easedProgress);
              
              countElement.textContent = currentCount + (countElement.textContent.includes('+') ? '+' : '');
              requestAnimationFrame(updateCount);
            } else {
              countElement.textContent = targetCount + (countElement.textContent.includes('+') ? '+' : '');
            }
          }
          
          updateCount();
        });
      }
    }
    
    window.addEventListener('scroll', animateStats);
    // Initial check
    setTimeout(animateStats, 500);
  }
});

/**
 * Sets up animations throughout the site
 */
function initializeAnimations() {
  // Add animation initializations here if needed
  if (typeof gsap !== 'undefined') {
    // Initialize hero section animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.from(heroContent.querySelectorAll('h1, p'), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
      
      gsap.from(heroContent.querySelectorAll('.btn'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        ease: "back.out(1.7)"
      });
    }
    
    // Initialize scroll-triggered animations
    if (gsap.registerPlugin && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      
      // Service cards
      gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.1
        });
      });
      
      // About section
      const aboutSection = document.querySelector('.about-content');
      if (aboutSection) {
        const aboutTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 70%"
          }
        });
        
        aboutTimeline
          .from('.about-image', {
            x: -50,
            opacity: 0,
            duration: 0.8
          })
          .from('.about-text h3', {
            y: 30,
            opacity: 0,
            duration: 0.5
          }, "-=0.4")
          .from('.about-text p', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2
          }, "-=0.2")
          .from('.stat', {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.15
          }, "-=0.1")
          .from('.about-text .btn', {
            y: 20,
            opacity: 0,
            duration: 0.4
          }, "-=0.2");
      }
    }
  }
}

// Call initialize animations if GSAP is loaded
window.addEventListener('load', function() {
  if (typeof gsap !== 'undefined') {
    initializeAnimations();
  }
  
  // Update any other functions as needed
  setupEventListeners();
  setupAnimations();
  customCursor();
});

/**
 * Sets up event listeners for interactive elements
 */
function setupEventListeners() {
  // Service card expandable sections
  const toggleButtons = document.querySelectorAll('.toggle-expanded');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetView = document.getElementById(targetId);
      
      if (targetView) {
        document.querySelectorAll('.expanded-view').forEach(view => {
          if (view !== targetView) {
            view.classList.remove('active');
          }
        });
        
        targetView.classList.toggle('active');
      }
    });
  });
  
  // Close expanded view buttons
  const closeButtons = document.querySelectorAll('.close-expanded');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const expandedView = this.closest('.expanded-view');
      if (expandedView) {
        expandedView.classList.remove('active');
      }
    });
  });
  
  // Testimonial sliders
  initializeTestimonialSliders();
}

/**
 * Initialize testimonial sliders
 */
function initializeTestimonialSliders() {
  // Text testimonials
  const textSliderContainer = document.querySelector('.testimonial-slider');
  const textSlides = document.querySelectorAll('.testimonial-slide');
  const textPrevBtn = document.querySelector('.text-testimonials .prev');
  const textNextBtn = document.querySelector('.text-testimonials .next');
  
  if (textSlides.length && textPrevBtn && textNextBtn) {
    let textCurrentIndex = 0;
    
    textPrevBtn.addEventListener('click', () => {
      textCurrentIndex = (textCurrentIndex > 0) ? textCurrentIndex - 1 : textSlides.length - 1;
      updateTextSlider();
    });
    
    textNextBtn.addEventListener('click', () => {
      textCurrentIndex = (textCurrentIndex < textSlides.length - 1) ? textCurrentIndex + 1 : 0;
      updateTextSlider();
    });
    
    function updateTextSlider() {
      const offset = -textCurrentIndex * 100;
      textSliderContainer.style.transform = `translateX(${offset}%)`;
    }
  }
  
  // Video testimonials
  const videoSliderContainer = document.querySelector('.video-testimonial-slider');
  const videoSlides = document.querySelectorAll('.video-testimonial-slide');
  const videoPrevBtn = document.querySelector('.video-testimonials .prev');
  const videoNextBtn = document.querySelector('.video-testimonials .next');
  
  if (videoSlides.length && videoPrevBtn && videoNextBtn) {
    let videoCurrentIndex = 0;
    
    videoPrevBtn.addEventListener('click', () => {
      videoCurrentIndex = (videoCurrentIndex > 0) ? videoCurrentIndex - 1 : videoSlides.length - 1;
      updateVideoSlider();
    });
    
    videoNextBtn.addEventListener('click', () => {
      videoCurrentIndex = (videoCurrentIndex < videoSlides.length - 1) ? videoCurrentIndex + 1 : 0;
      updateVideoSlider();
    });
    
    function updateVideoSlider() {
      const offset = -videoCurrentIndex * 100;
      videoSliderContainer.style.transform = `translateX(${offset}%)`;
    }
  }
}

// Handle form submissions
function setupFormSubmissions() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would normally send the form data to your server
      // For demonstration, we'll just show a success message
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
}

// Add animation classes
function setupAnimations() {
  // Scroll animation setup (if not disabled)
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  elementsToAnimate.forEach(element => {
    element.classList.add('animated');
  });
}

// Setup portfolio filters
function setupPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}

// Setup service expanders
function setupServiceExpanders() {
  const expandButtons = document.querySelectorAll('.service-expand-btn');
  const expandedViews = document.querySelectorAll('.service-expanded-view');
  const closeButtons = document.querySelectorAll('.expanded-close');
  
  if (expandButtons.length > 0) {
    expandButtons.forEach(button => {
      button.addEventListener('click', function() {
        const serviceType = this.closest('.service-card').getAttribute('data-service');
        const targetExpanded = document.getElementById(`${serviceType}-expanded`);
        
        if (targetExpanded) {
          // Hide all expanded views first
          expandedViews.forEach(view => view.classList.remove('active'));
          
          // Show the target expanded view
          targetExpanded.classList.add('active');
          
          // Scroll to the expanded view
          targetExpanded.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
    
    // Close button functionality
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        this.closest('.service-expanded-view').classList.remove('active');
      });
    });
  }
}

// Update copyright year
function updateCopyrightYear() {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
} 

// Hero section animations
function animateHero() {
  const heroContent = document.querySelector('.hero-content');
  
  if (!heroContent) return;
  
  const heroTimeline = gsap.timeline({
    defaults: { 
      ease: 'power3.out',
      duration: 1
    }
  });
  
  // Split text for animation if SplitType exists
  let heroTitle, heroChars;
  if (typeof SplitType !== 'undefined') {
    heroTitle = new SplitType('.hero-content h1', { types: 'words, chars' });
    heroChars = heroTitle.chars;
  } else {
    heroChars = document.querySelector('.hero-content h1');
  }
  
  const heroDesc = document.querySelector('.hero-content p');
  const heroBtns = document.querySelectorAll('.hero-content .btn');
  
  heroTimeline
    .from(heroChars, {
      opacity: 0,
      y: 50,
      stagger: 0.02,
      duration: 1.2
    })
    .from(heroDesc, {
      opacity: 0,
      y: 30
    }, '-=0.6')
    .from(heroBtns, {
      opacity: 0,
      y: 30,
      stagger: 0.2
    }, '-=0.6');
}

// Section header animations
function animateSectionHeaders() {
  const sectionHeaders = document.querySelectorAll('.section-header');
  
  sectionHeaders.forEach(header => {
    const title = header.querySelector('h2');
    const subtitle = header.querySelector('p');
    
    if (title && subtitle) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
      
      tl.from(title, {
        y: 50,
        opacity: 0,
        duration: 0.8
      })
      .from(subtitle, {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.5');
    }
  });
}

// Service cards animations
function animateServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1
    });
  });
}

// Stats counter animation
function animateStats() {
  const stats = document.querySelectorAll('.stats .stat');
  
  stats.forEach((stat, index) => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2
    });
  });
}

// Testimonial animations
function animateTestimonials() {
  const testimonialContent = document.querySelectorAll('.testimonial-content');
  
  testimonialContent.forEach(content => {
    gsap.from(content, {
      scrollTrigger: {
        trigger: content,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8
    });
  });
}

// Contact section animations
function animateContact() {
  const contactItems = document.querySelectorAll('.contact-item');
  const contactForm = document.querySelector('.contact-form');
  
  // Animate contact info items
  contactItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1
    });
  });
  
  // Animate contact form
  if (contactForm) {
    gsap.from(contactForm, {
      scrollTrigger: {
        trigger: contactForm,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8
    });
  }
}

// Custom cursor animation
function customCursor() {
  const cursor = document.querySelector('.custom-cursor');
  
  if (!cursor) return;
  
  if (typeof gsap !== 'undefined') {
    // Use GSAP for smoother animation if available
    document.addEventListener('mousemove', e => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
      });
    });
    
    // Scale cursor on links and buttons
    const links = document.querySelectorAll('a, button, .service-card, .testimonial');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
          scale: 1.5,
          opacity: 0.9,
          duration: 0.3
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
          scale: 1,
          opacity: 0.7,
          duration: 0.3
        });
      });
    });
  } else {
    // Fallback to regular CSS if GSAP is not available
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    // Basic hover effects
    const links = document.querySelectorAll('a, button, .service-card, .testimonial');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.opacity = '0.9';
      });
      
      link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.opacity = '0.7';
      });
    });
  }
}

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-finish');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }
    
    // Initialize service icons - remove any existing pulse animations
    const serviceIcons = document.querySelectorAll('.service-card .service-icon');
    if (serviceIcons.length > 0) {
        // Remove pulse class from all icons initially
        serviceIcons.forEach(icon => {
            icon.classList.remove('pulse');
        });
        
        // Add pulse effect only on hover
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            const icon = card.querySelector('.service-icon');
            
            card.addEventListener('mouseenter', () => {
                icon.classList.add('pulse');
            });
            
            card.addEventListener('mouseleave', () => {
                icon.classList.remove('pulse');
            });
        });
    }
}); 