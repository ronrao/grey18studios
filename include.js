// Function to include HTML content from another file
async function includeHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Error fetching ${filePath}: ${response.status}`);
        }
        const html = await response.text();
        
        // Create a temporary container to parse the HTML
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = html;
        
        // Extract the content from specific elements
        if (filePath.includes('header.html')) {
            const headerContent = tempContainer.querySelector('header');
            const headerStyles = tempContainer.querySelector('style');
            const headerScript = tempContainer.querySelector('script');
            
            if (headerContent) {
                document.getElementById(elementId).innerHTML = headerContent.outerHTML;
                
                // Add the header styles if they exist
                if (headerStyles) {
                    const styleElement = document.createElement('style');
                    styleElement.textContent = headerStyles.textContent;
                    document.head.appendChild(styleElement);
                }
                
                // Add the header script if it exists
                if (headerScript) {
                    const scriptElement = document.createElement('script');
                    scriptElement.textContent = headerScript.textContent;
                    document.body.appendChild(scriptElement);
                }
                
                // Initialize header functionality
                initializeHeader();
            }
        } else if (filePath.includes('footer.html')) {
            const footerContent = tempContainer.querySelector('footer');
            if (footerContent) {
                document.getElementById(elementId).innerHTML = footerContent.outerHTML;
            }
        }
    } catch (error) {
        console.error(`Failed to include ${filePath}:`, error);
        // Fallback for header if fetch fails
        if (filePath.includes('header.html')) {
            createBackupHeader(elementId);
        }
    }
}

// Create a backup header if the header.html file can't be loaded
function createBackupHeader(elementId) {
    const headerHTML = `
    <header>
        <div class="logo">
            <h1>GREY <span>18</span> STUDIO</h1>
        </div>
        <nav>
            <ul>
                <li><a href="index.html" id="nav-home">Home</a></li>
                <li><a href="index.html#services" id="nav-services">Services</a></li>
                <li><a href="portfolio.html" id="nav-portfolio">Portfolio</a></li>
                <li><a href="about.html" id="nav-about">About</a></li>
                <li><a href="equipment.html" id="nav-equipment">Equipment</a></li>
                <li><a href="pricing.html" id="nav-pricing">Pricing</a></li>
                <li><a href="contact.html" id="nav-contact">Contact</a></li>
            </ul>
        </nav>
        <div class="menu-toggle">
            <i class="fas fa-bars"></i>
        </div>
    </header>
    `;
    
    document.getElementById(elementId).innerHTML = headerHTML;
    initializeHeader();
}

// Initialize header functionality
function initializeHeader() {
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    let currentNavItem;
    
    switch(currentPage) {
        case 'index.html':
            currentNavItem = document.getElementById('nav-home');
            break;
        case 'portfolio.html':
            currentNavItem = document.getElementById('nav-portfolio');
            break;
        case 'about.html':
            currentNavItem = document.getElementById('nav-about');
            break;
        case 'equipment.html':
            currentNavItem = document.getElementById('nav-equipment');
            break;
        case 'pricing.html':
            currentNavItem = document.getElementById('nav-pricing');
            break;
        case 'contact.html':
            currentNavItem = document.getElementById('nav-contact');
            break;
        default:
            if (currentPage === '' || currentPage === '/') {
                currentNavItem = document.getElementById('nav-home');
            }
    }
    
    if (currentNavItem) {
        currentNavItem.classList.add('active');
    }
    
    // Toggle menu for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Add sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }
    });
}

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Include header and footer
    const headerElement = document.getElementById('header-container');
    const footerElement = document.getElementById('footer-container');
    
    if (headerElement) {
        includeHTML('header-container', 'header.html');
    }
    
    if (footerElement) {
        includeHTML('footer-container', 'footer.html');
    }
    
    // Disable the automated gradient application since we're using fixed gradients in CSS
    // We'll leave this code here in case it's needed for other pages
    // setTimeout(applySectionGradients, 100);
}); 