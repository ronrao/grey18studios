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
})(); 