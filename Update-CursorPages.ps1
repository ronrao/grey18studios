# Grey 18 Studio - Update HTML Files
# This PowerShell script updates all HTML files to remove the camera cursor implementation

Write-Host "Grey 18 Studio - Removing camera cursor from all HTML files..."

# Get all HTML files in the current directory
$htmlFiles = Get-ChildItem -Path . -Filter *.html

Write-Host "Found $($htmlFiles.Count) HTML files to update:"
$htmlFiles.Name | ForEach-Object { Write-Host $_ }
Write-Host "------------------------------"

# Process each file
foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..."
    
    # Read the file content
    $fileContent = Get-Content -Path $file.FullName -Raw
    
    $changes = @()
    $modified = $false
    
    # Remove camera cursor CSS link
    if ($fileContent -match 'style-camera-cursor.css') {
        $fileContent = $fileContent -replace '\s*<!-- Camera Cursor Implementation -->\s*\r?\n\s*<link rel="stylesheet" href="style-camera-cursor\.css">\s*', ''
        $changes += "Removed camera cursor CSS link"
        $modified = $true
    }
    
    # Remove camera cursor div
    if ($fileContent -match '<div class="camera-cursor"></div>') {
        $fileContent = $fileContent -replace '\s*<!-- Camera cursor element -->\s*\r?\n\s*<div class="camera-cursor"></div>\s*', ''
        $changes += "Removed camera cursor div"
        $modified = $true
    }
    
    # Remove camera cursor JavaScript
    if ($fileContent -match '<script src="camera-cursor.js"></script>') {
        $fileContent = $fileContent -replace '\s*<script src="camera-cursor\.js"></script>\s*', ''
        $changes += "Removed camera cursor script"
        $modified = $true
    }
    
    # Remove cursor:none styles from inline styles
    if ($fileContent -match 'cursor: none !important;') {
        $fileContent = $fileContent -replace 'cursor: none !important;', 'cursor: auto;'
        $changes += "Reset cursor styles"
        $modified = $true
    }
    
    # Write back the updated content if modified
    if ($modified) {
        Set-Content -Path $file.FullName -Value $fileContent
        Write-Host "✅ Updated $($file.Name) with changes: $($changes -join ', ')" -ForegroundColor Green
    } else {
        Write-Host "⏩ No changes needed for $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "------------------------------"
Write-Host "Update complete! All HTML files now have standard cursor behavior."

# Add a function to standardize theme across pages
function Standardize-Theme {
    $pagesWithTheme = @(
        "about.html",
        "portfolio.html",
        "equipment.html",
        "pricing.html",
        "contact.html"
    )
    
    foreach ($page in $pagesWithTheme) {
        if (Test-Path $page) {
            Write-Host "Standardizing theme for $page..."
            
            $content = Get-Content -Path $page -Raw
            
            # Remove theme CSS links
            $content = $content -replace '<link\s+rel="stylesheet"\s+href="style-theme-[^"]+\.css">', ''
            
            # Ensure the page uses the main CSS
            if (-not ($content -match 'href="styles-updated.css"')) {
                $headEndPos = $content.IndexOf('</head>')
                if ($headEndPos -gt 0) {
                    $content = $content.Substring(0, $headEndPos) + 
                        "`n    <link rel=`"stylesheet`" href=`"styles-updated.css`">`n" + 
                        $content.Substring($headEndPos)
                }
            }
            
            Set-Content -Path $page -Value $content
            Write-Host "Theme standardized for $page" -ForegroundColor Green
        } else {
            Write-Host "File not found: $page" -ForegroundColor Yellow
        }
    }
}

# Call the function at the end of your script
Write-Host "`nStandardizing theme across all pages..." -ForegroundColor Cyan
Standardize-Theme 