// Portfolio Page JavaScript - Complete Redesign

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.portfolio-filters__button');
    const portfolioCategories = document.querySelectorAll('.portfolio-category');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const portfolioModal = document.querySelector('.portfolio-modal');
    const modalBackdrop = portfolioModal?.querySelector('.portfolio-modal__backdrop');
    const modalClose = portfolioModal?.querySelector('.portfolio-modal__close');
    const body = document.body;
    
    // ===== FILTER FUNCTIONALITY =====
    function initializeFilters() {
        // Hide all categories
        portfolioCategories.forEach(category => {
            category.classList.remove('active');
        });
        
        // Show first category or hash-based category
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const targetId = hash.substring(1);
            const targetCategory = document.getElementById(targetId);
            
            if (targetCategory) {
                showCategory(targetId);
            } else {
                showCategory('video-production');
            }
        } else {
            showCategory('video-production');
        }
    }
    
    function showCategory(categoryId) {
        // Hide all categories
            portfolioCategories.forEach(category => {
                category.classList.remove('active');
        });
        
        // Show target category
        const targetCategory = document.getElementById(categoryId);
        if (targetCategory) {
            targetCategory.classList.add('active');
        }
        
        // Update filter buttons
        filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.category === categoryId) {
                button.classList.add('active');
            }
        });
        
        // Update URL hash
        history.pushState(null, null, '#' + categoryId);
        
        // Animate cards in
        setTimeout(() => {
            const cards = targetCategory?.querySelectorAll('.portfolio-card');
            cards?.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 50);
            });
        }, 100);
    }
    
    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryId = this.dataset.category;
            showCategory(categoryId);
            
            // Smooth scroll to portfolio section
            const portfolioSection = document.getElementById('portfolio-categories');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // ===== PORTFOLIO MODAL FUNCTIONALITY =====
    function openPortfolioModal(card) {
        if (!portfolioModal || !card) {
            console.error('Modal or card not found');
            return;
        }
        
        const videoId = card.dataset.videoId;
        const title = card.dataset.title;
        const description = card.dataset.description;
        
        // Parse highlights with error handling
        let highlights = [];
        try {
            const highlightsStr = card.dataset.highlights || '[]';
            // Replace HTML entities and fix common issues
            const cleanedStr = highlightsStr
                .replace(/&apos;/g, "'")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");
            highlights = JSON.parse(cleanedStr);
        } catch (e) {
            console.error('Error parsing highlights for card:', card.dataset.title, e);
            console.error('Highlights string:', card.dataset.highlights);
            highlights = [];
        }
        
        // Populate modal
        const modalTitle = portfolioModal.querySelector('[data-modal-title]');
        const modalDescription = portfolioModal.querySelector('[data-modal-description]');
        const modalHighlights = portfolioModal.querySelector('[data-modal-highlights]');
        const modalVideo = portfolioModal.querySelector('[data-modal-video]');
        
        if (modalTitle) modalTitle.textContent = title || '';
        if (modalDescription) modalDescription.textContent = description || '';
        
        // Populate highlights
        if (modalHighlights) {
            modalHighlights.innerHTML = '';
            if (Array.isArray(highlights)) {
                highlights.forEach(highlight => {
                    const li = document.createElement('li');
                    li.textContent = highlight;
                    modalHighlights.appendChild(li);
                });
            }
        }
        
        // Populate video
        if (modalVideo && videoId) {
            modalVideo.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoId}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
        
        // Show modal
        portfolioModal.classList.add('is-active');
        portfolioModal.setAttribute('aria-hidden', 'false');
        body.classList.add('has-modal');
        
        // Focus close button
        if (modalClose) {
            modalClose.focus({ preventScroll: true });
        }
    }
    
    function closePortfolioModal() {
        if (!portfolioModal) return;
        
        portfolioModal.classList.remove('is-active');
        portfolioModal.setAttribute('aria-hidden', 'true');
        body.classList.remove('has-modal');
        
        // Clear video to stop playback
        const modalVideo = portfolioModal.querySelector('[data-modal-video]');
        if (modalVideo) {
            modalVideo.innerHTML = '';
        }
    }
    
    // Card click event listeners - Use event delegation for better reliability
    function attachCardListeners() {
        // Use event delegation on portfolio categories container
        const portfolioContainer = document.querySelector('.portfolio-categories');
        if (!portfolioContainer) return;
        
        portfolioContainer.addEventListener('click', function(e) {
            // Check if clicked on a portfolio card
            const card = e.target.closest('.portfolio-card');
            if (!card) return;
            
            // Check if clicked directly on iframe - allow it but open modal
            const iframe = e.target.closest('iframe');
            const playOverlay = e.target.closest('.portfolio-card__play-overlay');
            
            // If clicking on iframe or play overlay, open modal
            if (iframe || playOverlay || e.target.closest('.portfolio-card__view-more')) {
                e.preventDefault();
                e.stopPropagation();
                openPortfolioModal(card);
                return;
            }
            
            // For other clicks on the card, open modal
            e.preventDefault();
            e.stopPropagation();
            openPortfolioModal(card);
        });
    }
    
    // Attach listeners
    attachCardListeners();
    
    // Close modal event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closePortfolioModal);
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closePortfolioModal);
    }
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal?.classList.contains('is-active')) {
            closePortfolioModal();
        }
    });
    
    // ===== INITIALIZATION =====
    initializeFilters();
    
    // Listen for hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            showCategory(hash.substring(1));
        }
    });
    
    // Animate cards on load
    setTimeout(() => {
        const activeCategory = document.querySelector('.portfolio-category.active');
        if (activeCategory) {
            const cards = activeCategory.querySelectorAll('.portfolio-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 50);
            });
        }
    }, 300);
});
