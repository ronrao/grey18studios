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

// Event Listeners with null checks
if (window) {
  window.addEventListener('scroll', handleScrollWithoutAnimation);
  window.addEventListener('load', initializeWebsiteWithoutAnimations);
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

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
  try {
    // Fix navigation links
    document.querySelectorAll('a[href], .btn, button').forEach(function(element) {
      if (element) {
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
      }
    });
  } catch (error) {
    console.error('Error in navigation setup:', error);
  }
});

// Position the cursor exactly at the click point
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) {
    console.log('Custom cursor element not found');
    return;
  }
  
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

// Expanded view opener without animations
function openExpandedView(serviceType) {
  // Store scroll position
  const scrollPos = window.scrollY;
  document.body.dataset.scrollY = scrollPos;
  bodyScrollPosition = scrollPos;
  
  // Disable body scroll
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPos}px`;
  document.body.style.width = '100%';
  
  // Find the expanded view
  const expandedView = document.getElementById(`${serviceType}-expanded`);
  if (!expandedView) {
    return;
  }
  
  // Display the expanded view without animation
  expandedView.style.display = 'block';
  expandedView.style.opacity = '1';
  expandedView.classList.add('active');
  
  // Add close handler
  const closeButton = expandedView.querySelector('.expanded-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeExpandedView, { once: true });
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeExpandedView();
    }
  }, { once: true });
}

// Close expanded view without animations
function closeExpandedView() {
  // Get all expanded views
  const expandedViews = document.querySelectorAll('.service-expanded-view.active');
  
  // Hide them immediately
  expandedViews.forEach(view => {
    view.style.display = 'none';
    view.style.opacity = '0';
    view.classList.remove('active');
  });
  
  // Restore body scroll
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  // Restore scroll position
  window.scrollTo(0, bodyScrollPosition);
}

// Initialize without animations
function initializeWebsiteWithoutAnimations() {
  // Set the current year in footer
  const currentYearElements = document.querySelectorAll('[data-current-year]');
  currentYearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });
  
  // Hide loading screen immediately
  const loadingScreen = document.querySelector('.loading');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
  
  // Make all elements visible immediately
  document.querySelectorAll('.animate-on-scroll, .fade-in, .fade-up, .fade-down, .zoom-in').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.add('animated');
  });
  
  // Set all counters to their final values immediately
  document.querySelectorAll('.count').forEach(counter => {
    // Preserve the final value including any + sign
    const finalValue = counter.textContent;
    counter.textContent = finalValue;
  });
  
  // Enable functionality
  enableAllLinks();
  initTestimonialSlidersWithoutAnimation();
  initTabsWithoutAnimation();
  initPortfolioCategoriesWithoutAnimation();
  
  // Remove any transition/animation related CSS
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    * {
      transition: none !important;
      animation: none !important;
      animation-delay: 0s !important;
      animation-duration: 0s !important;
      transition-delay: 0s !important;
      transition-duration: 0s !important;
    }
    
    .loading {
      display: none !important;
    }
    
    .page-transition-overlay {
      display: none !important;
    }
    
    .cursor {
      display: none !important;
    }
  `;
  document.head.appendChild(styleEl);
}

// Simplified scroll handler without animations
function handleScrollWithoutAnimation() {
  // Sticky header functionality without animations
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
}

// Simple slider without animations
function initTestimonialSlidersWithoutAnimation() {
  // Text testimonials
  if (testimonialSlider && prevBtn && nextBtn && dots.length > 0) {
    // Set initial slide
    showTextSlide(currentSlide);
    
    // Add event listeners
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
  }
  
  // Video testimonials
  const videoSlider = document.querySelector('.video-testimonial-slider');
  const videoTestimonials = document.querySelectorAll('.video-testimonial');
  const videoPrevBtn = document.querySelector('.video-prev-btn');
  const videoNextBtn = document.querySelector('.video-next-btn');
  const videoDots = document.querySelectorAll('.video-dot');
  
  if (videoSlider && videoPrevBtn && videoNextBtn && videoDots.length > 0) {
    let currentVideoSlide = 0;
    
    // Initial setup
    showVideoSlide(currentVideoSlide);
    
    // Event listeners
    videoPrevBtn.addEventListener('click', () => {
      showVideoSlide(currentVideoSlide - 1 < 0 ? videoTestimonials.length - 1 : currentVideoSlide - 1);
    });
    
    videoNextBtn.addEventListener('click', () => {
      showVideoSlide(currentVideoSlide + 1 >= videoTestimonials.length ? 0 : currentVideoSlide + 1);
    });
    
    // Dot navigation
    videoDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showVideoSlide(index);
      });
    });
    
    // Function to show video slide
    function showVideoSlide(index) {
      videoTestimonials.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
      
      videoDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      currentVideoSlide = index;
    }
  }
}

