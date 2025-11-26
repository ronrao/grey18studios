// Portfolio Grid - Unified Random Layout with Photos and Videos

// Photo categorization based on file names
const photoCategories = {
    'Product': {
        files: [
            'Product-(5).jpg', 'Product-(21)---Copy---Copy.jpg', 'Product-(16).jpg',
            'Product-(15).jpg', 'Product-(13)---Copy---Copy.jpg'
        ],
        title: 'Product Photography',
        description: 'Professional product photography showcasing commercial goods with precision and style.',
        highlights: ['Studio lighting and composition', 'E-commerce ready images', 'Brand-focused visual storytelling']
    },
    'Portrait': {
        files: [
            'Port-(9).jpg', 'Port-(8).jpg', 'Port-(7).jpg', 'Port-(6).jpg', 'Port-(56).jpg',
            'Port-(45)-.jpg', 'Port-(31).jpg', 'Port-(3).jpg', 'Port-(24).jpg', 'Port-(14).jpg',
            'Port-(14)-copy.jpg'
        ],
        title: 'Portrait Photography',
        description: 'Capturing personality and emotion through professional portrait photography.',
        highlights: ['Studio and environmental portraits', 'Natural lighting expertise', 'Emotional storytelling']
    },
    'Architecture': {
        files: [
            'Architecture.jpg', 'Architecture-(7).jpg', 'Architecture-(4).jpg', 'Architecture-(3).jpg',
            'Architecture-(12).jpg', 'Architecture-(10).jpg'
        ],
        title: 'Architecture Photography',
        description: 'Showcasing architectural beauty through precise composition and lighting.',
        highlights: ['Interior and exterior shots', 'Perspective correction', 'Natural and artificial lighting']
    },
    'Corporate': {
        files: ['CM-(17).jpg', 'CM-(14).jpg'],
        title: 'Corporate Photography',
        description: 'Professional corporate photography for events, teams, and brand documentation.',
        highlights: ['Event coverage', 'Team photography', 'Brand documentation']
    },
    'Interiors': {
        files: [
            'Interiors-(9)-copy.jpg', 'Interiors-(7)-copy.jpg', 'Interiors-(4)-copy.jpg', 'Interiors-(10).jpg'
        ],
        title: 'Interior Photography',
        description: 'Capturing the essence of interior spaces with attention to detail and atmosphere.',
        highlights: ['Space composition', 'Lighting design', 'Atmospheric storytelling']
    },
    'People': {
        files: ['People-(28).jpg'],
        title: 'People Photography',
        description: 'Documenting people in their natural environments and moments.',
        highlights: ['Candid moments', 'Environmental portraits', 'Lifestyle photography']
    },
    'Mythriya': {
        files: ['Mythriya-(52).jpg', 'Mythriya-(15).jpg', 'Mythriya-(14).jpg'],
        title: 'Mythriya Collection',
        description: 'A curated collection showcasing artistic vision and creative expression.',
        highlights: ['Artistic composition', 'Creative storytelling', 'Visual narrative']
    },
    'Final': {
        files: ['Final-(3).jpg', 'Final-(1).jpg'],
        title: 'Final Collection',
        description: 'Polished and refined photography work ready for presentation.',
        highlights: ['Professional finish', 'Color grading', 'Post-production excellence']
    },
    'Other': {
        files: ['_MG_7184.jpg', '_MG_1937.jpg', 'A-(9).jpg', '3--Roopa.jpg'],
        title: 'Photography',
        description: 'Diverse photography work showcasing various styles and techniques.',
        highlights: ['Versatile portfolio', 'Multiple styles', 'Creative vision']
    }
};

