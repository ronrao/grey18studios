// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const serviceCards = document.querySelectorAll('.service-card');
const serviceExpandBtns = document.querySelectorAll('.service-expand-btn');
const expandedViews = document.querySelectorAll('.service-expanded-view');
const expandedCloseButtons = document.querySelectorAll('.expanded-close');
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const videoThumbnails = document.querySelectorAll('.video-thumbnail');
const contactForm = document.getElementById('contactForm');
const cursor = document.querySelector('.cursor');
const counters = document.querySelectorAll('.count');
const sections = document.querySelectorAll('section');
const pricingToggle = document.getElementById('pricing-toggle');
const portfolioNavItems = document.querySelectorAll('.portfolio-nav-item');
const portfolioCategories = document.querySelectorAll('.portfolio-category');
const navMenu = document.querySelector('nav ul');
const projectPricing = document.querySelector('.project-pricing');
const monthlyPricing = document.querySelector('.monthly-pricing');

// Initialize variables
let currentSlide = 0;
let isAnimating = false;
let scrollPosition = window.scrollY;
let bodyScrollPosition = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let lastScrollTop = 0;

// Event Listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', initializeWebsite);
menuToggle.addEventListener('click', toggleMenu);

// Debug logging for navigation
console.log('Initializing navigation links...');
document.querySelectorAll('a').forEach(link => {
  const href = link.getAttribute('href');
  console.log('Link found:', href);
});

// Direct and simple navigation handler - force all links to work without prevention
document.addEventListener('DOMContentLoaded', () => {
  const allLinks = document.querySelectorAll('a[href]');
  console.log(`Found ${allLinks.length} links on the page`);
  
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Make sure links work by adding a direct click handler
    link.addEventListener('click', function(e) {
      if (href.includes('.html')) {
        console.log('Navigating to:', href);
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
});

// Make sure all navigation links work properly
document.addEventListener('DOMContentLoaded', function() {
  // Fix navigation links
  document.querySelectorAll('a[href], .btn, button').forEach(function(element) {
    element.addEventListener('click', function(e) {
      const href = element.getAttribute('href');
      if (href && href.includes('.html')) {
        window.location.href = href;
      }
      
      // If it's in a link but doesn't have its own href
      if (!href) {
        const parentLink = element.closest('a[href]');
        if (parentLink) {
          const parentHref = parentLink.getAttribute('href');
          if (parentHref && parentHref.includes('.html')) {
            window.location.href = parentHref;
          }
        }
      }
    });
  });
});

// Position the cursor exactly at the click point
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;
  
  // Set cursor position to match where the user is clicking
  document.addEventListener('mousemove', function(e) {
    // Position the cursor at the exact x,y coordinates of the mouse pointer
    cursor.style.left = (e.pageX - 4) + 'px'; // Offset to align with exact click point
    cursor.style.top = (e.pageY - 2) + 'px'; // Offset to align with exact click point
  });
  
  // Hide when mouse leaves window
  document.addEventListener('mouseleave', function() {
    cursor.style.display = 'none';
  });
  
  // Show when mouse enters window
  document.addEventListener('mouseenter', function() {
    cursor.style.display = 'block';
  });
  
  // Listen for clicks to ensure the cursor alignment is correct
  document.addEventListener('click', function(e) {
    console.log('Click at:', e.pageX, e.pageY);
    // Momentarily highlight the cursor to show the click point
    cursor.style.boxShadow = '0 0 10px rgba(78, 205, 196, 0.8)';
    setTimeout(function() {
      cursor.style.boxShadow = 'none';
    }, 200);
  });
});

// Make sure all links actually work by adding direct click handlers
function enableAllLinks() {
  // Enable all normal links
  document.querySelectorAll('a[href]').forEach(function(link) {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Add direct click handler that immediately navigates
    link.addEventListener('click', function(e) {
      if (href.includes('.html')) {
        window.location.href = href;
      }
    });
  });
  
  // Enable all buttons that should trigger navigation
  document.querySelectorAll('.btn, button').forEach(function(button) {
    button.addEventListener('click', function() {
      // If button is inside an <a> tag, trigger the parent link
      const parentLink = button.closest('a[href]');
      if (parentLink) {
        const href = parentLink.getAttribute('href');
        if (href && href.includes('.html')) {
          window.location.href = href;
        }
      }
    });
  });
  
  // Specifically enable service cards
  document.querySelectorAll('.service-card').forEach(function(card) {
    card.addEventListener('click', function() {
      const serviceType = this.getAttribute('data-service');
      if (serviceType) {
        openExpandedView(serviceType);
      }
    });
  });
  
  // Make menu toggle work
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      toggleMenu();
    });
  }
}