// Change slide without animation
function goToSlide(index) {
  if (isAnimating) return;
  
  if (index < 0) {
    index = testimonials.length - 1;
  } else if (index >= testimonials.length) {
    index = 0;
  }
  
  showTextSlide(index);
}

// Show text slide without animation
function showTextSlide(index) {
  testimonials.forEach(slide => {
    slide.style.display = 'none';
  });
  
  testimonials[index].style.display = 'block';
  
  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  currentSlide = index;
}

// Tabs functionality without animation
function initTabsWithoutAnimation() {
  if (tabBtns.length === 0 || tabContents.length === 0) return;
  
  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      
      const tabId = btn.getAttribute('data-tab');
      const content = document.getElementById(tabId);
      if (content) {
        content.classList.add('active');
      }
    });
  });
}

// Portfolio categories without animation
function initPortfolioCategoriesWithoutAnimation() {
  if (portfolioNavItems.length === 0 || portfolioCategories.length === 0) return;
  
  portfolioNavItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all nav items
      portfolioNavItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      // Add active class to clicked item
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      
      if (category === 'all') {
        // Show all categories
        portfolioCategories.forEach(cat => {
          cat.style.display = 'block';
        });
      } else {
        // Hide all categories
        portfolioCategories.forEach(cat => {
          cat.style.display = 'none';
        });
        
        // Show selected category
        const selectedCategory = document.querySelector(`.portfolio-category[data-category="${category}"]`);
        if (selectedCategory) {
          selectedCategory.style.display = 'block';
        }
      }
    });
  });
}

// Toggle menu function without animation
function toggleMenu() {
  if (nav.classList.contains('active')) {
    nav.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
  } else {
    nav.classList.add('active');
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
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

// Debug function to help with portfolio visibility - can be called from console
function debugPortfolio() {
  console.log('Debug Portfolio Function Called');
  
  // Check all portfolio categories
  const categories = document.querySelectorAll('.portfolio-category');
  console.log(`Found ${categories.length} portfolio categories:`);
  
  categories.forEach((category, index) => {
    const isActive = category.classList.contains('active');
    const id = category.id;
    const display = window.getComputedStyle(category).display;
    const opacity = window.getComputedStyle(category).opacity;
    console.log(`Category ${index}: id=${id}, active=${isActive}, display=${display}, opacity=${opacity}`);
    
    // Check genre cards in this category
    const genreCards = category.querySelectorAll('.genre-card');
    console.log(`  - Found ${genreCards.length} genre cards in ${id}`);
    
    if (genreCards.length === 0) {
      console.log(`  - No genre cards found in ${id}`);
    }
    
    // Force visibility on active category
    if (isActive) {
      category.style.display = 'block';
      category.style.opacity = '1';
      category.style.visibility = 'visible';
      
      // Force genre cards visibility
      genreCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.visibility = 'visible';
      });
    }
  });
  
  // Check portfolio nav items
  const navItems = document.querySelectorAll('.portfolio-nav-item');
  console.log(`Found ${navItems.length} portfolio nav items`);
  
  // Try to force active category to show
  const activeCategory = document.querySelector('.portfolio-category.active');
  if (activeCategory) {
    console.log(`Forcing active category ${activeCategory.id} to be visible`);
    activeCategory.style.display = 'block';
    activeCategory.style.opacity = '1';
    activeCategory.style.visibility = 'visible';
    
    // Force all genre cards in active category to be visible
    const genreCards = activeCategory.querySelectorAll('.genre-card');
    genreCards.forEach(card => {
      card.style.display = 'block';
      card.style.opacity = '1';
      card.style.visibility = 'visible';
    });
  } else {
    console.log('No active category found');
    // If no active category, make the first one active
    if (categories.length > 0) {
      categories[0].classList.add('active');
      categories[0].style.display = 'block';
      categories[0].style.opacity = '1';
      categories[0].style.visibility = 'visible';
    }
  }
  
  return 'Debug complete - check console for details';
}

