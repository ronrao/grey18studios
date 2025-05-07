/**
 * Update HTML Files script
 * 
 * This script updates all HTML files in the project to include
 * the grey18-styling.css and grey18-text-processor.js files
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files in the project directory
function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
            // Recursively search directories
            results = results.concat(getHtmlFiles(filePath));
        } else if (path.extname(file).toLowerCase() === '.html') {
            // Add HTML files to results
            results.push(filePath);
        }
    });
    
    return results;
}

// Update HTML files to include our CSS and JS
function updateHtmlFiles() {
    const htmlFiles = getHtmlFiles('.');
    
    htmlFiles.forEach(filePath => {
        console.log(`Processing: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if the file already contains our CSS and JS references
        const hasCss = content.includes('grey18-styling.css');
        const hasJs = content.includes('grey18-text-processor.js');
        
        if (!hasCss || !hasJs) {
            // Find the head tag closing position
            const headClosePos = content.indexOf('</head>');
            
            if (headClosePos !== -1) {
                // Prepare the CSS link tag if needed
                let cssLink = '';
                if (!hasCss) {
                    cssLink = '    <link rel="stylesheet" href="css/grey18-styling.css">\n';
                }
                
                // Prepare the JS script tag if needed
                let jsScript = '';
                if (!hasJs) {
                    jsScript = '    <script src="scripts/grey18-text-processor.js"></script>\n';
                }
                
                // Insert the CSS and JS references
                const insertContent = cssLink + jsScript;
                content = content.slice(0, headClosePos) + insertContent + content.slice(headClosePos);
                
                // Write the updated content back to the file
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated: ${filePath}`);
            } else {
                console.log(`Warning: Could not find </head> in ${filePath}`);
            }
        } else {
            console.log(`Skipped: ${filePath} (already contains our references)`);
        }
    });
    
    console.log('All HTML files processed!');
}

// Run the update
updateHtmlFiles(); 