# Grey 18 Studio - Update Camera Cursor Implementation
# This PowerShell script updates all HTML files to include the camera cursor implementation

Write-Host "Grey 18 Studio - Updating all HTML files with camera cursor..."

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
    
    # Check if the file already includes our camera cursor files
    $hasCameraCursorCSS = $fileContent -match "style-camera-cursor.css"
    $hasCameraCursorJS = $fileContent -match "camera-cursor.js"
    
    $changes = @()
    $modified = $false
    
    # Update the <head> to include our CSS file if not already included
    if (-not $hasCameraCursorCSS) {
        $headEndPosition = $fileContent.IndexOf("</head>")
        if ($headEndPosition -ne -1) {
            $cssLink = "    <!-- Camera Cursor Implementation -->`n    <link rel=`"stylesheet`" href=`"style-camera-cursor.css`">`n"
            $fileContent = $fileContent.Substring(0, $headEndPosition) + $cssLink + $fileContent.Substring($headEndPosition)
            $changes += "Added camera cursor CSS"
            $modified = $true
        }
    }
    
    # Update cursor div element (replace old with new or add if missing)
    if ($fileContent -match '<div class="cursor"></div>') {
        $fileContent = $fileContent -replace '<div class="cursor"></div>', '<div class="camera-cursor"></div>'
        $changes += "Replaced cursor div with camera-cursor div"
        $modified = $true
    } elseif (-not ($fileContent -match 'camera-cursor')) {
        # If no cursor div exists, add it after the loading animation
        $loadingEndPosition = $fileContent.IndexOf("</div>", $fileContent.IndexOf("loading"))
        if ($loadingEndPosition -ne -1) {
            $cursorDiv = "`n    <!-- Camera cursor element -->`n    <div class=`"camera-cursor`"></div>`n"
            $fileContent = $fileContent.Substring(0, $loadingEndPosition + 6) + $cursorDiv + $fileContent.Substring($loadingEndPosition + 6)
            $changes += "Added camera-cursor div after loading animation"
            $modified = $true
        }
    }
    
    # Remove old cursor script tags if present
    if ($fileContent -match '<script>\s*document\.addEventListener\(''DOMContentLoaded'', function\(\) {') {
        $scriptStartPos = $fileContent.IndexOf('<script>', $fileContent.IndexOf("document.addEventListener('DOMContentLoaded'"))
        if ($scriptStartPos -ne -1) {
            $scriptEndPos = $fileContent.IndexOf('</script>', $scriptStartPos) + 9
            $fileContent = $fileContent.Substring(0, $scriptStartPos) + $fileContent.Substring($scriptEndPos)
            $changes += "Removed old cursor script"
            $modified = $true
        }
    }
    
    # Add our JS file if not already included
    if (-not $hasCameraCursorJS) {
        $bodyEndPosition = $fileContent.IndexOf("</body>")
        if ($bodyEndPosition -ne -1) {
            # Find the position of the last script tag before </body>
            $lastScriptPos = $fileContent.LastIndexOf("<script", $bodyEndPosition)
            $lastScriptEndPos = $fileContent.IndexOf('</script>', $lastScriptPos) + 9
            
            $jsScript = "    <script src=`"camera-cursor.js`"></script>`n"
            $fileContent = $fileContent.Substring(0, $lastScriptEndPos) + "`n" + $jsScript + $fileContent.Substring($lastScriptEndPos)
            $changes += "Added camera cursor JS"
            $modified = $true
        }
    }
    
    # Write back the updated content if modified
    if ($modified) {
        Set-Content -Path $file.FullName -Value $fileContent
        Write-Host "✅ Updated $($file.Name) with changes: $($changes -join ', ')"
    } else {
        Write-Host "⏩ No changes needed for $($file.Name)"
    }
}

Write-Host "------------------------------"
Write-Host "Update complete! All HTML files now have consistent camera cursor implementation."
Write-Host "Remember to test all pages to ensure the cursor works correctly." 