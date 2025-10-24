/**
 * Language Toggle Helper
 * Handles language switching with proper path segment manipulation
 * to support both root-hosted and repository-based deployments
 */

function createLanguageToggleHandler() {
    return function() {
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        const currentHash = window.location.hash;
        const pathSegments = currentPath.split('/').filter(segment => segment !== '');
        
        // Check if we're currently on an English page
        const isCurrentlyEnglish = pathSegments[0] === 'en';
        
        let newPath;
        
        if (this.checked && !isCurrentlyEnglish) {
            // Switch to English - add 'en' at the beginning
            newPath = '/en/' + pathSegments.join('/');
        } else if (!this.checked && isCurrentlyEnglish) {
            // Switch to German - remove 'en' segment
            newPath = '/' + pathSegments.slice(1).join('/');
        } else {
            // No change needed
            return;
        }
        
        // Clean up the path (remove double slashes, ensure it starts with /)
        newPath = newPath.replace(/\/+/g, '/');
        if (!newPath.startsWith('/')) {
            newPath = '/' + newPath;
        }
        if (newPath === '/') {
            newPath = '/index.html';
        }
        
        // Construct the complete URL with search and hash
        const newUrl = newPath + currentSearch + currentHash;
        

        
        // Navigate to the new URL with preserved search and hash
        window.location.href = newUrl;
    };
}

function initializeLanguageToggle() {
    const languageToggle = document.getElementById('language-toggle');
    if (!languageToggle) return;
    
    // Set initial state based on current language
    const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
    const isEnglish = pathSegments[0] === 'en';
    
    languageToggle.checked = isEnglish;
    
    // Add event listener
    languageToggle.addEventListener('change', createLanguageToggleHandler());
}