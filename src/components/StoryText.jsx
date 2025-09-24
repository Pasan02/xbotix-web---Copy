import { BRAND_COLORS, BRAND_TYPOGRAPHY, BRAND_FONTS } from '../constants/brandConstants';
import { useState, useEffect, useRef } from 'react';

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '-50px 0px',
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return { isVisible, elementRef };
};

// Custom hook for responsive design
const useResponsive = () => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const isMobile = windowSize.width <= 768;
    const isTablet = windowSize.width > 768 && windowSize.width <= 1024;
    const isDesktop = windowSize.width > 1024;

    return { isMobile, isTablet, isDesktop, windowSize };
};

/**
 * StoryText Component
 *
 * Displays story text inside a futuristic SVG frame, with scroll-triggered animation and responsive styles.
 * Accepts either a 'text' prop (string) or 'children' (custom JSX for advanced layouts).
 */
const StoryText = ({
    text = '',
    backgroundSvg = "/assets/images/story-bg.svg",
    className = "",
    style = {},
    fontSize = {
        mobile: "12px",
        tablet: "24px",
        desktop: "22px"
    },
    children,
    // When true, skip the internal IntersectionObserver and leave visibility
    // control to the parent (useful when GSAP controls reveal)
    disableScrollAnimation = false,
    ...props
}) => {
    const { isMobile, isTablet } = useResponsive();
    const scrollHook = useScrollAnimation();
    // If consumer disables the internal scroll animation, treat it as visible.
    const isVisible = disableScrollAnimation ? true : scrollHook.isVisible;
    const elementRef = scrollHook.elementRef;

    // Responsive styles
    const getResponsiveStyles = () => {
        return {
            fontSize: isMobile ? fontSize.mobile : isTablet ? fontSize.tablet : fontSize.desktop,
            containerWidth: isMobile ? '95%' : isTablet ? '85%' : '80%',
            containerHeight: isMobile ? '280px' : isTablet ? '350px' : '400px',
            padding: isMobile ? '60px 40px' : isTablet ? '80px 60px' : '100px 80px',
        };
    };

    const responsiveStyles = getResponsiveStyles();

    // Main container styles
    const containerStyles = {
        position: 'relative',
        width: responsiveStyles.containerWidth,
        height: responsiveStyles.containerHeight,
        margin: '60px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        ...style
    };

    // SVG background frame styles
    const svgFrameStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
    };

    // Text content styles (for default text prop only)
    const baseFontFamily = `${BRAND_FONTS.MONUMENT.split(',')[0]} , ${BRAND_FONTS.MENDA.split(',')[0]} , ${BRAND_TYPOGRAPHY.BODY.fontFamily}`;

    const textStyles = {
        position: 'relative',
        zIndex: 4,
        color: BRAND_COLORS.WHITE,
        // Use brand headline fonts first (Monument then Menda) then fallback to body
        fontFamily: baseFontFamily,
        fontWeight: '400',
        fontSize: responsiveStyles.fontSize,
        lineHeight: '1.2',
        textAlign: 'center',
        textShadow: '0px 2px 10px rgba(0, 0, 0, 0.8)',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        letterSpacing: '0.2px',
    };

    // Text container styles
    const textContainerStyles = {
        position: 'relative',
        zIndex: 3,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: responsiveStyles.padding,
        boxSizing: 'border-box',
    };

    return (
        <div
            ref={elementRef}
            className={`story-text-component ${className}`}
            style={containerStyles}
            {...props}
        >
            {/* SVG Frame Background */}
            <div
                className="story-svg-frame"
                style={svgFrameStyles}
                aria-hidden="true"
            />

            {/* Text Container with proper frame padding */}
            <div
                className="story-text-container"
                style={textContainerStyles}
            >
                {/* If children are provided, render them. Otherwise, render the text prop. */}
                {children ? (
                    <div className="story-text-custom" style={{ position: 'relative', zIndex: 4, width: '100%' }}>
                        {children}
                    </div>
                ) : (
                    <AutoFitText text={text} baseStyle={textStyles} maxHeight={responsiveStyles.containerHeight} />
                )}
            </div>
        </div>
    );
};

/**
 * AutoFitText
 * A small helper component that attempts to fit the supplied text inside
 * the provided maxHeight by reducing font-size in small steps. This is
 * intentionally simple and synchronous to avoid heavy layout thrashing.
 */
const AutoFitText = ({ text, baseStyle = {}, maxHeight = '400px' }) => {
    const ref = useRef(null);
    const [fontSizePx, setFontSizePx] = useState(parseInt(baseStyle.fontSize, 10) || 22);

    useEffect(() => {
        if (!ref.current) return;

        const el = ref.current;
        const maxH = typeof maxHeight === 'number' ? maxHeight : parseInt(maxHeight, 10) || 400;

        // Small loop to shrink font until it fits or reaches a minimum size
        let current = fontSizePx;
        const minSize = 10;
        const measure = () => el.scrollHeight > maxH;

        // Do a few synchronous attempts (will paint between layout passes)
        while (current > minSize) {
            el.style.fontSize = `${current}px`;
            // force reflow
            const over = el.scrollHeight > maxH || el.scrollWidth > el.clientWidth;
            if (!over) break;
            current = Math.max(minSize, Math.floor(current - Math.max(1, current * 0.06)));
        }

        setFontSizePx(current);
    }, [text, baseStyle.fontSize, maxHeight]);

    return (
        <div
            ref={ref}
            style={{
                ...baseStyle,
                fontSize: `${fontSizePx}px`,
                maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
                overflow: 'hidden',
            }}
            role="article"
            aria-label="Story text content"
        >
            {text}
        </div>
    );
};

export default StoryText;
