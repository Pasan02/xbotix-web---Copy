import { BRAND_COLORS, BRAND_TYPOGRAPHY } from '../../constants/brandConstants';

/**
 * Hero Section Component
 * 
 * Features:
 * - Brand-compliant radial gradient background
 * - Centered hero text with proper typography
 * - Call-to-action button with hover effects
 * - Responsive design
 * - Accessibility considerations
 */
const HeroSection = ({
    title = "XbotiX Galactic Core",
    subtitle = "The beacon has reached Earth. Will you answer the call?",
    ctaText = "Begin the Journey",
    onCtaClick,
    className = '',
    isLoading = false,
    ...props
}) => {
    const handleCtaClick = (event) => {
        event.preventDefault();
        if (onCtaClick) {
            onCtaClick(event);
        } else {
            console.log('CTA clicked - Begin the Journey');
        }
    };

    // Background gradient matching target design - updated to match Figma specs
    const backgroundStyle = {
        background: `radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.25) 100%)`,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000000', // Ensure solid black base
    };

    // Hero title styles - responsive with better shadows and positioning
    const getTitleStyle = () => ({
        // fontFamily: window.innerWidth <= 768 ? 'Montserrat, sans-serif' : BRAND_TYPOGRAPHY.HERO_TITLE.fontFamily,
        fontFamily: BRAND_TYPOGRAPHY.HERO_TITLE.fontFamily,
        fontSize: window.innerWidth <= 480 ? '36px' : window.innerWidth <= 768 ? '48px' : '70px',
        fontWeight: window.innerWidth <= 768 ? '100' : BRAND_TYPOGRAPHY.HERO_TITLE.fontWeight,
        color: BRAND_COLORS.WHITE,
        textAlign: 'center',
        textShadow: '0px 0px 40px rgba(0,0,0,0.9), 0px 0px 20px rgba(0,0,0,0.8)',
        marginBottom: window.innerWidth <= 768 ? '16px' : '24px',
        lineHeight: '1.1',
        maxWidth: '1100px',
        padding: window.innerWidth <= 768 ? '0 20px' : '0',
        letterSpacing: window.innerWidth <= 768 ? '1px' : '2px',
    });

    // Subtitle styles - responsive with better contrast
    const getSubtitleStyle = () => ({
        fontFamily: 'Montserrat, sans-serif',
        fontSize: window.innerWidth <= 480 ? '16px' : window.innerWidth <= 768 ? '18px' : '24px',
        fontWeight: '400',
        color: BRAND_COLORS.WHITE,
        textAlign: 'center',
        textShadow: '0px 0px 20px rgba(0,0,0,0.9), 0px 2px 4px rgba(0,0,0,0.8)',
        letterSpacing: window.innerWidth <= 480 ? '1.6px' : window.innerWidth <= 768 ? '1.8px' : '2.4px',
        marginBottom: window.innerWidth <= 768 ? '50px' : '80px', // Increased spacing for better separation from CTA
        maxWidth: '900px',
        lineHeight: '1.5',
        padding: window.innerWidth <= 768 ? '0 20px' : '0',
        opacity: 0.95,
    });

    // CTA button styles - responsive with better shadows
    const getCtaButtonStyle = () => ({
        backgroundColor: isLoading ? '#f0f0f0' : BRAND_COLORS.WHITE,
        color: BRAND_COLORS.BLACK,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold',
        fontSize: window.innerWidth <= 480 ? '18px' : window.innerWidth <= 768 ? '20px' : '24px',
        padding: window.innerWidth <= 768 ? '16px 32px' : '20px 40px',
        borderRadius: '50px',
        border: 'none',
        cursor: isLoading ? 'wait' : 'pointer',
        boxShadow: '0px 0px 60px 15px rgba(0,0,0,0.6), 0px 4px 20px rgba(0,0,0,0.8)',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 10,
        minWidth: window.innerWidth <= 480 ? '200px' : window.innerWidth <= 768 ? '240px' : '280px',
        height: '69px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isLoading ? 0.7 : 1,
        letterSpacing: '0.5px',
    });

    return (
        <section
            className={`hero-section ${className}`}
            style={{
                ...backgroundStyle,
                position: 'relative',
                height: '100vh', // Full viewport height as specified
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: '80px', // Account for nav height
                paddingBottom: '40px',
            }}
            {...props}
        >
            {/* Main Content Container */}
            <div className="hero-content" style={{
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px',
            }}>

                {/* Hero Title */}
                <h1
                    style={getTitleStyle()}
                    className="hero-title"
                >
                    {title}
                </h1>

                {/* Hero Subtitle */}
                <p
                    style={getSubtitleStyle()}
                    className="hero-subtitle"
                >
                    {subtitle}
                </p>

                {/* CTA & Arrow Group - Positioned at bottom of page */}
                <div
                    className="cta-arrow-group"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0px', // No gap between button and arrow
                        position: 'absolute',
                        bottom: '0px', // Position near bottom of viewport
                        left: '50%',
                        transform: 'translateX(-50%)', // Center horizontally
                        zIndex: 10,
                    }}
                >
                    {/* Call to Action Button */}
                    <button
                        onClick={handleCtaClick}
                        style={getCtaButtonStyle()}
                        className="hero-cta"
                        disabled={isLoading}
                        onMouseEnter={(e) => {
                            if (!isLoading) {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0px 8px 80px 20px rgba(255,255,255,0.15), 0px 6px 25px rgba(0,0,0,0.9)';
                                e.target.style.backgroundColor = '#f8f8f8';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isLoading) {
                                e.target.style.transform = 'translateY(0px)';
                                e.target.style.boxShadow = '0px 0px 60px 15px rgba(0,0,0,0.6), 0px 4px 20px rgba(0,0,0,0.8)';
                                e.target.style.backgroundColor = BRAND_COLORS.WHITE;
                            }
                        }}
                        aria-label={`${ctaText} - Start your journey with XbotiX`}
                    >
                        {isLoading ? 'Loading...' : ctaText}
                    </button>

                    {/* Decorative Scroll Indicator Arrow - Large polygon matching design */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '200px', // Larger container for the big arrow
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            marginTop: '-10px',
                        }}
                        className="hero-scroll-indicator"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0px)';
                        }}
                    >
                        {/* Polygon 1 - Large arrow with gradient matching the image */}
                        <div
                            style={{
                                position: 'absolute',
                                height: '151px',
                                width: '300px', // Much larger width to match the image
                                background: 'linear-gradient(180deg, #E21A10 0%, rgba(0, 0, 0, 0) 76.92%)',
                                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                transform: 'matrix(1, 0, 0, -1, 0, 0)',
                                zIndex: 2,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
