/**
 * Grey 18 Studio - Main JavaScript
 * Handles core functionality and imports
 */

// Import styles
import './style.css';
import './style-theme-warm.css';
import './cursor.css';

// Load custom cursor implementation
import './cursor.js';

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Grey 18 Studio - Site Initialized');
  
  // Add any additional initialization code here
  initializeAnimations();
  setupEventListeners();
});

/**
 * Sets up animations throughout the site
 */
function initializeAnimations() {
  // Add animation initializations here if needed
}

/**
 * Sets up event listeners for interactive elements
 */
function setupEventListeners() {
  // Service card expandable sections
  const toggleButtons = document.querySelectorAll('.toggle-expanded');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetView = document.getElementById(targetId);
      
      if (targetView) {
        document.querySelectorAll('.expanded-view').forEach(view => {
          if (view !== targetView) {
            view.classList.remove('active');
          }
        });
        
        targetView.classList.toggle('active');
      }
    });
  });
  
  // Close expanded view buttons
  const closeButtons = document.querySelectorAll('.close-expanded');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const expandedView = this.closest('.expanded-view');
      if (expandedView) {
        expandedView.classList.remove('active');
      }
    });
  });
  
  // Testimonial sliders
  initializeTestimonialSliders();
}

/**
 * Initialize testimonial sliders
 */
function initializeTestimonialSliders() {
  // Text testimonials
  const textSliderContainer = document.querySelector('.testimonial-slider');
  const textSlides = document.querySelectorAll('.testimonial-slide');
  const textPrevBtn = document.querySelector('.text-testimonials .prev');
  const textNextBtn = document.querySelector('.text-testimonials .next');
  
  if (textSlides.length && textPrevBtn && textNextBtn) {
    let textCurrentIndex = 0;
    
    textPrevBtn.addEventListener('click', () => {
      textCurrentIndex = (textCurrentIndex > 0) ? textCurrentIndex - 1 : textSlides.length - 1;
      updateTextSlider();
    });
    
    textNextBtn.addEventListener('click', () => {
      textCurrentIndex = (textCurrentIndex < textSlides.length - 1) ? textCurrentIndex + 1 : 0;
      updateTextSlider();
    });
    
    function updateTextSlider() {
      const offset = -textCurrentIndex * 100;
      textSliderContainer.style.transform = `translateX(${offset}%)`;
    }
  }
  
  // Video testimonials
  const videoSliderContainer = document.querySelector('.video-testimonial-slider');
  const videoSlides = document.querySelectorAll('.video-testimonial-slide');
  const videoPrevBtn = document.querySelector('.video-testimonials .prev');
  const videoNextBtn = document.querySelector('.video-testimonials .next');
  
  if (videoSlides.length && videoPrevBtn && videoNextBtn) {
    let videoCurrentIndex = 0;
    
    videoPrevBtn.addEventListener('click', () => {
      videoCurrentIndex = (videoCurrentIndex > 0) ? videoCurrentIndex - 1 : videoSlides.length - 1;
      updateVideoSlider();
    });
    
    videoNextBtn.addEventListener('click', () => {
      videoCurrentIndex = (videoCurrentIndex < videoSlides.length - 1) ? videoCurrentIndex + 1 : 0;
      updateVideoSlider();
    });
    
    function updateVideoSlider() {
      const offset = -videoCurrentIndex * 100;
      videoSliderContainer.style.transform = `translateX(${offset}%)`;
    }
  }
} 