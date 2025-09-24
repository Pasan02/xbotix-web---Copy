import React from 'react';
import {
    BRAND_COLORS,
    BRAND_TYPOGRAPHY,
    BRAND_BUTTONS,
    BRAND_SPACING,
    brandHelpers
} from '../constants/brandConstants';

/**
 * Xbotix Brand-Compliant Button Component
 * 
 * Usage examples:
 * <BrandButton variant="primary">Get Started</BrandButton>
 * <BrandButton variant="secondary">Learn More</BrandButton>
 */
export const BrandButton = ({
    children,
    variant = 'primary',
    onClick,
    disabled = false,
    className = '',
    ...props
}) => {
    const buttonStyles = {
        primary: {
            ...BRAND_BUTTONS.PRIMARY,
            '&:hover': {
                backgroundColor: '#c41a10', // Darker red on hover
                transform: 'translateY(-1px)',
            },
            '&:disabled': {
                backgroundColor: '#666666',
                cursor: 'not-allowed',
                transform: 'none',
            }
        },
        secondary: {
            ...BRAND_BUTTONS.SECONDARY,
            '&:hover': {
                backgroundColor: BRAND_COLORS.WHITE,
                color: BRAND_COLORS.BLACK,
            },
            '&:disabled': {
                borderColor: '#666666',
                color: '#666666',
                cursor: 'not-allowed',
            }
        }
    };

    const currentStyle = buttonStyles[variant] || buttonStyles.primary;

    return (
        <button
            style={currentStyle}
            onClick={onClick}
            disabled={disabled}
            className={`brand-button brand-button--${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

/**
 * Brand-Compliant Typography Component
 * 
 * Usage examples:
 * <BrandText variant="h1">Main Headline</BrandText>
 * <BrandText variant="h2">Secondary Headline</BrandText>
 * <BrandText variant="body">Body content goes here</BrandText>
 */
export const BrandText = ({
    children,
    variant = 'body',
    color,
    className = '',
    ...props
}) => {
    const typography = BRAND_TYPOGRAPHY[variant.toUpperCase()] || BRAND_TYPOGRAPHY.BODY;

    const Tag = variant.startsWith('h') ? variant : 'p';

    const textColor = color || BRAND_COLORS.WHITE; // Default to white text

    const style = {
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize,
        lineHeight: typography.lineHeight,
        fontWeight: typography.fontWeight,
        color: textColor,
        margin: 0, // Reset default margins
    };

    return (
        <Tag
            style={style}
            className={`brand-text brand-text--${variant} ${className}`}
            {...props}
        >
            {children}
        </Tag>
    );
};

/**
 * Brand-Compliant Card Component
 * 
 * Usage:
 * <BrandCard>
 *   <BrandCard.Title>Card Title</BrandCard.Title>
 *   <BrandCard.Content>Card content here</BrandCard.Content>
 * </BrandCard>
 */
export const BrandCard = ({ children, className = '', ...props }) => {
    const cardStyle = {
        backgroundColor: BRAND_COLORS.BLACK,
        color: BRAND_COLORS.WHITE,
        borderRadius: '8px',
        padding: BRAND_SPACING.MD,
        border: '1px solid #333333',
    };

    return (
        <div
            style={cardStyle}
            className={`brand-card ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

BrandCard.Title = ({ children, className = '', ...props }) => (
    <BrandText
        variant="h3"
        color={BRAND_COLORS.RED}
        className={`brand-card__title ${className}`}
        style={{ marginBottom: BRAND_SPACING.SM }}
        {...props}
    >
        {children}
    </BrandText>
);

BrandCard.Content = ({ children, className = '', ...props }) => (
    <BrandText
        variant="body"
        className={`brand-card__content ${className}`}
        {...props}
    >
        {children}
    </BrandText>
);

/**
 * Brand-Compliant Input Component
 * 
 * Usage:
 * <BrandInput 
 *   placeholder="Enter your email"
 *   type="email"
 *   value={email}
 *   onChange={handleEmailChange}
 * />
 */
export const BrandInput = ({
    type = 'text',
    placeholder,
    className = '',
    ...props
}) => {
    const inputStyle = {
        backgroundColor: BRAND_COLORS.BLACK,
        color: BRAND_COLORS.WHITE,
        fontFamily: BRAND_TYPOGRAPHY.BODY.fontFamily,
        border: '1px solid #333333',
        borderRadius: '4px',
        padding: '12px 16px',
        fontSize: '16px',
        transition: 'border-color 0.2s ease',
        outline: 'none',
    };

    const focusStyle = {
        borderColor: BRAND_COLORS.RED,
        boxShadow: `0 0 0 2px rgba(226, 26, 16, 0.2)`,
    };

    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <input
            type={type}
            placeholder={placeholder}
            style={{
                ...inputStyle,
                ...(isFocused ? focusStyle : {})
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`brand-input ${className}`}
            {...props}
        />
    );
};

/**
 * Brand Layout Container
 * 
 * Usage:
 * <BrandContainer>
 *   <BrandText variant="h1">Welcome to Xbotix</BrandText>
 *   <BrandText variant="body">Your content here</BrandText>
 * </BrandContainer>
 */
export const BrandContainer = ({
    children,
    maxWidth = '1200px',
    padding = BRAND_SPACING.LG,
    className = '',
    ...props
}) => {
    const containerStyle = {
        backgroundColor: BRAND_COLORS.BLACK,
        color: BRAND_COLORS.WHITE,
        minHeight: '100vh',
        padding: padding,
        maxWidth: maxWidth,
        margin: '0 auto',
    };

    return (
        <div
            style={containerStyle}
            className={`brand-container ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Brand Section with proper spacing
 */
export const BrandSection = ({
    children,
    spacing = 'xl',
    className = '',
    ...props
}) => {
    const sectionStyle = {
        paddingTop: BRAND_SPACING[spacing.toUpperCase()],
        paddingBottom: BRAND_SPACING[spacing.toUpperCase()],
    };

    return (
        <section
            style={sectionStyle}
            className={`brand-section brand-section--${spacing} ${className}`}
            {...props}
        >
            {children}
        </section>
    );
};

/**
 * Brand Icon Component (ensures proper sizing and colors)
 */
export const BrandIcon = ({
    size = 24,
    color = BRAND_COLORS.WHITE,
    className = '',
    children, // Icon content (SVG paths, etc.)
    ...props
}) => {
    const iconStyle = {
        width: `${size}px`,
        height: `${size}px`,
        color: color,
        display: 'inline-block',
    };

    return (
        <span
            style={iconStyle}
            className={`brand-icon ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

// Export all components
export default {
    BrandButton,
    BrandText,
    BrandCard,
    BrandInput,
    BrandContainer,
    BrandSection,
    BrandIcon,
};
