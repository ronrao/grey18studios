/**
 * Grey 18 Studio - Custom Camera Cursor
 * Implements a custom camera cursor with hover and click effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  
  // Add cursor to the DOM
  document.body.appendChild(cursor);
  
  // Initialize cursor position off-screen
  let cursorX = -100;
  let cursorY = -100;
  
  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    // Update cursor position with smooth animation
    updateCursorPosition();
  });
  
  // Handle cursor state changes
  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
  });
  
  // Add hover state to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .toggle-expanded, .service-card, input, select, textarea');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
    });
  });
  
  // Handle page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      cursor.style.display = 'none';
    } else {
      cursor.style.display = 'block';
    }
  });
  
  // Make cursor visible when mouse enters the window
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
  
  // Hide cursor when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  
  // Update cursor position with smooth animation using requestAnimationFrame
  let raf;
  
  function updateCursorPosition() {
    // Cancel any pending animation frame
    if (raf) {
      cancelAnimationFrame(raf);
    }
    
    // Request new animation frame
    raf = requestAnimationFrame(() => {
      // Apply position with transform for better performance
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    });
  }
}); 