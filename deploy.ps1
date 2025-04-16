# Grey 18 Studio Deployment Script
# This script helps with deploying the website to GitHub Pages

Write-Host "Grey 18 Studio - GitHub Deployment Helper" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
$gitVersion = git --version
if (-not $?) {
    Write-Host "Error: Git is not installed or not in your PATH." -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/downloads" -ForegroundColor Red
    exit 1
}

# Check if remote is configured
$remoteExists = git remote -v
if (-not $remoteExists) {
    Write-Host "No Git remote configured. Let's set it up!" -ForegroundColor Yellow
    
    # Get GitHub username
    $username = Read-Host "Enter your GitHub username"
    
    # Get repository name
    $repoName = Read-Host "Enter repository name (e.g., grey18studio)"
    
    # Configure remote
    git remote add origin "https://github.com/$username/$repoName.git"
    Write-Host "Remote 'origin' configured!" -ForegroundColor Green
}

# Check if user email is configured
$userEmail = git config user.email
if (-not $userEmail) {
    Write-Host "Git user email not configured. Let's set it up!" -ForegroundColor Yellow
    
    $email = Read-Host "Enter your email"
    $name = Read-Host "Enter your name"
    
    git config --global user.email $email
    git config --global user.name $name
    
    Write-Host "Git user configured!" -ForegroundColor Green
}

# Deployment options
Write-Host "Select an action:" -ForegroundColor Cyan
Write-Host "1. Initialize repository (first-time setup)" -ForegroundColor White
Write-Host "2. Commit and push changes" -ForegroundColor White
Write-Host "3. Exit" -ForegroundColor White

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        # Initialize repository
        Write-Host "Initializing repository..." -ForegroundColor Yellow
        
        # Check if already initialized
        if (Test-Path ".git") {
            Write-Host "Repository already initialized!" -ForegroundColor Green
        } else {
            git init
            Write-Host "Repository initialized!" -ForegroundColor Green
        }
        
        # Add all files
        git add .
        
        # Initial commit
        $commitMessage = Read-Host "Enter initial commit message [Initial commit]"
        if (-not $commitMessage) { $commitMessage = "Initial commit" }
        
        git commit -m $commitMessage
        
        # Push to GitHub
        Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
        git push -u origin master
        
        Write-Host "Setup complete! Your website is now on GitHub." -ForegroundColor Green
        Write-Host "Go to your repository settings to enable GitHub Pages." -ForegroundColor Green
    }
    "2" {
        # Commit and push changes
        Write-Host "Preparing to commit changes..." -ForegroundColor Yellow
        
        # Show status
        git status
        
        # Add changes
        Write-Host "Adding changes..." -ForegroundColor Yellow
        git add .
        
        # Commit
        $commitMessage = Read-Host "Enter commit message"
        if (-not $commitMessage) {
            Write-Host "Commit message cannot be empty!" -ForegroundColor Red
            exit 1
        }
        
        git commit -m $commitMessage
        
        # Push to GitHub
        Write-Host "Pushing changes to GitHub..." -ForegroundColor Yellow
        git push
        
        Write-Host "Changes pushed successfully!" -ForegroundColor Green
        Write-Host "Your website will be updated shortly." -ForegroundColor Green
    }
    "3" {
        Write-Host "Exiting..." -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "Invalid choice. Exiting." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Deployment process complete!" -ForegroundColor Cyan
Write-Host "Your website will be available at: https://[yourusername].github.io/[reponame]/" -ForegroundColor Cyan
Write-Host "Or at your custom domain if you've configured one." -ForegroundColor Cyan 