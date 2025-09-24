/**
 * Xbotix Brand Constants
 * 
 * This file contains all brand guidelines as JavaScript constants
 * for use in React components and dynamic styling.
 * 
 * STRICT ADHERENCE REQUIRED - No other colors or fonts permitted
 */

// BRAND COLORS - ONLY THESE THREE COLORS ALLOWED
export const BRAND_COLORS = {
    RED: '#e21a10',    // Primary accent color - for CTAs, highlights, icons
    BLACK: '#000000',  // Foundation color - backgrounds, premium contrast
    WHITE: '#ffffff',  // Text on dark backgrounds, clean sections
};

// BRAND FONTS - Hierarchy must be followed
export const BRAND_FONTS = {
    // Primary headline fonts
    MONUMENT: 'PP Monument Extended, system-ui, sans-serif',
    MENDA: 'Menda, system-ui, sans-serif',

    // Alternative headline font
    BEBAS: 'Bebas Neue, cursive',

    // Body text fonts - NEVER use for headlines
    RALEWAY: 'Raleway, sans-serif',
    MONTSERRAT: 'Montserrat, sans-serif',
};

// TYPOGRAPHY SCALE - Brand-compliant sizes
export const BRAND_TYPOGRAPHY = {
    H1: {
        fontSize: '48px',
        lineHeight: '1.1',
        fontWeight: '700',
        fontFamily: BRAND_FONTS.MONUMENT,
    },
    H2: {
        fontSize: '36px',
        lineHeight: '1.2',
        fontWeight: '400',
        fontFamily: BRAND_FONTS.MONUMENT,
    },
    H3: {
        fontSize: '24px',
        lineHeight: '1.3',
        fontWeight: '400',
        fontFamily: BRAND_FONTS.BEBAS,
    },
    BODY: {
        fontSize: '16px',
        lineHeight: '1.6',
        fontWeight: '400',
        fontFamily: BRAND_FONTS.RALEWAY,
    },
    CAPTION: {
        fontSize: '12px',
        lineHeight: '1.4',
        fontWeight: '400',
        fontFamily: BRAND_FONTS.MONTSERRAT,
    },
    HERO_TITLE: {
        fontSize: '70px',
        lineHeight: '1.1',
        fontWeight: '100',
        fontFamily: BRAND_FONTS.MENDA,
    },
};

// BRAND SPACING SCALE
export const BRAND_SPACING = {
    XS: '8px',
    SM: '16px',
    MD: '24px',
    LG: '32px',
    XL: '48px',
};

// APPROVED COLOR COMBINATIONS
export const BRAND_COMBINATIONS = {
    // ✅ Approved combinations
    APPROVED: [
        { text: BRAND_COLORS.RED, background: BRAND_COLORS.WHITE, name: 'Red on White' },
        { text: BRAND_COLORS.WHITE, background: BRAND_COLORS.BLACK, name: 'White on Black (Recommended)' },
        { text: BRAND_COLORS.BLACK, background: BRAND_COLORS.WHITE, name: 'Black on White' },
    ],

    // ❌ Combinations to avoid
    AVOID: [
        { text: BRAND_COLORS.RED, background: BRAND_COLORS.BLACK, reason: 'Low contrast' },
        { text: BRAND_COLORS.BLACK, background: BRAND_COLORS.RED, reason: 'Strains eyes' },
    ],
};

