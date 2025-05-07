/**
 * Grey 18 Studio - Custom Camera Cursor Script
 * This script implements a camera-style custom cursor for desktop devices only.
 * Include this script in all pages for consistent cursor behavior across the site.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor functionality
    const cursor = document.querySelector('.custom-cursor');
    const cameraFlash = document.querySelector('.camera-flash');
    
    // Check if device is touch-enabled
    const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          (navigator.msMaxTouchPoints > 0) ||
                          window.matchMedia("(hover: none)").matches;
    
    // Display cursor immediately on load (only on desktop)
    if (cursor && !isTouchDevice && window.innerWidth >= 992) {
        cursor.style.display = 'flex';
        
        // Set initial position (center of screen)
        cursor.style.left = window.innerWidth / 2 + 'px';
        cursor.style.top = window.innerHeight / 2 + 'px';
        
        // Custom cursor functionality for desktop only
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseout', function(e) {
            if (e.relatedTarget === null) {
                cursor.style.display = 'none';
            }
        });
        
        document.addEventListener('mouseover', function() {
            cursor.style.display = 'flex';
        });
        
        // Enhanced camera click effect on desktop only
        document.addEventListener('click', function(e) {
            // Reset any ongoing animation
            cursor.classList.remove('cursor-flash');
            
            // Force a reflow to restart animation
            void cursor.offsetWidth;
            
            // Apply the animation class for camera flash effect
            cursor.classList.add('cursor-flash');
            
            // Play camera shutter sound if available
            if (window.cameraShutterSound) {
                window.cameraShutterSound.play();
            }
            
            // Remove the animation class after it completes
            setTimeout(() => {
                cursor.classList.remove('cursor-flash');
            }, 200);
        });
        
        // Prevent other cursor implementations from running
        window.customCursorInitialized = true;
    } else if (cursor) {
        // Make sure cursor is hidden on mobile/touch devices
        cursor.style.display = 'none';
    }
}); 