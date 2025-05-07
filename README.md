# Grey 18 Studios Website

Professional website for Grey 18 Studios, featuring audio and visual production services.

## Overview

This website showcases Grey 18 Studios' comprehensive audio and visual production services including:
- Photography
- Sound Recording
- Dubbing
- Audio Mixing & Mastering
- Photo & Video Editing
- Colour Grading

## Portfolio Page

The portfolio page has been specially designed to showcase the studio's work across different categories. It features:

- A dedicated tab navigation system
- Category-specific galleries
- Independent styling to ensure consistent display
- Responsive design for all screen sizes

### Important Note on Portfolio Page

The portfolio page uses dedicated CSS and JavaScript files to ensure it remains functional regardless of changes to other parts of the website:

- `portfolio-dedicated.css`: Contains styles that override any conflicting styles
- `portfolio-standalone.js`: Self-contained JavaScript that handles all portfolio functionality

When making changes to the main website, care should be taken not to modify these files or introduce styles that might conflict with the portfolio display.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- GSAP Animation Library
- Font Awesome Icons
- Google Fonts

## Setup

Simply clone the repository and open the HTML files in a browser. No build steps are required.

```
git clone https://github.com/your-username/grey-18-studios.git
cd grey-18-studios
```

## File Structure

- `index.html` - Main homepage
- `portfolio.html` - Portfolio page
- `about.html` - About page
- `equipment.html` - Equipment page
- `pricing.html` - Pricing page
- `styles-updated.css` - Main stylesheet
- `portfolio.css` - Portfolio base styles
- `portfolio-dedicated.css` - Dedicated portfolio styles with !important rules
- `script.js` - Main JavaScript file
- `portfolio-standalone.js` - Isolated portfolio JavaScript

## License

All rights reserved. This project is proprietary and confidential.

## Contact

For inquiries, please contact info@grey18studio.com

## Deployment Guide

This guide will help you set up Git and deploy the website to GitHub Pages.

### Setting Up Git

1. **Configure Git** - First, set up your Git identity:
   ```
   git config --global user.email "your.email@example.com"
   git config --global user.name "Your Name"
   ```

2. **Initialize Git Repository** (if not already done):
   ```
   git init
   ```

3. **Add files to Git**:
   ```
   git add .
   ```

4. **Make your first commit**:
   ```
   git commit -m "Initial commit for Grey 18 Studios website"
   ```

### Connecting to GitHub

1. **Create a new repository on GitHub**:
   - Go to [GitHub](https://github.com) and sign in
   - Click the "+" icon in the top right and select "New repository"
   - Name your repository (e.g., "grey18studios")
   - Keep it public if you want to use the free GitHub Pages
   - Do not initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Connect your local repository to GitHub**:
   ```
   git remote add origin https://github.com/yourusername/grey18studios.git
   ```

3. **Push your code to GitHub**:
   ```
   git push -u origin master
   ```

### Deploying to GitHub Pages

#### Option 1: Deploy from main branch (simplest)

1. **Go to your repository settings**:
   - Click on "Settings" in your GitHub repository
   - Scroll down to the "GitHub Pages" section
   - Under "Source", select "master branch" or "main branch"
   - Click "Save"

2. **Access your deployed website**:
   - Your site will be published at `https://yourusername.github.io/grey18studios/`
   - GitHub will show you the URL in the GitHub Pages section

#### Option 2: Deploy using GitHub Actions (more control)

1. **Create a GitHub Actions workflow file**:
   - Create a `.github/workflows` directory in your project
   - Create a file named `deploy.yml` inside that directory

2. **Add the following content to deploy.yml**:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ master ]  # Or 'main' depending on your default branch name
     workflow_dispatch:  # Allows manual triggering

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout 🛎️
           uses: actions/checkout@v2

         - name: Deploy 🚀
           uses: JamesIves/github-pages-deploy-action@4.1.4
           with:
             branch: gh-pages  # The branch the action should deploy to
             folder: .  # The folder the action should deploy
   ```

3. **Push the workflow file to GitHub**:
   ```
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Pages deployment workflow"
   git push
   ```

4. **Configure GitHub Pages**:
   - Go to your repository settings
   - Scroll down to the "GitHub Pages" section
   - Under "Source", select "gh-pages branch"
   - Click "Save"

### Updating Your Website

1. **Make changes to your local files**

2. **Commit and push changes**:
   ```
   git add .
   git commit -m "Description of changes"
   git push
   ```

3. **Automatic deployment**:
   - GitHub will automatically deploy your changes
   - For Option 1, changes will appear after pushing to main/master
   - For Option 2, the GitHub Action will run and deploy your changes

### Domain Setup (Optional)

1. **Purchase a domain name** from a registrar (like Namecheap, GoDaddy, Google Domains)

2. **Add a custom domain in GitHub Pages**:
   - Go to your repository settings
   - Scroll down to the "GitHub Pages" section
   - Enter your domain name in the "Custom domain" field
   - Click "Save"

3. **Configure DNS records**:
   - Go to your domain registrar's DNS settings
   - Add these records:
     - A record pointing to GitHub's servers:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
     - CNAME record:
       - Name: www
       - Value: yourusername.github.io

### Tips for Successful Deployment

- Make sure your website uses relative paths for all resources
- Use HTTPS links for any external resources (fonts, libraries, etc.)
- Test your website locally before pushing changes
- Check the GitHub Actions tab if using Option 2 to troubleshoot deployment issues
- GitHub Pages can take a few minutes to update after pushing changes

### Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Configuring Custom Domains for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions Documentation](https://docs.github.com/en/actions) 