// Function to initialize portfolio categories
function initPortfolioCategories() {
  // Skip this function on portfolio.html page since it has dedicated script
  if (document.querySelector('script[src="portfolio-standalone.js"]')) {
    console.log('Portfolio page detected with standalone script - skipping main script initialization');
    return;
  }
  
  const portfolioNavItems = document.querySelectorAll('.portfolio-nav-item');
  const portfolioCategories = document.querySelectorAll('.portfolio-category');
  
  if (portfolioNavItems.length > 0 && portfolioCategories.length > 0) {
    console.log('Initializing portfolio categories from main script...');
    
    // Make all categories initially hidden except the first one
    portfolioCategories.forEach((category, index) => {
      console.log('Category:', category.id);
      if (index === 0) {
        category.classList.add('active');
        category.style.display = 'block';
        category.style.opacity = '1';
        category.style.visibility = 'visible';
        
        // Also force genre cards visibility
        const genreCards = category.querySelectorAll('.genre-card');
        genreCards.forEach(card => {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.visibility = 'visible';
        });
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
        
        const categoryId = this.getAttribute('href').substring(1);
        const categoryName = this.getAttribute('data-category');
        console.log('Portfolio nav item clicked:', categoryId, categoryName);
        
        // Remove active class from all nav items
        portfolioNavItems.forEach(navItem => {
          navItem.classList.remove('active');
        });
        
        // Add active class to clicked nav item
        this.classList.add('active');
        
        // Get target category ID
        const targetCategory = document.getElementById(categoryId);
        
        if (targetCategory) {
          console.log('Target category found:', categoryId);
          
          // Hide all categories
          portfolioCategories.forEach(category => {
            category.classList.remove('active');
            category.style.display = 'none';
            category.style.opacity = '0';
          });
          
          // Show target category - Explicitly set styles
          targetCategory.style.display = 'block';
          targetCategory.style.visibility = 'visible';
          targetCategory.classList.add('active');
          
          // Force all genre cards to be visible
          const genreCards = targetCategory.querySelectorAll('.genre-card');
          genreCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.visibility = 'visible';
          });
          
          // Use a small timeout to ensure the display property has been applied
          setTimeout(() => {
            targetCategory.style.opacity = '1';
          }, 10);
          
        } else {
          console.error('Target category not found:', categoryId);
        }
      });
    });
    
    // Check if URL has a hash and show that category
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const targetId = hash.substring(1);
      const targetNav = document.querySelector(`.portfolio-nav-item[href="#${targetId}"]`);
      if (targetNav) {
        console.log('Initial hash found, clicking:', targetId);
        targetNav.click();
      }
    }
    
    // Run debug after initialization
    setTimeout(debugPortfolio, 500);
  } else {
    console.log('Portfolio elements not found:', { 
      navItems: portfolioNavItems.length, 
      categories: portfolioCategories.length 
    });
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

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize service expanded views
    initServiceExpandedViews();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize video testimonial slider
    initVideoTestimonialSlider();
    
    // Initialize testimonial tabs
    initTestimonialTabs();
    
    // Initialize portfolio filter
    initPortfolioFilter();
    
    // Add counter animation
    initCounterAnimation();
    
    // Add page transition
    initPageTransition();
});

