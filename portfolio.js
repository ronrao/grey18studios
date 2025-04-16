// Portfolio Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const portfolioNavItems = document.querySelectorAll('.portfolio-nav-item');
    const portfolioCategories = document.querySelectorAll('.portfolio-category');
    const genreCards = document.querySelectorAll('.genre-card');
    
    // Fix for portfolio categories to ensure they're properly initialized
    function initializeCategories() {
        // First hide all categories
        portfolioCategories.forEach(category => {
            category.style.display = 'none';
            category.classList.remove('active');
        });
        
        // Show the first category or the one specified in the URL hash
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const targetId = hash.substring(1);
            const targetCategory = document.getElementById(targetId);
            
            if (targetCategory) {
                targetCategory.style.display = 'block';
                targetCategory.classList.add('active');
                
                // Update nav items
                portfolioNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + targetId) {
                        item.classList.add('active');
                    }
                });
            } else {
                // If no matching category found, show the first one
                showFirstCategory();
            }
        } else {
            // No hash, show the first category
            showFirstCategory();
        }
    }
    
    function showFirstCategory() {
        if (portfolioCategories.length > 0) {
            const firstCategory = portfolioCategories[0];
            firstCategory.style.display = 'block';
            firstCategory.classList.add('active');
            
            // Update nav items
            if (portfolioNavItems.length > 0) {
                portfolioNavItems[0].classList.add('active');
            }
        }
    }
    
    // Event Listeners for category navigation
    portfolioNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target category ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all navigation items
            portfolioNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all categories with a small transition
            portfolioCategories.forEach(category => {
                category.classList.remove('active');
                category.style.opacity = '0';
                setTimeout(() => {
                    category.style.display = 'none';
                    
                    // Show only the target category
                    if (category.id === targetId) {
                        category.style.display = 'block';
                        setTimeout(() => {
                            category.style.opacity = '1';
                            category.classList.add('active');
                        }, 50);
                    }
                }, 300);
            });
            
            // Update the URL hash without scrolling
            history.pushState(null, null, '#' + targetId);
        });
    });
    
    // Run initialization
    initializeCategories();
    
    // Listen for hash changes
    window.addEventListener('hashchange', initializeCategories);
    
    // Add hover effects for genre cards
    genreCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.genre-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.genre-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100px)';
                overlay.style.opacity = '0';
            }
        });
    });
    
    // Handle gallery button clicks
    const galleryButtons = document.querySelectorAll('.genre-overlay .btn');
    galleryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would open a gallery or sample page
            alert('Gallery or sample page would open here in a real implementation.');
        });
    });
    
    // Animation helper functions
    function fadeOut(element, callback) {
        element.style.opacity = '1';
        
        (function fade() {
            if ((element.style.opacity -= 0.1) < 0) {
                element.style.display = 'none';
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }
    
    function fadeIn(element) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        (function fade() {
            let val = parseFloat(element.style.opacity);
            if (!((val += 0.1) > 1)) {
                element.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }
    
    // Custom cursor functionality from main.js
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        const interactiveElements = document.querySelectorAll('.portfolio-nav-item, .genre-card, .btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'transparent';
                cursor.style.backgroundColor = 'rgba(78, 205, 196, 0.3)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--accent-teal)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }
}); 