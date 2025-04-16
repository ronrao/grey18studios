#!/bin/bash
# Grey 18 Studio Deployment Script
# This script helps with deploying the website to GitHub Pages

echo -e "\033[0;36mGrey 18 Studio - GitHub Deployment Helper\033[0m"
echo -e "\033[0;36m===========================================\033[0m"
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo -e "\033[0;31mError: Git is not installed or not in your PATH.\033[0m"
    echo -e "\033[0;31mPlease install Git from https://git-scm.com/downloads\033[0m"
    exit 1
fi

# Check if remote is configured
if [ -z "$(git remote -v)" ]; then
    echo -e "\033[0;33mNo Git remote configured. Let's set it up!\033[0m"
    
    # Get GitHub username
    echo -n "Enter your GitHub username: "
    read username
    
    # Get repository name
    echo -n "Enter repository name (e.g., grey18studio): "
    read repoName
    
    # Configure remote
    git remote add origin "https://github.com/$username/$repoName.git"
    echo -e "\033[0;32mRemote 'origin' configured!\033[0m"
fi

# Check if user email is configured
userEmail=$(git config user.email)
if [ -z "$userEmail" ]; then
    echo -e "\033[0;33mGit user email not configured. Let's set it up!\033[0m"
    
    echo -n "Enter your email: "
    read email
    
    echo -n "Enter your name: "
    read name
    
    git config --global user.email "$email"
    git config --global user.name "$name"
    
    echo -e "\033[0;32mGit user configured!\033[0m"
fi

# Deployment options
echo -e "\033[0;36mSelect an action:\033[0m"
echo "1. Initialize repository (first-time setup)"
echo "2. Commit and push changes"
echo "3. Exit"

echo -n "Enter your choice (1-3): "
read choice

case $choice in
    1)
        # Initialize repository
        echo -e "\033[0;33mInitializing repository...\033[0m"
        
        # Check if already initialized
        if [ -d ".git" ]; then
            echo -e "\033[0;32mRepository already initialized!\033[0m"
        else
            git init
            echo -e "\033[0;32mRepository initialized!\033[0m"
        fi
        
        # Add all files
        git add .
        
        # Initial commit
        echo -n "Enter initial commit message [Initial commit]: "
        read commitMessage
        if [ -z "$commitMessage" ]; then 
            commitMessage="Initial commit" 
        fi
        
        git commit -m "$commitMessage"
        
        # Push to GitHub
        echo -e "\033[0;33mPushing to GitHub...\033[0m"
        git push -u origin master
        
        echo -e "\033[0;32mSetup complete! Your website is now on GitHub.\033[0m"
        echo -e "\033[0;32mGo to your repository settings to enable GitHub Pages.\033[0m"
        ;;
    2)
        # Commit and push changes
        echo -e "\033[0;33mPreparing to commit changes...\033[0m"
        
        # Show status
        git status
        
        # Add changes
        echo -e "\033[0;33mAdding changes...\033[0m"
        git add .
        
        # Commit
        echo -n "Enter commit message: "
        read commitMessage
        if [ -z "$commitMessage" ]; then
            echo -e "\033[0;31mCommit message cannot be empty!\033[0m"
            exit 1
        fi
        
        git commit -m "$commitMessage"
        
        # Push to GitHub
        echo -e "\033[0;33mPushing changes to GitHub...\033[0m"
        git push
        
        echo -e "\033[0;32mChanges pushed successfully!\033[0m"
        echo -e "\033[0;32mYour website will be updated shortly.\033[0m"
        ;;
    3)
        echo -e "\033[0;33mExiting...\033[0m"
        exit 0
        ;;
    *)
        echo -e "\033[0;31mInvalid choice. Exiting.\033[0m"
        exit 1
        ;;
esac

echo ""
echo -e "\033[0;36mDeployment process complete!\033[0m"
echo -e "\033[0;36mYour website will be available at: https://[yourusername].github.io/[reponame]/\033[0m"
echo -e "\033[0;36mOr at your custom domain if you've configured one.\033[0m" 