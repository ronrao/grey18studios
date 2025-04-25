/**
 * Grey 18 Studio - Camera Cursor
 * 
 * HOW TO USE THIS SCRIPT:
 * 1. Include this script in your HTML file:
 *    <script src="camera-cursor.js"></script>
 * 
 * 2. Add it near the end of your <head> section
 * 
 * 3. That's it! The camera cursor will automatically work on desktop devices
 * 
 * Features:
 * - Camera-shaped cursor that follows the mouse
 * - Flash animation when clicking
 * - Camera shutter sound effect
 * - Works across all pages for consistent experience
 * - Automatically disables on mobile/touch devices
 */

(function() {
  console.log('Camera cursor script starting initialization');
  
  // Create the camera cursor when the DOM is fully loaded
  function initCameraCursor() {
    console.log('Camera cursor initialization function called');
    
    // Only run on desktop
    const isTouchDevice = ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0) ||
                         window.matchMedia("(hover: none)").matches;
    
    if (isTouchDevice || window.innerWidth < 992) {
      console.log('Touch device or small screen detected - disabling custom cursor');
      return;
    }
    
    // Remove any existing camera cursors to prevent duplicates
    const existingCursors = document.querySelectorAll('#camera-cursor');
    existingCursors.forEach(cursor => cursor.parentNode?.removeChild(cursor));
    
    const existingFlashes = document.querySelectorAll('#camera-flash');
    existingFlashes.forEach(flash => flash.parentNode?.removeChild(flash));
    
    // Remove any existing cursor styles
    const existingStyles = document.getElementById('camera-cursor-styles');
    if (existingStyles && existingStyles.parentNode) {
      existingStyles.parentNode.removeChild(existingStyles);
    }
    
    // Create camera cursor styles
    const styleElement = document.createElement('style');
    styleElement.id = 'camera-cursor-styles';
    styleElement.textContent = `
      /* Hide default cursor on desktop */
      html, body, a, button, .btn, input, select, textarea, .service-card, 
      .portfolio-item, .nav-link, .expanded-close, .social-icon, .logo, 
      .scroll-down, .menu-toggle {
        cursor: none !important;
      }
      
      #camera-cursor {
        position: fixed;
        width: 40px;
        height: 32px;
        background: #333;
        border-radius: 5px;
        border: 2px solid #888;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 999999;
        transform: translate(-50%, -50%);
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        top: 0;
        left: 0;
        will-change: transform, left, top;
      }
      
      #camera-lens {
        width: 16px;
        height: 16px;
        background: radial-gradient(circle at center, #444 0%, #666 40%, #444 100%);
        border: 2px solid #ff5252;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      
      #camera-body {
        width: 24px;
        height: 16px;
        border: 2px solid #ff5252;
        border-radius: 2px;
        position: relative;
      }
      
      #camera-flash-light {
        width: 6px;
        height: 6px;
        background-color: #ff3333;
        border-radius: 50%;
        position: absolute;
        top: -4px;
        right: -4px;
      }
      
      #camera-top {
        content: '';
        position: absolute;
        top: -6px;
        left: 12px;
        width: 14px;
        height: 6px;
        background-color: #555;
        border-radius: 4px 4px 0 0;
        border-top: 1px solid #999;
        border-left: 1px solid #888;
        border-right: 1px solid #888;
      }
      
      #camera-button {
        position: absolute;
        top: -4px;
        right: 8px;
        width: 8px;
        height: 4px;
        background-color: #aaa;
        border-radius: 2px;
        border: 1px solid #bbb;
      }
      
      #camera-flash {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: white;
        opacity: 0;
        pointer-events: none;
        z-index: 999998;
        transition: opacity 0.1s ease;
      }
      
      /* Camera cursor animation classes */
      #camera-cursor.flashing {
        filter: brightness(5) !important;
        box-shadow: 0 0 30px 15px rgba(255, 255, 255, 0.8) !important;
      }
      
      #camera-lens.flashing {
        transform: translate(-50%, -50%) scale(0.6) !important;
      }
      
      #camera-button.flashing {
        transform: translateY(2px) !important;
        background-color: #ff3333 !important;
      }
      
      /* Animation for flash light */
      @keyframes blink {
        0% { opacity: 0.3; }
        5% { opacity: 1; }
        10% { opacity: 0.3; }
        95% { opacity: 0.3; }
        100% { opacity: 0.3; }
      }
      
      #camera-flash-light {
        animation: blink 4s infinite;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Create camera cursor elements
    const cursor = document.createElement('div');
    cursor.id = 'camera-cursor';
    
    const cameraBody = document.createElement('div');
    cameraBody.id = 'camera-body';
    
    const lens = document.createElement('div');
    lens.id = 'camera-lens';
    
    const flashLight = document.createElement('div');
    flashLight.id = 'camera-flash-light';
    
    const cameraTop = document.createElement('div');
    cameraTop.id = 'camera-top';
    
    const cameraButton = document.createElement('div');
    cameraButton.id = 'camera-button';
    
    // Assemble camera cursor
    cameraBody.appendChild(lens);
    cursor.appendChild(cameraBody);
    cursor.appendChild(flashLight);
    cursor.appendChild(cameraTop);
    cursor.appendChild(cameraButton);
    
    // Create flash overlay
    const flash = document.createElement('div');
    flash.id = 'camera-flash';
    
    // Add elements to the DOM
    document.body.appendChild(cursor);
    document.body.appendChild(flash);
    
    // Set initial position to center of screen
    cursor.style.top = window.innerHeight / 2 + 'px';
    cursor.style.left = window.innerWidth / 2 + 'px';
    
    // Store mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Update cursor position with requestAnimationFrame for smoother movement
    function updateCursorPosition() {
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      }
      requestAnimationFrame(updateCursorPosition);
    }
    
    // Start update loop
    updateCursorPosition();
    
    // Click animation effect
    document.addEventListener('mousedown', function() {
      // Flash the cursor elements
      cursor.classList.add('flashing');
      lens.classList.add('flashing');
      cameraButton.classList.add('flashing');
      
      // Flash the screen slightly
      flash.style.opacity = '0.3';
      
      // Play camera shutter sound
      playShutterSound();
      
      // Reset after animation completes
      setTimeout(function() {
        cursor.classList.remove('flashing');
        lens.classList.remove('flashing');
        cameraButton.classList.remove('flashing');
        flash.style.opacity = '0';
      }, 150);
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseout', function(e) {
      if (!e.relatedTarget) {
        cursor.style.display = 'none';
      }
    });
    
    // Show cursor when mouse enters window
    document.addEventListener('mouseover', function() {
      cursor.style.display = 'flex';
    });
    
    // Function to play camera shutter sound
    function playShutterSound() {
      try {
        const shutterSound = new Audio('https://www.soundjay.com/mechanical/sounds/camera-shutter-click-01.mp3');
        shutterSound.volume = 0.4;
        shutterSound.play().catch(function(err) {
          console.log('Cannot play shutter sound:', err);
        });
      } catch (err) {
        console.log('Error creating audio:', err);
      }
    }
    
    // Make sure the cursor is displayed with a slight delay
    setTimeout(function() {
      if (cursor) {
        cursor.style.display = 'flex';
      }
    }, 50);
    
    console.log('Camera cursor initialized');
  }
  
  // Handle different document states
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCameraCursor);
  } else {
    // Document already loaded, initialize immediately
    setTimeout(initCameraCursor, 100);
  }
  
  // Also reinitialize on window load to ensure it works
  window.addEventListener('load', function() {
    const cursor = document.getElementById('camera-cursor');
    if (!cursor) {
      console.log('Cursor not found, reinitializing on window load');
      setTimeout(initCameraCursor, 100);
    }
  });
})(); 