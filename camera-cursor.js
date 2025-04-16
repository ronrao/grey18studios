/**
 * Grey 18 Studio - Camera Cursor
 * Custom cursor implementation that replaces the default cursor with a camera icon
 * The cursor is styled in style-camera-cursor.css
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get the camera cursor element
    const cursor = document.querySelector('.camera-cursor');
    
    // If no cursor element is found, exit early
    if (!cursor) return;
    
    // Check if camera icon SVG exists, create it if it doesn't
    const checkCameraIcon = () => {
        fetch('assets/images/camera-icon.svg')
            .then(response => {
                if (!response.ok) {
                    createCameraIconSVG();
                }
            })
            .catch(() => {
                createCameraIconSVG();
            });
    };
    
    // Create the camera icon SVG file
    const createCameraIconSVG = () => {
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 32 24" fill="none" stroke="#4ecdc4" stroke-width="1.5"><path d="M2 6h28v16H2z" stroke="#4ecdc4" fill="none"/><path d="M9 2h14l2 4H7l2-4z" stroke="#4ecdc4" fill="none"/><circle cx="16" cy="14" r="5" stroke="#4ecdc4" fill="none"/><circle cx="16" cy="14" r="2" stroke="#4ecdc4" fill="none"/><rect x="24" y="8" width="4" height="2" fill="#4ecdc4" stroke="none"/></svg>`;
        
        // Attempt to create directory and file via fetch
        fetch('assets/images/camera-icon.svg', {
            method: 'PUT',
            body: svgContent,
            headers: {
                'Content-Type': 'image/svg+xml'
            }
        }).catch(error => {
            console.warn('Could not create camera icon SVG:', error);
            // Fallback to inline SVG in CSS
            cursor.style.backgroundImage = `url('data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}')`;
        });
    };
    
    // Update cursor position based on mouse movement
    const updateCursorPosition = (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    };
    
    // Handle hover and active states
    const addHoverClass = () => cursor.classList.add('hover');
    const removeHoverClass = () => cursor.classList.remove('hover');
    const addActiveClass = () => cursor.classList.add('active');
    const removeActiveClass = () => cursor.classList.remove('active');
    
    // Add mouse event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', addActiveClass);
    document.addEventListener('mouseup', removeActiveClass);
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .logo, .menu-toggle, .portfolio-nav-item, .service-card, .genre-card, .expanded-close');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', addHoverClass);
        element.addEventListener('mouseleave', removeHoverClass);
    });
    
    // Handle cursor visibility when leaving/entering window
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
    
    // Check if camera icon exists and create if needed
    checkCameraIcon();
});