// Video data
const videoData = [
    { id: '1023847619', title: 'Kalyani Developers TVC', description: 'Elegant, story-driven commercial for Kalyani Developers, highlighting lifestyle and aspiration for their new residential project.', highlights: ['Emotional storytelling and cinematic visuals', 'Targeted for TV and digital campaigns', 'Professional cast and high-end production'] },
    { id: '1023846133', title: 'Sudarshan Silks Deepavali TVC', description: 'Celebrate the Radiance of Deepavali with Sudarshan Silks. This festive season, adorn yourself in timeless elegance.', highlights: ['Elegant showcase of luxurious sarees', 'Rich, vibrant color palettes', 'Emotive storytelling'] },
    { id: '990163225', title: 'Sudarshan Jewellers TVC', description: 'Timeless Elegance, Exceptional Value — Only at Sudarshan Jewellers.', highlights: ['Bright, colourful visuals', 'Modern, elegant aesthetic', 'Dynamic editing'] },
    { id: '760593147', title: 'Sudarshan Silks Brand Film', description: 'Bringing the story of Sudarshan Silks to life through elegant visuals and authentic storytelling.', highlights: ['Warm, elegant visual palette', 'Smooth transitions', 'Natural lighting'] },
    { id: '791596397', title: 'Authentic Spices TVC', description: 'Authentic spices that elevate everyday cooking through rich visuals and earthy tones.', highlights: ['Warm, earthy visual palette', 'Smooth, intentional pacing', 'Brand ethos focus'] },
    { id: '747141340', title: 'Gifting Brand Film', description: 'A heartfelt brand film that captures the joy of giving and the magic of meaningful surprises.', highlights: ['Bright, feel-good visuals', 'Warm color grading', 'Human-centric storytelling'] },
    { id: '746041347', title: 'Vemica Kitchen TVC', description: 'Bringing your kitchen to life with bold, flavorful visuals and high-impact storytelling.', highlights: ['Bold, punchy editing', 'Visual tone balance', 'Professional kitchen shots'] },
    { id: '743022127', title: 'Young Performers Show Promo', description: 'A vibrant, high-energy promo to spotlight the joy, talent, and spirit of young performers.', highlights: ['Bright, playful visuals', 'Emotionally uplifting moments', 'Anticipation building'] },
    { id: '746041371', title: 'Vemica Traditional Kitchen TVC', description: 'A nostalgic, heartwarming film that brings the timeless taste of a grandmother\'s kitchen into today\'s homes.', highlights: ['Emotive storytelling', 'Subtle lighting', 'Tradition and convenience'] },
    { id: '746041308', title: 'Coorg Coffee TVC', description: 'Capture the serenity of mornings and the richness of coffee straight from Coorg\'s lush plantations.', highlights: ['Slow, cinematic pacing', 'Warm color grading', 'Freshness emphasis'] },
    { id: '741609456', title: 'Bridal Jewellery TVC', description: 'A visual ode to tradition, grace, and celebration centered around intricate bridal jewellery.', highlights: ['Rich, detailed close-ups', 'Warm, golden color grading', 'Emotion-driven storytelling'] },
    { id: '746042574', title: 'Niks Masala TVC', description: 'A heartfelt, home-centric story that celebrates the emotional bond formed through food.', highlights: ['Intimate, home-based setting', 'Soft, warm lighting', 'Expressive performances'] },
    { id: '746044675', title: 'Crispy Day Brand Film', description: 'A bold and flavour-forward brand film to introduce the company\'s vision and product line.', highlights: ['Bright, colorful visuals', 'Energetic background score', 'Fresh brand identity'] },
    { id: '747140996', title: 'Premium Tonic TVC', description: 'A visually refined product film that captures the essence of sophistication in every pour.', highlights: ['Ultra close-up shots', 'Minimalist lighting', 'Slow-motion emphasis'] },
    { id: '1095901717', title: 'Saptham Kitchen TVC', description: 'A warm, slice-of-life story that highlights trust through everyday conversations.', highlights: ['Natural kitchen setting', 'Relatable narrative', 'Brand loyalty focus'] },
    { id: '1095906827', title: 'Saptham Grocery Expansion TVC', description: 'Introduces Saptham\'s expanded grocery line with light-hearted and engaging interaction.', highlights: ['Abundance visualization', 'Dialogue-driven reveal', 'Playful interaction'] },
    { id: '1095907345', title: 'Saptham Lamp Lighting TVC', description: 'A calm, reverent visual tone reflecting the cultural significance of lighting a lamp.', highlights: ['Serene visuals', 'Close-up details', 'Minimalistic tone'] }
];

// Generate photo items
function generatePhotoItems() {
    const items = [];
    
    Object.keys(photoCategories).forEach(category => {
        const catData = photoCategories[category];
        catData.files.forEach((file, index) => {
            items.push({
                type: 'photo',
                src: `assets/photos/${file}`,
                category: category,
                title: catData.title + (catData.files.length > 1 ? ` ${index + 1}` : ''),
                description: catData.description,
                highlights: catData.highlights,
                alt: file.replace(/\.(jpg|jpeg|png)/i, '').replace(/[-_]/g, ' ')
            });
        });
    });
    
    return items;
}

// Generate video items
function generateVideoItems() {
    return videoData.map(video => ({
        type: 'video',
        videoId: video.id,
        title: video.title,
        description: video.description,
        highlights: video.highlights
    }));
}

// Shuffle array randomly
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Masonry layout for photos
function layoutMasonry(container) {
    if (!container || container.id !== 'photos-grid') return;
    
    const items = container.querySelectorAll('.portfolio-item');
    if (items.length === 0) return;
    
    const containerWidth = container.offsetWidth;
    // Calculate gap based on viewport (matching CSS clamp)
    const gap = window.innerWidth <= 600 ? 12 : window.innerWidth <= 1024 ? 16 : 20;
    
    // Calculate number of columns based on screen size
    let columns = 3;
    if (window.innerWidth <= 600) {
        columns = 1;
    } else if (window.innerWidth <= 1024) {
        columns = 2;
    }
    
    const columnWidth = (containerWidth - (gap * (columns - 1))) / columns;
    const columnHeights = new Array(columns).fill(0);
    
    items.forEach((item) => {
        // Find the shortest column
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        
        // Set position
        const left = shortestColumnIndex * (columnWidth + gap);
        const top = columnHeights[shortestColumnIndex];
        
        item.style.left = `${left}px`;
        item.style.top = `${top}px`;
        item.style.width = `${columnWidth}px`;
        
        // Get actual item height (including info section)
        const itemHeight = item.offsetHeight || item.getBoundingClientRect().height || 300;
        columnHeights[shortestColumnIndex] += itemHeight + gap;
    });
    
    // Set container height
    const maxHeight = Math.max(...columnHeights);
    container.style.height = `${maxHeight}px`;
}