// Force-enable all service cards with direct event handling
serviceCards.forEach(card => {
  card.style.pointerEvents = 'auto';
  
  // Add multiple event listeners for better responsiveness
  ['mouseenter', 'mouseover', 'mousemove'].forEach(eventType => {
    card.addEventListener(eventType, () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
  });
  
  ['mouseleave', 'mouseout'].forEach(eventType => {
    card.addEventListener(eventType, () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // Simpler and more direct click handler for service cards
  card.addEventListener('click', function(event) {
    // Only handle clicks directly on the card itself, not on the button
    if (!event.target.classList.contains('service-expand-btn') && 
        !event.target.closest('.service-expand-btn')) {
      const serviceType = this.getAttribute('data-service');
      console.log('Card clicked:', serviceType);
      openExpandedView(serviceType);
    }
  });
});

// Fix for service expand buttons
document.addEventListener('DOMContentLoaded', function() {
  const expandButtons = document.querySelectorAll('.service-expand-btn');
  expandButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default behavior
      e.stopPropagation(); // Prevent the event from bubbling up
      
      const serviceCard = this.closest('.service-card');
      if (serviceCard) {
        const serviceType = serviceCard.getAttribute('data-service');
        if (serviceType) {
          console.log('Service expand button clicked:', serviceType);
          
          // Don't allow the browser to change scroll position
          setTimeout(() => {
            openExpandedView(serviceType);
          }, 0);
        }
      }
    });
  });
});

