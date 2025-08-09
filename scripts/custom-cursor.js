/**
 * Grey 18 Studio - Custom Camera Cursor Script
 * Enhanced version with better mobile detection and performance
 * This script implements a camera-style custom cursor for desktop devices only.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor functionality
    const cursor = document.querySelector('.custom-cursor');
    const cameraFlash = document.querySelector('.camera-flash');
    
    // Enhanced touch device detection
    const isTouchDevice = (function() {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0 ||
            window.matchMedia("(hover: none)").matches ||
            window.matchMedia("(pointer: coarse)").matches ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        );
    })();
    
    // Enhanced desktop detection
    const isDesktop = (function() {
        return (
            window.innerWidth >= 992 &&
            !isTouchDevice &&
            window.matchMedia("(hover: hover)").matches &&
            window.matchMedia("(pointer: fine)").matches
        );
    })();
    
    // Initialize cursor only on desktop devices
    if (cursor && isDesktop) {
        // Ensure cursor is visible and positioned correctly
        cursor.style.display = 'flex';
        cursor.style.opacity = '0.8';
        
        // Set initial position (center of screen)
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        cursor.style.left = centerX + 'px';
        cursor.style.top = centerY + 'px';
        
        // Custom cursor movement for desktop only
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Ensure cursor remains visible during movement
            if (cursor.style.display !== 'flex') {
                cursor.style.display = 'flex';
            }
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseout', function(e) {
            if (e.relatedTarget === null) {
                cursor.style.display = 'none';
            }
        });
        
        // Show cursor when entering window
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
                try {
                    window.cameraShutterSound.play().catch(e => {
                        console.log('Camera sound play failed:', e);
                    });
                } catch (e) {
                    console.log('Camera sound not available');
                }
            }
            
            // Remove the animation class after it completes
            setTimeout(() => {
                cursor.classList.remove('cursor-flash');
            }, 200);
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // Re-check if we should still show cursor after resize
            if (!isDesktop || window.innerWidth < 992) {
                cursor.style.display = 'none';
            } else {
                cursor.style.display = 'flex';
            }
        });
        
        // Prevent other cursor implementations from running
        window.customCursorInitialized = true;
        
        console.log('Custom cursor initialized for desktop');
        
    } else if (cursor) {
        // Completely disable cursor on mobile/touch devices
        cursor.style.display = 'none';
        cursor.style.opacity = '0';
        cursor.style.pointerEvents = 'none';
        
        // Remove any cursor-related event listeners on mobile
        document.removeEventListener('mousemove', null);
        document.removeEventListener('click', null);
        
        console.log('Custom cursor disabled for mobile/touch device');
    }
    
    // Additional mobile-specific optimizations
    if (isTouchDevice) {
        // Ensure all interactive elements have proper touch targets
        const touchElements = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-item, .nav-link, .expanded-close, .social-icon, .logo, .scroll-down, .menu-toggle, input, select, textarea');
        
        touchElements.forEach(element => {
            // Add minimum touch target size for mobile
            if (window.innerWidth <= 768) {
                const computedStyle = window.getComputedStyle(element);
                const minHeight = parseInt(computedStyle.minHeight) || 0;
                const minWidth = parseInt(computedStyle.minWidth) || 0;
                
                if (minHeight < 44) {
                    element.style.minHeight = '44px';
                }
                if (minWidth < 44) {
                    element.style.minWidth = '44px';
                }
            }
        });
    }
}); 