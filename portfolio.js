// Portfolio Page JavaScript - Unified Grid with Photos and Videos

// ===== TWO ROWS SCROLLING PHOTO BACKGROUND =====
function initHeroPhotoScroll() {
    const photoScrollTop = document.getElementById('hero-photo-scroll-top');
    const photoScrollBottom = document.getElementById('hero-photo-scroll-bottom');
    
    if (!photoScrollTop || !photoScrollBottom) return;
    
    // Select a diverse set of photos from different categories
    const allHeroPhotos = [
        // Top row photos (first half)
        'assets/photos/Port-(24).jpg',
        'assets/photos/Product-(16).jpg',
        'assets/photos/Architecture-(10).jpg',
        'assets/photos/CM-(17).jpg',
        'assets/photos/Interiors-(10).jpg',
        'assets/photos/People-(28).jpg',
        'assets/photos/Mythriya-(52).jpg',
        'assets/photos/Port-(31).jpg',
        'assets/photos/Product-(5).jpg',
        'assets/photos/Architecture-(12).jpg',
        'assets/photos/Port-(3).jpg',
        'assets/photos/Final-(1).jpg',
        'assets/photos/Interiors-(7)-copy.jpg',
        'assets/photos/Mythriya-(15).jpg',
        'assets/photos/Port-(14).jpg',
        'assets/photos/Architecture-(7).jpg',
        'assets/photos/Product-(21)---Copy---Copy.jpg',
        'assets/photos/Port-(8).jpg',
        // Bottom row photos (second half)
        'assets/photos/CM-(14).jpg',
        'assets/photos/Interiors-(4)-copy.jpg',
        'assets/photos/Port-(9).jpg',
        'assets/photos/Product-(15).jpg',
        'assets/photos/Architecture-(3).jpg',
        'assets/photos/Port-(6).jpg',
        'assets/photos/Mythriya-(14).jpg',
        'assets/photos/Final-(3).jpg',
        'assets/photos/Port-(7).jpg',
        'assets/photos/Architecture-(4).jpg',
        'assets/photos/Port-(56).jpg',
        'assets/photos/Product-(13)---Copy---Copy.jpg',
        'assets/photos/Interiors-(9)-copy.jpg',
        'assets/photos/Architecture.jpg',
        'assets/photos/_MG_7184.jpg',
        'assets/photos/_MG_1937.jpg',
        'assets/photos/Port-(14)-copy.jpg',
        'assets/photos/Port-(45)-.jpg',
        'assets/photos/A-(9).jpg',
        'assets/photos/3--Roopa.jpg'
    ];
    
    // Split photos into two halves - different images for each row
    const midPoint = Math.ceil(allHeroPhotos.length / 2);
    const topRowPhotos = allHeroPhotos.slice(0, midPoint);
    const bottomRowPhotos = allHeroPhotos.slice(midPoint);
    
    // Duplicate photos multiple times for seamless infinite scroll
    const duplicatedTopPhotos = [...topRowPhotos, ...topRowPhotos, ...topRowPhotos, ...topRowPhotos];
    const duplicatedBottomPhotos = [...bottomRowPhotos, ...bottomRowPhotos, ...bottomRowPhotos, ...bottomRowPhotos];
    
    // Function to populate a row with images wrapped in containers
    function populateRow(container, photos) {
        photos.forEach((photoPath, index) => {
            // Create wrapper div for better control
            const wrapper = document.createElement('div');
            wrapper.className = 'portfolio-hero__photo-item';
            
            const img = document.createElement('img');
            img.src = photoPath;
            img.alt = `Portfolio image ${index + 1}`;
            img.loading = 'eager';
            img.onerror = function() {
                wrapper.style.display = 'none';
            };
            
            wrapper.appendChild(img);
            container.appendChild(wrapper);
        });
    }
    
    // Populate rows with different photos - top row gets first half, bottom row gets second half
    populateRow(photoScrollTop, duplicatedTopPhotos);
    populateRow(photoScrollBottom, duplicatedBottomPhotos);
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero photo scroll
    initHeroPhotoScroll();
    
    // Wait for grid to be generated
    setTimeout(() => {
        const portfolioModal = document.querySelector('.portfolio-modal');
        const modalBackdrop = portfolioModal?.querySelector('.portfolio-modal__backdrop');
        const modalClose = portfolioModal?.querySelector('.portfolio-modal__close');
        const body = document.body;
        const portfolioContainer = document.querySelector('.portfolio-categories');
        
        // Update event delegation to work with both grids
        const photosGrid = document.getElementById('photos-grid');
        const videosGrid = document.getElementById('videos-grid');
        
        // Event delegation for portfolio items (works with both grids)
        function setupPortfolioClickHandlers() {
            [photosGrid, videosGrid].forEach(grid => {
                if (grid) {
                    grid.addEventListener('click', function(e) {
                        const item = e.target.closest('.portfolio-item');
                        if (item) {
                            openPortfolioModal(item);
                        }
                    });
                }
            });
        }
        
        setupPortfolioClickHandlers();
        
        // ===== PORTFOLIO MODAL FUNCTIONALITY =====
        function openPortfolioModal(item) {
            if (!portfolioModal || !item) {
                console.error('Modal or item not found');
                return;
            }
            
            const type = item.dataset.type;
            const title = item.dataset.title;
            const description = item.dataset.description;
            
            // Parse highlights with error handling
            let highlights = [];
            try {
                const highlightsStr = item.dataset.highlights || '[]';
                const cleanedStr = highlightsStr
                    .replace(/&apos;/g, "'")
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'");
                highlights = JSON.parse(cleanedStr);
            } catch (e) {
                console.error('Error parsing highlights:', e);
                highlights = [];
            }
            
            // Populate modal
            const modalTitle = portfolioModal.querySelector('[data-modal-title]');
            const modalDescription = portfolioModal.querySelector('[data-modal-description]');
            const modalHighlights = portfolioModal.querySelector('[data-modal-highlights]');
            const modalMedia = portfolioModal.querySelector('[data-modal-media]');
            
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
            
            // Populate media based on type
            if (modalMedia) {
                modalMedia.innerHTML = '';
                
                if (type === 'video') {
                    const videoId = item.dataset.videoId;
                    if (videoId) {
                        const videoWrapper = document.createElement('div');
                        videoWrapper.style.position = 'relative';
                        videoWrapper.style.paddingTop = '56.25%';
                        videoWrapper.style.borderRadius = '12px';
                        videoWrapper.style.overflow = 'hidden';
                        videoWrapper.style.background = '#000';
                        
                        const iframe = document.createElement('iframe');
                        iframe.src = `https://player.vimeo.com/video/${videoId}`;
                        iframe.frameBorder = '0';
                        iframe.allow = 'autoplay; fullscreen; picture-in-picture';
                        iframe.allowFullscreen = true;
                        iframe.style.position = 'absolute';
                        iframe.style.top = '0';
                        iframe.style.left = '0';
                        iframe.style.width = '100%';
                        iframe.style.height = '100%';
                        iframe.style.border = 'none';
                        iframe.style.borderRadius = '12px';
                        
                        videoWrapper.appendChild(iframe);
                        modalMedia.appendChild(videoWrapper);
                    }
                } else if (type === 'photo') {
                    const src = item.dataset.src;
                    if (src) {
                        const img = document.createElement('img');
                        img.src = src;
                        img.alt = title || 'Portfolio image';
                        img.style.width = '100%';
                        img.style.height = 'auto';
                        img.style.display = 'block';
                        img.style.borderRadius = '12px';
                        modalMedia.appendChild(img);
                    }
                }
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
            
            // Clear media to stop playback
            const modalMedia = portfolioModal.querySelector('[data-modal-media]');
            if (modalMedia) {
                modalMedia.innerHTML = '';
            }
        }
        
        // ===== EVENT DELEGATION FOR PORTFOLIO ITEMS =====
        // Handle clicks on both photos and videos grids
        [photosGrid, videosGrid].forEach(grid => {
            if (grid) {
                grid.addEventListener('click', function(e) {
                    const item = e.target.closest('.portfolio-item');
                    if (!item) return;
                    
                    // Don't open modal if clicking directly on iframe
                    const iframe = e.target.closest('iframe');
                    if (iframe) return;
                    
                    e.preventDefault();
                    e.stopPropagation();
                    openPortfolioModal(item);
                });
            }
        });
        
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
        
        // Animate items on load
        setTimeout(() => {
            const items = document.querySelectorAll('.portfolio-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 30);
            });
        }, 100);
    }, 500);
});