// Simpler expanded view opener
function openExpandedView(serviceType) {
  console.log('Opening expanded view for:', serviceType);
  
  // Store scroll position
  const scrollPos = window.scrollY;
  document.body.dataset.scrollY = scrollPos;
  bodyScrollPosition = scrollPos; // Share with the standalone functions
  
  // Disable body scroll
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPos}px`;
  document.body.style.width = '100%';
  
  // Find the expanded view
  const expandedView = document.getElementById(`${serviceType}-expanded`);
  if (!expandedView) {
    console.error('Could not find expanded view:', serviceType);
    return;
  }
  
  // Show expanded view
  expandedView.style.visibility = 'visible';
  expandedView.classList.add('active');
  
  // Fade in
  setTimeout(() => {
    expandedView.style.opacity = '1';
  }, 10);
}

// Clean up event handlers for better memory management
expandedCloseButtons.forEach(btn => {
  btn.addEventListener('click', closeExpandedView);
});

function closeExpandedView() {
  // Find all active expanded views
  const activeExpandedViews = document.querySelectorAll('.service-expanded-view.active');
  
  // Hide each one
  activeExpandedViews.forEach(view => {
    view.style.opacity = '0';
    
    setTimeout(() => {
      view.classList.remove('active');
      view.style.visibility = 'hidden';
    }, 300);
  });
  
  // Re-enable body scroll
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  // Use the stored scroll position (prefer bodyScrollPosition if available)
  const scrollPos = bodyScrollPosition || parseInt(document.body.dataset.scrollY || '0');
  
  // Restore scroll position with smooth behavior
  window.scrollTo({
    top: scrollPos,
    behavior: 'auto' // Using 'auto' instead of 'smooth' to prevent jarring effect
  });
}

// Force all buttons to work directly
document.querySelectorAll('button, .btn').forEach(button => {
  if (button.closest('a[href]')) return; // Skip buttons inside links
  
  button.addEventListener('click', function(e) {
    console.log('Button clicked:', this.textContent.trim());
    
    // If this is a navigation button with a parent link
    const parentLink = this.closest('a[href]');
    if (parentLink) {
      const href = parentLink.getAttribute('href');
      if (href && href.includes('.html')) {
        e.preventDefault();
        window.location.href = href;
      }
    }
  });
});

// Footer links fix - force all footer links to work
document.querySelectorAll('footer a[href]').forEach(link => {
  const href = link.getAttribute('href');
  
  link.addEventListener('click', function(e) {
    console.log('Footer link clicked:', href);
    
    if (href && href.includes('.html')) {
      e.preventDefault();
      window.location.href = href;
    } else if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// General page initialization
function initializeWebsite() {
  console.log('Website initialized');
  
  // Initialize all sections
  document.addEventListener('DOMContentLoaded', () => {
    // Fix page transitions
    fixPageNavigation();
    
    // Fix service cards
    initServiceCards();
    
    // Enable testimonial functionality
    initTestimonialSliders();
    
    // Initialize Portfolio Category Navigation
    initPortfolioCategories();
    
    // Initialize Pricing Toggle
    initPricingToggle();
    
    // Initialize FAQ items
    initFaqItems();
  });
}

// Function to ensure all links work
function fixPageNavigation() {
  // Force all links with href to be clickable
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip empty links
    if (!href || href === '#') return;
    
    // Apply direct event handlers
    link.addEventListener('click', function(e) {
      if (href.includes('.html')) {
        console.log('Navigating to page:', href);
        window.location.href = href;
      } else if (href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Use standard window scroll handler function
function handleScroll() {
  scrollPosition = window.scrollY;
  
  // Sticky header
  if (scrollPosition > 50) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

// Testimonial Tabs Functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding content
        const tabId = this.getAttribute('data-tab');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
    });
});

// Video Testimonial Playback
videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        // In a real application, this would open a video player
        alert('Video testimonial would play here in a real application.');
    });
});

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        changeSlide(-1);
    });
    
    nextBtn.addEventListener('click', () => {
        changeSlide(1);
    });
}

if (dots) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (name && email && message) {
            // In a real application, you would send this data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill out all required fields.');
        }
    });
}

// Portfolio item and expanded view play button functionality
const playBtns = document.querySelectorAll('.play-btn');

playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // In a real application, this would open a modal with audio/video player
        alert('Audio/Video player would open here in a real application.');
    });
});

// Functions
function changeSlide(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    // Hide current slide
    testimonials[currentSlide].style.opacity = '0';
    
    // Update current slide index
    currentSlide = (currentSlide + direction + testimonials.length) % testimonials.length;
    
    // Show new slide after a short delay
    setTimeout(() => {
        updateSlider();
        isAnimating = false;
    }, 300);
}

function goToSlide(index) {
    if (isAnimating || currentSlide === index) return;
    isAnimating = true;
    
    // Hide current slide
    testimonials[currentSlide].style.opacity = '0';
    
    // Update current slide index
    currentSlide = index;
    
    // Show new slide after a short delay
    setTimeout(() => {
        updateSlider();
        isAnimating = false;
    }, 300);
}

function updateSlider() {
    // Update testimonial display
    testimonials.forEach((testimonial, index) => {
        if (index === currentSlide) {
            testimonial.style.display = 'block';
            setTimeout(() => {
                testimonial.style.opacity = '1';
            }, 50);
        } else {
            testimonial.style.opacity = '0';
            setTimeout(() => {
                testimonial.style.display = 'none';
            }, 300);
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function countUp() {
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let count = 0;
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count) + '+';
                setTimeout(updateCount, 10);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCount();
    });
}

function animateOnScroll() {
    // Animate stats counters when in view
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsSectionTop = statsSection.offsetTop;
        const statsSectionHeight = statsSection.offsetHeight;
        
        if (scrollPosition > statsSectionTop - window.innerHeight + statsSectionHeight / 2 && !statsSection.classList.contains('animated')) {
            statsSection.classList.add('animated');
            countUp();
        }
    }
    
    // Add more scroll animations here as needed
}

// Function to handle the portfolio page navigation based on hash
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the portfolio page
    const portfolioCategories = document.querySelectorAll('.portfolio-category');
    const portfolioNavItems = document.querySelectorAll('.portfolio-nav-item');
    
    if (portfolioCategories.length > 0 && portfolioNavItems.length > 0) {
        // Get the hash from the URL
        let hash = window.location.hash;
        
        // If hash exists and corresponds to a category, show that category
        if (hash && hash.length > 1) {
            // Remove the # from the hash
            hash = hash.substring(1);
            
            // Find the corresponding category
            const targetCategory = document.getElementById(hash);
            
            if (targetCategory) {
                // Hide all categories
                portfolioCategories.forEach(category => {
                    category.classList.remove('active');
                });
                
                // Show the target category
                targetCategory.classList.add('active');
                
                // Update nav items
                portfolioNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + hash) {
                        item.classList.add('active');
                    }
                });
                
                // Scroll to the category
                setTimeout(() => {
                    targetCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
        
        // Add click event listeners to portfolio nav items
        portfolioNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target category ID
                const targetId = this.getAttribute('href').substring(1);
                const targetCategory = document.getElementById(targetId);
                
                if (targetCategory) {
                    // Hide all categories
                    portfolioCategories.forEach(category => {
                        category.classList.remove('active');
                    });
                    
                    // Show the target category
                    targetCategory.classList.add('active');
                    
                    // Update nav items
                    portfolioNavItems.forEach(navItem => {
                        navItem.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Update the URL hash
                    window.location.hash = targetId;
                    
                    // Scroll to the category
                    targetCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
});

// Make logo clickable to return to home page
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            // Check if we're on the home page (index.html)
            if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/GREY%2018/')) {
                // Smooth scroll to top if on home page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Navigate to home page if on another page
                window.location.href = 'index.html';
            }
        });
    }
});

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Initialize animations
    initCursor();
    initPageTransitions();
    initScrollAnimations();
    initHeroAnimations();
    initServiceCards();
    initTestimonialSliders();
    
    // Set the current year in footer
    const currentYearElements = document.querySelectorAll('[data-current-year]');
    currentYearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });
    
    // Add specific animations for Equipment and Pricing pages
    initEquipmentAnimations();
    initPricingAnimations();
    
    // Hide loading screen after a delay
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading');
        if (loadingScreen) {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                }
            });
        }
    }, 1000);
});

// Camera cursor functionality
function initCursor() {
    const cursor = document.querySelector('.cursor');
    
    if (!cursor) return;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Show custom cursor
    cursor.style.display = 'block';
    
    // Update cursor position with smooth movement
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power1.out"
        });
    });
    
    // Scale effect on clickable elements
    const clickables = document.querySelectorAll('a, button, .service-card, .portfolio-item, .social-icon, input, select, textarea, .logo, .genre-card, .equipment-card, .pricing-card');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                opacity: 0.7,
                duration: 0.3,
                ease: "elastic.out(1, 0.7)"
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: "elastic.out(1, 0.7)"
            });
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        gsap.to(cursor, {
            scale: 0.8,
            duration: 0.2,
            ease: "power2.out"
        });
    });
    
    document.addEventListener('mouseup', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
        });
    });
}

// Function to initialize page transitions
function initPageTransitions() {
    console.log('Initializing page transitions...');
    
    // Handle initial page load animation
    const pageTransitionOverlay = document.querySelector('.page-transition-overlay');
    const loadingScreen = document.querySelector('.loading');
    
    if (loadingScreen) {
        // Hide loading screen with delay
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                // Remove from DOM after animation completes to improve performance
                loadingScreen.style.display = 'none';
            }, 800);
        }, 1000);
    }
    
    // Listen for page navigation events
    window.addEventListener('beforeunload', () => {
        if (pageTransitionOverlay) {
            // Show page transition overlay when navigating away
            pageTransitionOverlay.classList.add('active');
        }
    });
    
    // Ensure the overlay is hidden initially when the page loads
    if (pageTransitionOverlay) {
        setTimeout(() => {
            pageTransitionOverlay.style.transform = 'translateY(100%)';
        }, 200);
    }
}

// Hero section animations
function initHeroAnimations() {
    const heroSection = document.querySelector('.hero, .about-hero, .portfolio-hero, .contact-hero, .equipment-hero, .pricing-hero');
    
    if (!heroSection) return;
    
    const heroHeading = heroSection.querySelector('h1');
    const heroText = heroSection.querySelector('p');
    const heroButtons = heroSection.querySelectorAll('.btn, .cta-buttons a');
    
    if (heroHeading) {
        // Split text for character animation
        const splitHeading = new SplitType(heroHeading, { types: 'chars, words' });
        
        gsap.from(splitHeading.chars, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            stagger: 0.03,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.5
        });
    }
    
    if (heroText) {
        gsap.from(heroText, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.8,
            ease: "power2.out"
        });
    }
    
    if (heroButtons.length > 0) {
        gsap.from(heroButtons, {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.8,
            delay: 1,
            ease: "power2.out"
        });
    }
    
    // Parallax effect for hero section
    gsap.fromTo(heroSection, 
        { backgroundPosition: '50% 0%' },
        { 
            backgroundPosition: '50% 20%', 
            ease: "none",
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        }
    );
}

// Scroll animations with bidirectional functionality
function initScrollAnimations() {
    // Use IntersectionObserver for smoother animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use CSS hardware acceleration for animations
                entry.target.style.willChange = 'transform, opacity';
                entry.target.classList.add('animated');
                
                // Reset willChange after animation completes to free up resources
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 1000);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    });

    // Get elements to animate
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animations to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Animate section headers
        const sectionHeader = section.querySelector('.section-header');
        if (sectionHeader) {
            gsap.from(sectionHeader, {
                scrollTrigger: {
                    trigger: sectionHeader,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            });
        }
        
        // Animate service cards with staggered effect
        const cards = section.querySelectorAll('.service-card, .team-member, .equipment-card, .pricing-card, .genre-card, .contact-item');
        if (cards.length > 0) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: cards[0].parentElement,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 40,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            });
        }
        
        // Animate portfolio items and testimonials
        const portfolioItems = section.querySelectorAll('.portfolio-item, .expanded-portfolio-item, .testimonial');
        if (portfolioItems.length > 0) {
            gsap.from(portfolioItems, {
                scrollTrigger: {
                    trigger: portfolioItems[0].parentElement,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out"
            });
        }
        
        // Animate contact form and CTA elements
        const ctaElements = section.querySelectorAll('.contact-form, .team-cta, .custom-quote, .additional-info');
        if (ctaElements.length > 0) {
            gsap.from(ctaElements, {
                scrollTrigger: {
                    trigger: ctaElements[0],
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power2.out"
            });
        }
    });

    // Animate statistics counters
    const statsSection = document.querySelector('.stats, .about-stats');
    if (statsSection) {
        const counterElements = statsSection.querySelectorAll('.count');
        
        ScrollTrigger.create({
            trigger: statsSection,
            start: "top 80%",
            onEnter: () => animateCounters(counterElements),
            once: true
        });
    }

    // Optimize GSAP animations for smoother performance
    if (typeof gsap !== 'undefined') {
        gsap.config({
            force3D: true,
            nullTargetWarn: false,
            autoSleep: 60,
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,webkitfullscreenchange,resize"
        });
    }
}

// Function to animate stat counters
function animateCounters(countElements) {
    countElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
        const current = parseInt(counter.textContent) || 0;
        
        gsap.fromTo(counter, 
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: () => {
                    counter.textContent = Math.round(counter.textContent) + '+';
                }
            }
        );
    });
}

// Service cards interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length === 0) return;
    
    // 3D tilt effect
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            // Calculate mouse position relative to card center
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation (limited to +/- 10 degrees)
            const rotateY = gsap.utils.clamp(-10, 10, mouseX * -0.05);
            const rotateX = gsap.utils.clamp(-10, 10, mouseY * 0.05);
            
            // Apply transform
            gsap.to(card, {
                rotateY: rotateY,
                rotateX: rotateX,
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                duration: 0.3,
                ease: "power2.out",
                transformPerspective: 1000,
                transformOrigin: "center center"
            });
            
            // Add shine effect
            const serviceIcon = card.querySelector('.service-icon');
            if (serviceIcon) {
                const shineX = (e.offsetX / cardRect.width) * 100;
                const shineY = (e.offsetY / cardRect.height) * 100;
                
                gsap.to(serviceIcon, {
                    background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
                    duration: 0.3
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                duration: 0.6,
                ease: "elastic.out(1, 0.75)"
            });
            
            const serviceIcon = card.querySelector('.service-icon');
            if (serviceIcon) {
                gsap.to(serviceIcon, {
                    background: "none",
                    duration: 0.3
                });
            }
        });
    });
    
    // Handle service card expanded views
    const expandBtns = document.querySelectorAll('.service-expand-btn');
    const expandedViews = document.querySelectorAll('.service-expanded-view');
    const closeBtns = document.querySelectorAll('.expanded-close');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const serviceCard = btn.closest('.service-card');
            const serviceType = serviceCard.getAttribute('data-service');
            const expandedView = document.getElementById(`${serviceType}-expanded`);
            
            if (!expandedView) return;
            
            // Store scroll position
            const scrollPos = window.scrollY;
            document.body.dataset.scrollY = scrollPos;
            bodyScrollPosition = scrollPos; // Share with the standalone functions
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPos}px`;
            document.body.style.width = '100%';
            
            // Show expanded view with animations
            expandedView.classList.add('active');
            
            // Animate content
            const expandedContent = expandedView.querySelector('.expanded-content');
            if (expandedContent) {
                gsap.fromTo(expandedContent,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
                );
                
                // Animate inner elements
                const innerElements = expandedContent.querySelectorAll('h2, p, .expanded-portfolio-item');
                gsap.fromTo(innerElements,
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        stagger: 0.1, 
                        duration: 0.8, 
                        delay: 0.2, 
                        ease: "power2.out" 
                    }
                );
            }
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const expandedView = btn.closest('.service-expanded-view');
            
            // Animate content out
            const expandedContent = expandedView.querySelector('.expanded-content');
            if (expandedContent) {
                gsap.to(expandedContent, {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        expandedView.classList.remove('active');
                        
                        // Restore scroll
                        const scrollPos = parseInt(document.body.dataset.scrollY || '0');
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.top = '';
                        document.body.style.width = '';
                        window.scrollTo(0, scrollPos);
                    }
                });
            }
        });
    });
}