// Handle service expanded views
function initServiceExpandedViews() {
    const expandButtons = document.querySelectorAll('.service-expand-btn');
    const closeButtons = document.querySelectorAll('.expanded-close');
    
    // Open expanded view when clicking on "Learn More" button
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.parentElement.getAttribute('data-service');
            const expandedView = document.getElementById(`${serviceType}-expanded`);
            
            if (expandedView) {
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                expandedView.style.display = 'block';
                
                // Add fade in animation
                setTimeout(() => {
                    expandedView.style.opacity = '1';
                }, 10);
            }
        });
    });
    
    // Close expanded view when clicking on close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandedView = this.closest('.service-expanded-view');
            
            expandedView.style.opacity = '0';
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                expandedView.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }, 300);
        });
    });
    
    // Close expanded view when clicking outside content
    document.querySelectorAll('.service-expanded-view').forEach(view => {
        view.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.opacity = '0';
                setTimeout(() => {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });
}

// Handle testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('#text-testimonials .testimonial');
    const dots = document.querySelectorAll('#text-testimonials .dot');
    const prevBtn = document.querySelector('#text-testimonials .prev-btn');
    const nextBtn = document.querySelector('#text-testimonials .next-btn');
    let currentIndex = 0;
    
    if (!testimonials.length) return;
    
    // Function to show specific testimonial
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonials[index].style.display = 'block';
        dots[index].classList.add('active');
    }
    
    // Initialize
    showTestimonial(currentIndex);
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
    
    // Auto slide
    setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Handle video testimonial slider
function initVideoTestimonialSlider() {
    const videoTestimonials = document.querySelectorAll('#video-testimonials .video-testimonial');
    const dots = document.querySelectorAll('#video-testimonials .video-dot');
    const prevBtn = document.querySelector('#video-testimonials .video-prev-btn');
    const nextBtn = document.querySelector('#video-testimonials .video-next-btn');
    let currentIndex = 0;
    
    if (!videoTestimonials.length) return;
    
    // Function to show specific video testimonial
    function showVideoTestimonial(index) {
        videoTestimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        videoTestimonials[index].style.display = 'block';
        dots[index].classList.add('active');
    }
    
    // Initialize
    showVideoTestimonial(currentIndex);
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + videoTestimonials.length) % videoTestimonials.length;
            showVideoTestimonial(currentIndex);
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % videoTestimonials.length;
            showVideoTestimonial(currentIndex);
        });
    }
    
    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            showVideoTestimonial(currentIndex);
        });
    });
}

// Handle testimonial tabs
function initTestimonialTabs() {
    const tabButtons = document.querySelectorAll('.testimonials-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.testimonials-content .tab-content');
    
    if (!tabButtons.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and tab
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Handle portfolio filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item');
    
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Counter animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.count');
    
    if (!counters.length) return;
    
    // Store original values to ensure consistency
    counters.forEach(counter => {
        // Get the target value from text content, removing any non-digit characters
        const originalValue = counter.innerText.trim().replace(/\D/g, '');
        // Store original value as a data attribute for reference
        counter.setAttribute('data-original', originalValue);
        // Set starting value to 0
        counter.textContent = '0+';
    });
    
    counters.forEach(counter => {
        // Use data-original attribute to ensure consistent target value
        const target = parseInt(counter.getAttribute('data-original'));
        const duration = 2000; // 2 seconds
        
        const animateCounter = () => {
            // Use a more consistent animation approach with proper timing
            const startTime = Date.now();
            
            const updateCounter = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Use easing function for smoother animation
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(target * easedProgress);
                
                counter.textContent = currentValue + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    // Ensure the final value is exactly the target
                    counter.textContent = target + '+';
                }
            };
            
            requestAnimationFrame(updateCounter);
        };
        
        // Start counter animation when element is in viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Delay the animation start slightly for better visibility
                    setTimeout(() => {
                        animateCounter();
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Page transition
function initPageTransition() {
    const overlay = document.querySelector('.page-transition-overlay');
    const loader = document.querySelector('.loading');
    
    if (!overlay || !loader) return;
    
    // Page load animation
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
    
    // Page transition when clicking on links
    document.querySelectorAll('a').forEach(link => {
        // Only handle links to other pages in the site
        if (link.getAttribute('href') && 
            link.getAttribute('href').charAt(0) !== '#' && 
            link.getAttribute('href').indexOf('://') === -1) {
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                overlay.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        }
    });
}

// Common site JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Update footer year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip for portfolio category navigation which has its own handler
            if (document.querySelector('.portfolio-nav-item') && this.classList.contains('portfolio-nav-item')) {
                return;
            }
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
});