// BUTTON STYLES
export const BRAND_BUTTONS = {
    PRIMARY: {
        backgroundColor: BRAND_COLORS.RED,
        color: BRAND_COLORS.WHITE,
        fontFamily: BRAND_FONTS.MONTSERRAT,
        fontSize: '16px',
        fontWeight: '500',
        padding: '12px 24px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    SECONDARY: {
        backgroundColor: 'transparent',
        color: BRAND_COLORS.WHITE,
        fontFamily: BRAND_FONTS.MONTSERRAT,
        fontSize: '16px',
        fontWeight: '500',
        padding: '12px 24px',
        borderRadius: '4px',
        border: `2px solid ${BRAND_COLORS.WHITE}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
};

// CARD STYLES
export const BRAND_CARD = {
    backgroundColor: BRAND_COLORS.BLACK,
    color: BRAND_COLORS.WHITE,
    borderRadius: '8px',
    padding: BRAND_SPACING.MD,
    border: '1px solid #333333',
};

// FORM STYLES
export const BRAND_INPUT = {
    backgroundColor: BRAND_COLORS.BLACK,
    color: BRAND_COLORS.WHITE,
    fontFamily: BRAND_FONTS.RALEWAY,
    border: '1px solid #333333',
    borderRadius: '4px',
    padding: '12px 16px',
    fontSize: '16px',
    transition: 'border-color 0.2s ease',
};

// HELPER FUNCTIONS
export const brandHelpers = {
    // Get approved text color for background
    getTextColor: (backgroundColor) => {
        switch (backgroundColor) {
            case BRAND_COLORS.BLACK:
                return BRAND_COLORS.WHITE;
            case BRAND_COLORS.WHITE:
                return BRAND_COLORS.BLACK;
            case BRAND_COLORS.RED:
                return BRAND_COLORS.WHITE; // Use with caution
            default:
                return BRAND_COLORS.WHITE; // Default to white for unknown backgrounds
        }
    },

    // Check if color combination is approved
    isApprovedCombination: (textColor, backgroundColor) => {
        return BRAND_COMBINATIONS.APPROVED.some(
            combo => combo.text === textColor && combo.background === backgroundColor
        );
    },

    // Get font for element type
    getFontForElement: (elementType) => {
        switch (elementType) {
            case 'h1':
            case 'h2':
                return BRAND_FONTS.MONUMENT;
            case 'h3':
                return BRAND_FONTS.BEBAS;
            case 'body':
                return BRAND_FONTS.RALEWAY;
            case 'caption':
                return BRAND_FONTS.MONTSERRAT;
            default:
                return BRAND_FONTS.RALEWAY;
        }
    },
};

// CSS CUSTOM PROPERTIES (for use in styled-components or CSS-in-JS)
export const BRAND_CSS_VARS = {
    '--xbotix-red': BRAND_COLORS.RED,
    '--xbotix-black': BRAND_COLORS.BLACK,
    '--xbotix-white': BRAND_COLORS.WHITE,
    '--font-monument': BRAND_FONTS.MONUMENT,
    '--font-menda': BRAND_FONTS.MENDA,
    '--font-bebas': BRAND_FONTS.BEBAS,
    '--font-raleway': BRAND_FONTS.RALEWAY,
    '--font-montserrat': BRAND_FONTS.MONTSERRAT,
    '--space-brand-xs': BRAND_SPACING.XS,
    '--space-brand-sm': BRAND_SPACING.SM,
    '--space-brand-md': BRAND_SPACING.MD,
    '--space-brand-lg': BRAND_SPACING.LG,
    '--space-brand-xl': BRAND_SPACING.XL,
};

// BRAND VALIDATION FUNCTIONS
export const brandValidation = {
    // Validate if a color is brand compliant
    isValidColor: (color) => {
        return Object.values(BRAND_COLORS).includes(color);
    },

    // Validate if a font is approved
    isValidFont: (font) => {
        return Object.values(BRAND_FONTS).some(brandFont =>
            brandFont.toLowerCase().includes(font.toLowerCase())
        );
    },

    // Get validation errors for a design
    validateDesign: (design) => {
        const errors = [];

        if (design.textColor && !brandValidation.isValidColor(design.textColor)) {
            errors.push(`Invalid text color: ${design.textColor}. Use only: ${Object.values(BRAND_COLORS).join(', ')}`);
        }

        if (design.backgroundColor && !brandValidation.isValidColor(design.backgroundColor)) {
            errors.push(`Invalid background color: ${design.backgroundColor}. Use only: ${Object.values(BRAND_COLORS).join(', ')}`);
        }

        if (design.font && !brandValidation.isValidFont(design.font)) {
            errors.push(`Invalid font: ${design.font}. Use only approved brand fonts.`);
        }

        if (design.textColor && design.backgroundColor) {
            if (!brandHelpers.isApprovedCombination(design.textColor, design.backgroundColor)) {
                errors.push(`Invalid color combination: ${design.textColor} on ${design.backgroundColor}`);
            }
        }

        return errors;
    },
};

export default {
    BRAND_COLORS,
    BRAND_FONTS,
    BRAND_TYPOGRAPHY,
    BRAND_SPACING,
    BRAND_COMBINATIONS,
    BRAND_BUTTONS,
    BRAND_CARD,
    BRAND_INPUT,
    BRAND_CSS_VARS,
    brandHelpers,
    brandValidation,
};