// Testimonial sliders with enhanced animations
function initTestimonialSliders() {
    // Text testimonial slider
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const textSlider = document.querySelector('.testimonial-slider');
    const textDots = document.querySelectorAll('.dot');
    const textPrevBtn = document.querySelector('.prev-btn');
    const textNextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let isAnimating = false;
    
    // Tab switching
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active tab
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Get corresponding content
                const tabId = btn.getAttribute('data-tab');
                
                // Animate tab content
                tabContents.forEach(content => {
                    if (content.id === tabId) {
                        // Show content with animation
                        content.style.display = 'block';
                        gsap.fromTo(content,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                        );
                    } else {
                        // Hide other content
                        gsap.to(content, {
                            opacity: 0,
                            y: -20,
                            duration: 0.3,
                            ease: "power2.in",
                            onComplete: () => {
                                content.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }
    
    // Text testimonial slider
    function showTextSlide(index) {
        if (isAnimating || !textSlider) return;
        isAnimating = true;
        
        const testimonials = textSlider.querySelectorAll('.testimonial');
        if (testimonials.length === 0) return;
        
        // Update current slide
        const prevSlide = currentSlide;
        currentSlide = (index + testimonials.length) % testimonials.length;
        
        // Determine animation direction (left or right)
        const direction = index > prevSlide ? 1 : -1;
        
        // Animate out current slide
        gsap.to(testimonials[prevSlide], {
            opacity: 0,
            x: -30 * direction,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                testimonials[prevSlide].style.display = 'none';
                
                // Animate in new slide
                testimonials[currentSlide].style.display = 'block';
                gsap.fromTo(testimonials[currentSlide],
                    { opacity: 0, x: 30 * direction },
                    { 
                        opacity: 1, 
                        x: 0, 
                        duration: 0.5, 
                        ease: "power2.out",
                        onComplete: () => {
                            isAnimating = false;
                        }
                    }
                );
            }
        });
        
        // Update dots
        if (textDots.length > 0) {
            textDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
    }
    
    // Text slider controls
    if (textPrevBtn) {
        textPrevBtn.addEventListener('click', () => {
            showTextSlide(currentSlide - 1);
        });
    }
    
    if (textNextBtn) {
        textNextBtn.addEventListener('click', () => {
            showTextSlide(currentSlide + 1);
        });
    }
    
    if (textDots.length > 0) {
        textDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTextSlide(index);
            });
        });
    }
    
    // Initialize text slider
    if (textSlider) {
        const testimonials = textSlider.querySelectorAll('.testimonial');
        if (testimonials.length > 0) {
            testimonials.forEach((testimonial, index) => {
                if (index !== currentSlide) {
                    testimonial.style.display = 'none';
                    testimonial.style.opacity = '0';
                }
            });
        }
    }
    
    // Video testimonial slider
    const videoSlider = document.querySelector('.video-testimonial-slider');
    const videoDots = document.querySelectorAll('.video-dot');
    const videoPrevBtn = document.querySelector('.video-prev-btn');
    const videoNextBtn = document.querySelector('.video-next-btn');
    
    let currentVideoSlide = 0;
    let isVideoAnimating = false;
    
    function showVideoSlide(index) {
        if (isVideoAnimating || !videoSlider) return;
        isVideoAnimating = true;
        
        const videoTestimonials = videoSlider.querySelectorAll('.video-testimonial');
        if (videoTestimonials.length === 0) return;
        
        // Update current slide
        const prevSlide = currentVideoSlide;
        currentVideoSlide = (index + videoTestimonials.length) % videoTestimonials.length;
        
        // Determine animation direction
        const direction = index > prevSlide ? 1 : -1;
        
        // Animate out current slide
        gsap.to(videoTestimonials[prevSlide], {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                videoTestimonials[prevSlide].style.display = 'none';
                
                // Animate in new slide
                videoTestimonials[currentVideoSlide].style.display = 'block';
                gsap.fromTo(videoTestimonials[currentVideoSlide],
                    { opacity: 0, scale: 0.9 },
                    { 
                        opacity: 1, 
                        scale: 1, 
                        duration: 0.5, 
                        ease: "power2.out",
                        onComplete: () => {
                            isVideoAnimating = false;
                        }
                    }
                );
            }
        });
        
        // Update dots
        if (videoDots.length > 0) {
            videoDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentVideoSlide);
            });
        }
    }
    
    // Video slider controls
    if (videoPrevBtn) {
        videoPrevBtn.addEventListener('click', () => {
            showVideoSlide(currentVideoSlide - 1);
        });
    }
    
    if (videoNextBtn) {
        videoNextBtn.addEventListener('click', () => {
            showVideoSlide(currentVideoSlide + 1);
        });
    }
    
    if (videoDots.length > 0) {
        videoDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showVideoSlide(index);
            });
        });
    }
    
    // Initialize video slider
    if (videoSlider) {
        const videoTestimonials = videoSlider.querySelectorAll('.video-testimonial');
        if (videoTestimonials.length > 0) {
            videoTestimonials.forEach((testimonial, index) => {
                if (index !== currentVideoSlide) {
                    testimonial.style.display = 'none';
                    testimonial.style.opacity = '0';
                }
            });
        }
    }
}