// Generate portfolio items for a specific type
function generatePortfolioItems(items, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'portfolio-item';
        card.dataset.index = index;
        
        if (item.type === 'video') {
            card.dataset.type = 'video';
            card.dataset.videoId = item.videoId;
            card.dataset.title = item.title;
            card.dataset.description = item.description;
            card.dataset.highlights = JSON.stringify(item.highlights);
            
            card.innerHTML = `
                <div class="portfolio-item__media">
                    <iframe src="https://player.vimeo.com/video/${item.videoId}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                    <div class="portfolio-item__overlay">
                        <div class="portfolio-item__icon">
                            <i class="fas fa-play-circle"></i>
                        </div>
                    </div>
                </div>
                <div class="portfolio-item__info">
                    <span class="portfolio-item__type">Video</span>
                    <h3 class="portfolio-item__title">${item.title}</h3>
                </div>
            `;
        } else {
            card.dataset.type = 'photo';
            card.dataset.src = item.src;
            card.dataset.title = item.title;
            card.dataset.description = item.description;
            card.dataset.highlights = JSON.stringify(item.highlights);
            card.dataset.category = item.category;
            
            card.innerHTML = `
                <div class="portfolio-item__media">
                    <img src="${item.src}" alt="${item.alt}" loading="lazy">
                    <div class="portfolio-item__overlay">
                        <div class="portfolio-item__icon">
                            <i class="fas fa-image"></i>
                        </div>
                    </div>
                </div>
                <div class="portfolio-item__info">
                    <span class="portfolio-item__type">${item.category}</span>
                    <h3 class="portfolio-item__title">${item.title}</h3>
                </div>
            `;
        }
        
        container.appendChild(card);
    });
    
    // Apply masonry layout for photos
    if (container.id === 'photos-grid') {
        // Wait for images to load, then layout
        const images = container.querySelectorAll('img');
        let loadedCount = 0;
        const totalImages = images.length;
        
        const performLayout = () => {
            // Force reflow to ensure images are rendered
            container.offsetHeight;
            setTimeout(() => layoutMasonry(container), 50);
        };
        
        if (totalImages === 0) {
            // No images, layout immediately
            performLayout();
        } else {
            let allLoaded = false;
            images.forEach(img => {
                if (img.complete && img.naturalHeight !== 0) {
                    loadedCount++;
                    if (loadedCount === totalImages && !allLoaded) {
                        allLoaded = true;
                        performLayout();
                    }
                } else {
                    img.onload = function() {
                        loadedCount++;
                        if (loadedCount === totalImages && !allLoaded) {
                            allLoaded = true;
                            performLayout();
                        }
                    };
                    img.onerror = function() {
                        loadedCount++;
                        if (loadedCount === totalImages && !allLoaded) {
                            allLoaded = true;
                            performLayout();
                        }
                    };
                }
            });
            
            // Fallback: layout after 2 seconds even if some images haven't loaded
            setTimeout(() => {
                if (!allLoaded) {
                    performLayout();
                }
            }, 2000);
        }
    }
}

// Initialize portfolio grids and tabs
function initializePortfolioTabs() {
    const photoItems = shuffleArray(generatePhotoItems());
    const videoItems = shuffleArray(generateVideoItems());
    
    const photosGrid = document.getElementById('photos-grid');
    const videosGrid = document.getElementById('videos-grid');
    const tabs = document.querySelectorAll('.portfolio-tab');
    
    // Generate initial grids
    generatePortfolioItems(photoItems, photosGrid);
    generatePortfolioItems(videoItems, videosGrid);
    
    // Handle window resize for masonry layout
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (photosGrid && photosGrid.classList.contains('active')) {
                layoutMasonry(photosGrid);
            }
        }, 250);
    });
    
    // Tab switching functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Update tab states
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Show/hide grids
            if (targetTab === 'photos') {
                photosGrid.classList.add('active');
                photosGrid.style.display = 'block';
                videosGrid.classList.remove('active');
                videosGrid.style.display = 'none';
                // Re-layout masonry when switching to photos
                setTimeout(() => layoutMasonry(photosGrid), 100);
            } else {
                videosGrid.classList.add('active');
                videosGrid.style.display = 'flex';
                photosGrid.classList.remove('active');
                photosGrid.style.display = 'none';
            }
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioTabs();
});

