/**
 * Asset Configuration
 * 
 * Centralized management of all assets used in the application
 */

// Logo and branding assets
export const ASSETS = {
    LOGOS: {
        PRIMARY: '/src/assets/9e1ddc7602d929a3d9f9a6dab89473265ed2c616.png',
        // Add other logo variants here when available
    },

    ICONS: {
        ARROW: '/src/assets/4d9868bf5fc47c256d9b5299e23b032a39db5e19.svg',
        // Add other icons here
    },

    // You can add more asset categories as needed
    IMAGES: {
        // Background images, hero images, etc.
    },
};

// Asset loading utilities
export const assetHelpers = {
    // Preload important assets
    preloadAssets: (assetList) => {
        assetList.forEach(assetUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = assetUrl;
            link.as = assetUrl.endsWith('.svg') ? 'image' : 'image';
            document.head.appendChild(link);
        });
    },

    // Get asset URL with fallback
    getAssetUrl: (assetPath, fallback = '') => {
        return assetPath || fallback;
    },
};

export default ASSETS;