// Equipment page animations
function initEquipmentAnimations() {
    // Hero section animation
    const equipmentHero = document.querySelector('.equipment-hero');
    if (equipmentHero) {
        const heroContent = equipmentHero.querySelector('.equipment-hero-content');
        if (heroContent) {
            const heroTitle = heroContent.querySelector('h1');
            const heroText = heroContent.querySelector('p');
            
            if (heroTitle) {
                const splitTitle = new SplitType(heroTitle, { types: 'chars, words' });
                gsap.from(splitTitle.chars, {
                    opacity: 0,
                    y: 50,
                    rotationX: -90,
                    stagger: 0.03,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    delay: 0.5
                });
            }
            
            if (heroText) {
                gsap.from(heroText, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: 0.8,
                    ease: "power2.out"
                });
            }
        }
    }
    
    // Equipment category animations
    const equipmentCategories = document.querySelectorAll('.equipment-category');
    equipmentCategories.forEach(category => {
        const categoryTitle = category.querySelector('.category-title');
        const equipmentGrid = category.querySelector('.equipment-grid');
        const equipmentCards = category.querySelectorAll('.equipment-card');
        
        if (categoryTitle) {
            gsap.from(categoryTitle, {
                scrollTrigger: {
                    trigger: category,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1,
                    toggleActions: "restart none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power2.out"
            });
        }
        
        if (equipmentCards.length > 0) {
            gsap.from(equipmentCards, {
                scrollTrigger: {
                    trigger: equipmentGrid,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1,
                    toggleActions: "restart none none reverse"
                },
                opacity: 0,
                y: 50,
                scale: 0.9,
                stagger: {
                    each: 0.1,
                    grid: "auto",
                    from: "center"
                },
                duration: 1,
                ease: "power2.out"
            });
            
            // Add hover animations
            equipmentCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        scale: 1.03,
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    const icon = card.querySelector('.equipment-icon');
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1.1,
                            color: 'var(--accent-teal)',
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    const icon = card.querySelector('.equipment-icon');
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1,
                            color: 'var(--accent-teal)',
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
            });
        }
    });
}

