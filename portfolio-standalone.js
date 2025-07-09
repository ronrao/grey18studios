// Standalone Portfolio Page JavaScript
// Self-executing function to isolate the code
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Standalone portfolio script loaded');
        
        // Initialize portfolio categories
        initPortfolio();
        
        // Debug function that can be called from console
        window.debugPortfolio = function() {
            console.log('Manual debug triggered');
            forcePortfolioVisibility();
            return 'Debug complete';
        };

        // Add lightbox functionality for portfolio images using event delegation
        document.addEventListener('click', function(e) {
            // Only handle left-clicks
            if (e.button !== 0) return;
            // Check if the clicked element is an image inside .gallery-item
            const img = e.target.closest('.gallery-item img');
            if (img) {
                openImageLightbox(img.src);
            }
        });
    });

    // Main portfolio initialization function
    function initPortfolio() {
        console.log('Initializing portfolio page...');
        
        const portfolioNavItems = document.querySelectorAll('.portfolio-nav-item');
        const portfolioCategories = document.querySelectorAll('.portfolio-category');
        
        console.log(`Found ${portfolioCategories.length} categories and ${portfolioNavItems.length} nav items`);
        
        if (portfolioCategories.length === 0 || portfolioNavItems.length === 0) {
            console.error('Portfolio elements not found!');
            return;
        }
        
        // Force initial visibility on first load
        setupInitialCategory(portfolioCategories);
        
        // Add click handlers for category navigation
        setupNavigation(portfolioNavItems, portfolioCategories);
        
        // Check if URL has a hash and respond accordingly
        checkUrlHash(portfolioNavItems);
        
        // Force visibility after a short delay
        setTimeout(forcePortfolioVisibility, 500);
    }

    // Set up the initial active category
    function setupInitialCategory(categories) {
        categories.forEach((category, index) => {
            if (index === 0) {
                // Make first category active and visible
                makeVisible(category);
            } else {
                // Hide all other categories
                makeHidden(category);
            }
        });
    }

    // Set up click handlers for navigation
    function setupNavigation(navItems, categories) {
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active nav item
                navItems.forEach(navItem => navItem.classList.remove('active'));
                this.classList.add('active');
                
                // Get target category
                const targetId = this.getAttribute('href').substring(1);
                const targetCategory = document.getElementById(targetId);
                
                if (targetCategory) {
                    // Hide all categories
                    categories.forEach(category => makeHidden(category));
                    
                    // Show target category
                    makeVisible(targetCategory);
                } else {
                    console.error(`Target category not found: ${targetId}`);
                }
            });
        });
    }

    // Check URL hash to show the appropriate category
    function checkUrlHash(navItems) {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const targetId = hash.substring(1);
            const targetNav = document.querySelector(`.portfolio-nav-item[href="#${targetId}"]`);
            if (targetNav) {
                targetNav.click();
            }
        }
    }

    // Make a category visible and force its children to be visible
    function makeVisible(category) {
        category.classList.add('active');
        category.style.display = 'block';
        category.style.visibility = 'visible';
        
        // Delay the opacity change for transition effect
        setTimeout(() => {
            category.style.opacity = '1';
        }, 10);
        
        // Make all genre cards in this category visible
        const genreCards = category.querySelectorAll('.genre-card');
        console.log(`Making ${genreCards.length} cards visible in ${category.id}`);
        
        genreCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            
            // Also make sure the image and overlay are visible
            const image = card.querySelector('.genre-image');
            const overlay = card.querySelector('.genre-overlay');
            
            if (image) {
                image.style.display = 'block';
                image.style.visibility = 'visible';
            }
            
            if (overlay) {
                overlay.style.visibility = 'visible';
            }
        });
    }

    // Make a category hidden
    function makeHidden(category) {
        category.classList.remove('active');
        category.style.display = 'none';
        category.style.opacity = '0';
    }

    // Force visibility of the active category and its contents
    function forcePortfolioVisibility() {
        const activeCategory = document.querySelector('.portfolio-category.active');
        if (activeCategory) {
            console.log(`Forcing visibility on active category: ${activeCategory.id}`);
            makeVisible(activeCategory);
        } else {
            // If no active category, make the first one active
            const firstCategory = document.querySelector('.portfolio-category');
            if (firstCategory) {
                console.log('No active category found, activating first category');
                makeVisible(firstCategory);
            }
        }
    }

    // Lightbox for full-size image view with navigation
    let currentLightboxImages = [];
    let currentLightboxIndex = 0;

    function openImageLightbox(imgSrc) {
      // Gather all images in the current visible category
      const activeCategory = document.querySelector('.portfolio-category.active');
      currentLightboxImages = Array.from(activeCategory.querySelectorAll('.gallery-item img'));
      currentLightboxIndex = currentLightboxImages.findIndex(img => img.src === imgSrc);
      if (currentLightboxIndex === -1) currentLightboxIndex = 0;

      // Remove any existing lightbox
      let lightbox = document.querySelector('.image-lightbox');
      if (lightbox) lightbox.remove();

      // Remove any previous Escape handler to avoid duplicates
      if (openImageLightbox._escHandler) {
        document.removeEventListener('keydown', openImageLightbox._escHandler);
      }

      // Create lightbox overlay
      lightbox = document.createElement('div');
      lightbox.className = 'image-lightbox';
      lightbox.style = `
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.92);
        display: flex; align-items: center; justify-content: center;
        z-index: 11001;
        opacity: 0;
        transition: opacity 0.35s cubic-bezier(.4,0,.2,1);
      `;
      // Lightbox content with only the image and close button
      lightbox.innerHTML = `
        <div class="lightbox-content" style="position:relative;max-width:96vw;max-height:96vh;display:flex;align-items:center;justify-content:center;transform:scale(0.92);opacity:0;transition:transform 0.35s cubic-bezier(.4,0,.2,1),opacity 0.35s cubic-bezier(.4,0,.2,1);overflow:hidden;">
          <img src="${imgSrc}" alt="Full Size" style="max-width:96vw;max-height:96vh;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.5);background:#222;">
          <button class="lightbox-close" style="position:absolute;top:10px;right:10px;width:44px;height:44px;border-radius:50%;background:rgba(185,20,33,0.95);color:#fff;font-size:2rem;border:none;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center;transition:background 0.2s;">&times;</button>
        </div>
      `;
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      // Animate in (fade and scale)
      setTimeout(() => {
        lightbox.style.opacity = '1';
        const content = lightbox.querySelector('.lightbox-content');
        if (content) {
          content.style.transform = 'scale(1)';
          content.style.opacity = '1';
        }
      }, 10);

      // Close on button click
      lightbox.querySelector('.lightbox-close').onclick = function(e) {
        e.stopPropagation();
        closeImageLightbox();
      };
      // Close on clicking outside the image
      lightbox.onclick = function(e) {
        if (e.target === lightbox) closeImageLightbox();
      };
      // Keyboard navigation (only Escape to close)
      openImageLightbox._escHandler = function(e) {
        if (e.key === 'Escape') closeImageLightbox();
      };
      document.addEventListener('keydown', openImageLightbox._escHandler);
    }

    function showPrevLightboxImage() {
      if (!currentLightboxImages.length) return;
      currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
      updateLightboxImage();
    }
    function showNextLightboxImage() {
      if (!currentLightboxImages.length) return;
      currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
      updateLightboxImage();
    }
    function updateLightboxImage() {
      const lightbox = document.querySelector('.image-lightbox');
      if (!lightbox) return;
      const img = lightbox.querySelector('.lightbox-content img');
      if (!img) return;
      img.src = currentLightboxImages[currentLightboxIndex].src;
    }

    function closeImageLightbox() {
      const lightbox = document.querySelector('.image-lightbox');
      if (lightbox) {
        // Animate out (fade and scale)
        const content = lightbox.querySelector('.lightbox-content');
        if (content) {
          content.style.transform = 'scale(0.92)';
          content.style.opacity = '0';
        }
        lightbox.style.opacity = '0';
        setTimeout(() => {
          if (lightbox.parentNode) lightbox.parentNode.removeChild(lightbox);
        }, 350);
      }
      // Remove Escape handler if present
      if (openImageLightbox._escHandler) {
        document.removeEventListener('keydown', openImageLightbox._escHandler);
        openImageLightbox._escHandler = null;
      }
      document.body.style.overflow = '';
    }
})(); 