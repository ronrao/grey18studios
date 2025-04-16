/**
 * Grey 18 Studio - Update HTML Files
 * This script updates all HTML files to remove the camera cursor implementation
 * 
 * Usage: node update-all-pages.js
 */

const fs = require('fs');
const path = require('path');

// List all HTML files in the directory
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to update:`);
console.log(htmlFiles.join('\n'));
console.log('------------------------------');

// Process each file
htmlFiles.forEach(fileName => {
    console.log(`Processing ${fileName}...`);
    
    // Read the file content
    let fileContent = fs.readFileSync(fileName, 'utf8');
    
    let changes = [];
    let modified = false;
    
    // Remove camera cursor CSS link
    if (fileContent.includes('style-camera-cursor.css')) {
        const cssLinkRegex = /\s*<!-- Camera Cursor Implementation -->\s*\n\s*<link rel="stylesheet" href="style-camera-cursor\.css">\s*/g;
        fileContent = fileContent.replace(cssLinkRegex, '');
        changes.push('Removed camera cursor CSS link');
        modified = true;
    }
    
    // Remove camera cursor div
    if (fileContent.includes('<div class="camera-cursor"></div>')) {
        const cursorDivRegex = /\s*<!-- Camera cursor element -->\s*\n\s*<div class="camera-cursor"><\/div>\s*/g;
        fileContent = fileContent.replace(cursorDivRegex, '');
        changes.push('Removed camera cursor div');
        modified = true;
    }
    
    // Remove camera cursor JavaScript
    if (fileContent.includes('<script src="camera-cursor.js"></script>')) {
        const scriptRegex = /\s*<script src="camera-cursor\.js"><\/script>\s*/g;
        fileContent = fileContent.replace(scriptRegex, '');
        changes.push('Removed camera cursor script');
        modified = true;
    }
    
    // Remove cursor:none styles from inline styles
    if (fileContent.includes('cursor: none !important;')) {
        fileContent = fileContent.replace(/cursor: none !important;/g, 'cursor: auto;');
        changes.push('Reset cursor styles');
        modified = true;
    }
    
    // Write back the updated content if modified
    if (modified) {
        fs.writeFileSync(fileName, fileContent);
        console.log(`✅ Updated ${fileName} with changes: ${changes.join(', ')}`);
    } else {
        console.log(`⏩ No changes needed for ${fileName}`);
    }
});

console.log('------------------------------');
console.log('Update complete! All HTML files now have consistent camera cursor implementation.');
console.log('Remember to test all pages to ensure the cursor works correctly.');

/**
 * Standardize theme to black and grey across all pages
 */
function standardizeTheme() {
    const pagesWithTheme = [
        'about.html',
        'portfolio.html',
        'equipment.html',
        'pricing.html',
        'contact.html'
    ];
    
    pagesWithTheme.forEach(page => {
        try {
            let content = fs.readFileSync(page, 'utf8');
            
            // Remove any theme CSS links
            content = content.replace(/<link\s+rel="stylesheet"\s+href="style-theme-[^"]+\.css">/g, '');
            
            // Ensure the page is using the main CSS
            if (!content.includes('href="styles-updated.css"')) {
                const headEndPos = content.indexOf('</head>');
                content = content.slice(0, headEndPos) + 
                    '\n    <link rel="stylesheet" href="styles-updated.css">\n' + 
                    content.slice(headEndPos);
            }
            
            fs.writeFileSync(page, content, 'utf8');
            console.log(`Standardized theme for ${page}`);
        } catch (error) {
            console.error(`Error standardizing theme for ${page}:`, error);
        }
    });
}

console.log('Standardizing theme across all pages...');
standardizeTheme(); 