// Pricing page animations
function initPricingAnimations() {
    // Hero section animation
    const pricingHero = document.querySelector('.pricing-hero');
    if (pricingHero) {
        const heroContent = pricingHero.querySelector('.pricing-hero-content');
        if (heroContent) {
            const heroTitle = heroContent.querySelector('h1');
            const heroText = heroContent.querySelector('p');
            
            if (heroTitle) {
                const splitTitle = new SplitType(heroTitle, { types: 'chars, words' });
                gsap.from(splitTitle.chars, {
                    opacity: 0,
                    y: 50,
                    rotationX: -90,
                    stagger: 0.03,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    delay: 0.5
                });
            }
            
            if (heroText) {
                gsap.from(heroText, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: 0.8,
                    ease: "power2.out"
                });
            }
        }
    }
    
    // Pricing cards animation
    const pricingGrid = document.querySelector('.pricing-grid');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (pricingGrid && pricingCards.length > 0) {
        gsap.from(pricingCards, {
            scrollTrigger: {
                trigger: pricingGrid,
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
                toggleActions: "restart none none reverse"
            },
            opacity: 0,
            y: 50,
            stagger: {
                each: 0.15,
                from: "center"
            },
            duration: 1,
            ease: "power2.out"
        });
        
        // Add 3D tilt effect on hover
        pricingCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                // Calculate mouse position relative to card center
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Calculate rotation (limited to +/- 5 degrees)
                const rotateY = gsap.utils.clamp(-5, 5, mouseX * -0.02);
                const rotateX = gsap.utils.clamp(-5, 5, mouseY * 0.02);
                
                // Apply transform
                gsap.to(card, {
                    rotateY: rotateY,
                    rotateX: rotateX,
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                    duration: 0.3,
                    ease: "power2.out",
                    transformPerspective: 1000,
                    transformOrigin: "center center"
                });
                
                // Add shine effect
                const cardAmount = card.querySelector('.pricing-amount');
                if (cardAmount) {
                    const shineX = (e.offsetX / cardRect.width) * 100;
                    const shineY = (e.offsetY / cardRect.height) * 100;
                    
                    gsap.to(cardAmount, {
                        textShadow: `0 0 10px rgba(78, 205, 196, 0.5)`,
                        duration: 0.3
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                    duration: 0.5,
                    ease: "power2.out"
                });
                
                const cardAmount = card.querySelector('.pricing-amount');
                if (cardAmount) {
                    gsap.to(cardAmount, {
                        textShadow: "none",
                        duration: 0.3
                    });
                }
            });
        });
    }
    
    // Custom quote section animation
    const customQuote = document.querySelector('.custom-quote');
    if (customQuote) {
        gsap.from(customQuote, {
            scrollTrigger: {
                trigger: customQuote,
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
                toggleActions: "restart none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });
    }
    
    // FAQ animations
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        gsap.from(faqItems, {
            scrollTrigger: {
                trigger: faqItems[0].parentElement,
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
                toggleActions: "restart none none reverse"
            },
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out"
        });
        
        // FAQ toggle functionality
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                const answer = item.querySelector('.faq-answer');
                
                if (isActive) {
                    // Close answer
                    gsap.to(answer, {
                        height: 0,
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => {
                            item.classList.remove('active');
                        }
                    });
                } else {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            gsap.to(otherAnswer, {
                                height: 0,
                                duration: 0.3,
                                ease: "power2.inOut",
                                onComplete: () => {
                                    otherItem.classList.remove('active');
                                }
                            });
                        }
                    });
                    
                    // Open this answer
                    item.classList.add('active');
                    gsap.set(answer, { height: 'auto' });
                    gsap.from(answer, {
                        height: 0,
                        duration: 0.5,
                        ease: "power2.inOut"
                    });
                }
            });
        });
    }
}

