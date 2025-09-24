import Hero3DModel from '../Hero3DModel';

/**
 * Hero Section Component
 * 
 * Features:
 * - Transparent background for clear 3D model visibility
 * - 3D GLTF model positioned at the top
 * - Full viewport height
 * - Responsive design
 */
const Hero2 = ({
    className = '',
    ...props
}) => {
    // Transparent background for clear 3D model visibility
    const backgroundStyle = {
        background: 'transparent', // Transparent background
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align to top
        position: 'relative',
        overflow: 'hidden',
    };

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
            {/* 3D Model at Top */}
            <Hero3DModel
                style={{
                    position: 'absolute',
                    top: '5%', // Moved closer to top
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%', // Increased width for better visibility
                    height: '60%', // Increased height
                    zIndex: 5,
                    opacity: 1, // Full visibility
                }}
                modelScale={0.7} // Reduced from 3 to zoom out
                autoRotate={true}
                enableControls={false}
            />
        </section>
    );
};

export default Hero2;
