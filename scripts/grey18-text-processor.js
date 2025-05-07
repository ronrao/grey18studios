/**
 * Grey18 Text Processor
 * 
 * This script finds all instances of:
 * 1. 'Grey' and wraps it in a span with class 'grey-text'
 * 2. '18' and wraps it in a span with class 'eighteen-text'
 * 3. Ensures 'Grey 18 Studio' is changed to 'Grey 18 Studios' (plural)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Process text nodes in the document
    processTextNodes(document.body);
});

/**
 * Process all text nodes in the given element and its children
 */
function processTextNodes(element) {
    // Skip script, style, textarea, input and select elements
    if (element.tagName === 'SCRIPT' || 
        element.tagName === 'STYLE' || 
        element.tagName === 'TEXTAREA' || 
        element.tagName === 'INPUT' || 
        element.tagName === 'SELECT') {
        return;
    }
    
    // Process child nodes
    for (let i = 0; i < element.childNodes.length; i++) {
        const node = element.childNodes[i];
        
        // If it's a text node, process it
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            processNode(node);
        } 
        // If it's an element node, process its children recursively
        else if (node.nodeType === Node.ELEMENT_NODE) {
            processTextNodes(node);
        }
    }
}

/**
 * Process a single text node to apply styling to 'Grey', '18', and ensure 'Grey 18 Studio' is plural
 */
function processNode(textNode) {
    // Skip if parent element already contains our special classes or is already processed
    const parentElement = textNode.parentElement;
    if (parentElement && 
        (parentElement.classList.contains('grey-text') || 
         parentElement.classList.contains('eighteen-text') || 
         parentElement.hasAttribute('data-grey18-processed'))) {
        return;
    }
    
    // Get the current text
    let text = textNode.textContent;
    
    // Skip if text is empty
    if (!text || text.trim() === '') {
        return;
    }
    
    // Create a document fragment to hold the new nodes
    const fragment = document.createDocumentFragment();
    
    // Regular expression to find 'Grey', '18', and 'Grey 18 Studio'
    // Using word boundaries to ensure we match whole words/numbers
    const regex = /\b(Grey|18|Grey\s+18\s+Studio)\b/g;
    
    let lastIndex = 0;
    let match;
    
    // Process all matches
    while ((match = regex.exec(text)) !== null) {
        const matchedText = match[0];
        const matchIndex = match.index;
        
        // Add text before the match
        if (matchIndex > lastIndex) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex, matchIndex)));
        }
        
        // Process the matched text
        if (matchedText === 'Grey') {
            // Create span for 'Grey'
            const span = document.createElement('span');
            span.className = 'grey-text';
            span.textContent = matchedText;
            fragment.appendChild(span);
        } 
        else if (matchedText === '18') {
            // Create span for '18'
            const span = document.createElement('span');
            span.className = 'eighteen-text';
            span.textContent = matchedText;
            fragment.appendChild(span);
        } 
        else if (matchedText.match(/Grey\s+18\s+Studio/)) {
            // Change 'Grey 18 Studio' to 'Grey 18 Studios' (plural)
            // Create a wrapper span for the entire studio name with nowrap
            const studioSpan = document.createElement('span');
            studioSpan.className = 'studio-name';
            
            // Create span for 'Grey'
            const greySpan = document.createElement('span');
            greySpan.className = 'grey-text';
            greySpan.textContent = 'Grey';
            studioSpan.appendChild(greySpan);
            
            // Add space
            studioSpan.appendChild(document.createTextNode(' '));
            
            // Create span for '18'
            const eighteenSpan = document.createElement('span');
            eighteenSpan.className = 'eighteen-text';
            eighteenSpan.textContent = '18';
            studioSpan.appendChild(eighteenSpan);
            
            // Add ' Studios' (plural)
            studioSpan.appendChild(document.createTextNode(' Studios'));
            
            fragment.appendChild(studioSpan);
        }
        
        lastIndex = matchIndex + matchedText.length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }
    
    // Replace the original text node with the processed fragment
    if (fragment.childNodes.length > 0) {
        textNode.parentNode.replaceChild(fragment, textNode);
        
        // Mark the parent as processed to avoid processing it again
        if (parentElement) {
            parentElement.setAttribute('data-grey18-processed', 'true');
        }
    }
}

// Run the process again when AJAX content might be loaded
window.addEventListener('load', function() {
    setTimeout(function() {
        processTextNodes(document.body);
    }, 500);
});

// Handle dynamic content by periodically checking for new text
setInterval(function() {
    processTextNodes(document.body);
}, 2000); 