// Add essential menu toggle functionality
function toggleMenu() {
  console.log('Toggling menu...');
  nav.classList.toggle('active');

  // Toggle icon
  const icon = menuToggle.querySelector('i');
  if (nav.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Button click handler for any missed buttons
document.addEventListener('DOMContentLoaded', function() {
  // Handle all navigation links with direct click function
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Remove existing click handlers that might prevent navigation
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    // Add a direct navigation handler
    newLink.addEventListener('click', function(e) {
      console.log(`Link clicked: ${href}`);
      
      if (href.includes('.html')) {
        console.log('Directly navigating to:', href);
        window.location.href = href;
      }
    });
  });
  
  // Same for footer links
  document.querySelectorAll('footer a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    newLink.addEventListener('click', function(e) {
      console.log(`Footer link clicked: ${href}`);
      if (href.includes('.html')) {
        window.location.href = href;
      }
    });
  });
});

// Function to initialize portfolio categories
function initPortfolioCategories() {
  if (portfolioNavItems.length > 0 && portfolioCategories.length > 0) {
    console.log('Initializing portfolio categories...');
    
    // Make all categories initially hidden except the first one
    portfolioCategories.forEach((category, index) => {
      if (index === 0) {
        category.classList.add('active');
        category.style.display = 'block';
        category.style.opacity = '1';
      } else {
        category.classList.remove('active');
        category.style.display = 'none';
        category.style.opacity = '0';
      }
    });
    
    // Add click event to navigation items
    portfolioNavItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all nav items
        portfolioNavItems.forEach(navItem => {
          navItem.classList.remove('active');
        });
        
        // Add active class to clicked nav item
        this.classList.add('active');
        
        // Get target category ID
        const targetId = this.getAttribute('href').substring(1);
        const targetCategory = document.getElementById(targetId);
        
        if (targetCategory) {
          // Hide all categories
          portfolioCategories.forEach(category => {
            category.classList.remove('active');
            category.style.display = 'none';
            category.style.opacity = '0';
          });
          
          // Show target category
          targetCategory.classList.add('active');
          targetCategory.style.display = 'block';
          setTimeout(() => {
            targetCategory.style.opacity = '1';
          }, 10);
          
          // Update URL hash
          window.location.hash = targetId;
        }
      });
    });
    
    // Check if URL has a hash and show that category
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const targetId = hash.substring(1);
      const targetNav = document.querySelector(`.portfolio-nav-item[href="#${targetId}"]`);
      if (targetNav) {
        targetNav.click();
      }
    }
  }
}

