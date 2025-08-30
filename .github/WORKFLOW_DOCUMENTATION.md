# GitHub Actions Workflow Documentation

This repository includes an automated GitHub Actions workflow that deploys the Just Girl Calc application to GitHub Pages with comprehensive quality checks.

## Workflow Features

### 🔍 Quality Assurance
- **HTML Validation**: Checks all HTML files for syntax and structure
- **CSS Linting**: Validates CSS code style and best practices
- **JavaScript Linting**: Ensures JavaScript code quality
- **Accessibility Testing**: Uses axe-core to check WCAG compliance
- **Performance Testing**: Lighthouse audit with minimum score requirements

### 🚀 Deployment
- **Automatic Deployment**: Deploys to GitHub Pages on every push to main branch
- **File Optimization**: Minifies HTML and optimizes assets
- **Performance Headers**: Adds caching headers for better performance
- **Clean Build**: Removes development files from production build

### 📊 Monitoring
- **Live Site Testing**: Tests the deployed site after successful deployment
- **Performance Monitoring**: Continuous monitoring of site performance
- **Artifact Storage**: Saves Lighthouse reports for review

## Workflow Triggers

The workflow runs on:
- **Push to main branch**: Full deployment with quality checks
- **Pull Requests**: Quality checks only (no deployment)
- **Manual trigger**: Can be triggered manually from GitHub Actions tab

## Quality Standards

The workflow enforces minimum scores:
- **Performance**: 80/100
- **Accessibility**: 80/100
- **Best Practices**: 80/100
- **SEO**: 80/100

If any score falls below these thresholds, the deployment will fail.

## Setup Instructions

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will handle the rest automatically

2. **Branch Protection** (Recommended):
   - Protect the main branch
   - Require status checks to pass before merging
   - Require branches to be up to date before merging

3. **Environment Variables**:
   No additional environment variables needed. The workflow uses built-in GitHub variables.

## Monitoring and Reports

- **Lighthouse Reports**: Downloadable artifacts after each run
- **Live Site Monitoring**: Checks the deployed site performance
- **Action Logs**: Detailed logs for troubleshooting

## Best Practices Implemented

- **Caching**: Dependencies and Node.js setup are cached for faster builds
- **Security**: Uses pinned action versions and minimal permissions
- **Performance**: Optimized build process with asset minification
- **Monitoring**: Continuous performance and accessibility monitoring
- **Error Handling**: Graceful handling of deployment edge cases

## Troubleshooting

If the workflow fails:

1. **Check the logs** in the GitHub Actions tab
2. **Lighthouse scores**: Ensure all scores meet minimum requirements
3. **File validation**: Check for HTML, CSS, or JavaScript errors
4. **Accessibility**: Review and fix any accessibility violations

The workflow is designed to catch issues early and ensure high-quality deployments.