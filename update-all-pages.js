/**
 * Grey 18 Studio - Update Camera Cursor Implementation
 * This script updates all HTML files to include the camera cursor implementation
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
    
    // Check if the file already includes our camera cursor files
    const hasCameraCursorCSS = fileContent.includes('style-camera-cursor.css');
    const hasCameraCursorJS = fileContent.includes('camera-cursor.js');
    
    let changes = [];
    let modified = false;
    
    // Update the <head> to include our CSS file if not already included
    if (!hasCameraCursorCSS) {
        const headEndPosition = fileContent.indexOf('</head>');
        if (headEndPosition !== -1) {
            const cssLink = '    <!-- Camera Cursor Implementation -->\n    <link rel="stylesheet" href="style-camera-cursor.css">\n';
            fileContent = fileContent.slice(0, headEndPosition) + cssLink + fileContent.slice(headEndPosition);
            changes.push('Added camera cursor CSS');
            modified = true;
        }
    }
    
    // Update cursor div element (replace old with new or add if missing)
    if (fileContent.includes('<div class="cursor"></div>')) {
        fileContent = fileContent.replace('<div class="cursor"></div>', '<div class="camera-cursor"></div>');
        changes.push('Replaced cursor div with camera-cursor div');
        modified = true;
    } else if (!fileContent.includes('camera-cursor')) {
        // If no cursor div exists, add it after the loading animation
        const loadingEndPosition = fileContent.indexOf('</div>', fileContent.indexOf('loading'));
        if (loadingEndPosition !== -1) {
            const cursorDiv = '\n    <!-- Camera cursor element -->\n    <div class="camera-cursor"></div>\n';
            fileContent = fileContent.slice(0, loadingEndPosition + 6) + cursorDiv + fileContent.slice(loadingEndPosition + 6);
            changes.push('Added camera-cursor div after loading animation');
            modified = true;
        }
    }
    
    // Remove old cursor script tags if present
    if (fileContent.includes('<script>\n    document.addEventListener(\'DOMContentLoaded\', function() {')) {
        const scriptStartPos = fileContent.indexOf('<script>\n    document.addEventListener(\'DOMContentLoaded\', function() {');
        const scriptEndPos = fileContent.indexOf('</script>', scriptStartPos) + 9;
        fileContent = fileContent.slice(0, scriptStartPos) + fileContent.slice(scriptEndPos);
        changes.push('Removed old cursor script');
        modified = true;
    }
    
    // Add our JS file if not already included
    if (!hasCameraCursorJS) {
        const bodyEndPosition = fileContent.indexOf('</body>');
        if (bodyEndPosition !== -1) {
            // Find the position of the last script tag before </body>
            const lastScriptPos = fileContent.lastIndexOf('<script', bodyEndPosition);
            const lastScriptEndPos = fileContent.indexOf('</script>', lastScriptPos) + 9;
            
            const jsScript = '    <script src="camera-cursor.js"></script>\n';
            fileContent = fileContent.slice(0, lastScriptEndPos) + '\n' + jsScript + fileContent.slice(lastScriptEndPos);
            changes.push('Added camera cursor JS');
            modified = true;
        }
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