// Function to initialize pricing toggle
function initPricingToggle() {
  if (pricingToggle) {
    console.log('Initializing pricing toggle...');
    
    const perProjectPlans = document.querySelector('.pricing-plans.pay-per-project');
    const monthlyPlans = document.querySelector('.pricing-plans.monthly-retainer');
    const perProjectDesc = document.getElementById('per-project-desc');
    const monthlyDesc = document.getElementById('monthly-desc');
    
    // Set initial state
    monthlyPlans.style.display = 'none';
    
    pricingToggle.addEventListener('change', function() {
      if (this.checked) {
        perProjectPlans.style.display = 'none';
        monthlyPlans.style.display = 'grid';
        perProjectDesc.classList.remove('active');
        monthlyDesc.classList.add('active');
      } else {
        perProjectPlans.style.display = 'grid';
        monthlyPlans.style.display = 'none';
        perProjectDesc.classList.add('active');
        monthlyDesc.classList.remove('active');
      }
    });
  }
}

// Initialize FAQ items
function initFaqItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqAnswer = faq.querySelector('.faq-answer');
                faqAnswer.style.height = '0';
            });
            
            // If it wasn't open before, open it
            if (!isOpen) {
                item.classList.add('active');
                answer.style.height = answer.scrollHeight + 'px';
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    if (!menuToggle) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}