/**
 * Language Toggle Helper
 * Handles language switching with proper path segment manipulation
 * to support both root-hosted and repository-based deployments
 */

function createLanguageToggleHandler() {
    return function() {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment !== '');
        
        // Check if we're currently on an English page
        const isCurrentlyEnglish = pathSegments.includes('en');
        
        let newPath;
        
        if (this.checked && !isCurrentlyEnglish) {
            // Switch to English - add 'en' at the beginning
            newPath = '/en/' + pathSegments.join('/');
        } else if (!this.checked && isCurrentlyEnglish) {
            // Switch to German - remove 'en' segment
            const filteredSegments = pathSegments.filter(segment => segment !== 'en');
            newPath = '/' + filteredSegments.join('/');
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
        
        // Debug logging
        console.log('Language toggle:', {
            currentPath: currentPath,
            pathSegments: pathSegments,
            isCurrentlyEnglish: isCurrentlyEnglish,
            newPath: newPath,
            toggleChecked: this.checked
        });
        
        // Navigate to the new URL
        window.location.href = newPath;
    };
}

function initializeLanguageToggle() {
    const languageToggle = document.getElementById('language-toggle');
    if (!languageToggle) return;
    
    // Set initial state based on current language
    const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
    const isEnglish = pathSegments.includes('en');
    
    languageToggle.checked = isEnglish;
    
    // Add event listener
    languageToggle.addEventListener('change', createLanguageToggleHandler());
}
