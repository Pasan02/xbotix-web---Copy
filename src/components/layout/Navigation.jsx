import { BRAND_COLORS } from '../../constants/brandConstants';
import { ASSETS } from '../../config/assets';

// Navigation menu items
const NAV_ITEMS = [
    { label: 'About', href: '/about', id: 'nav-about' },
    { label: 'Contact', href: '/contact', id: 'nav-contact' },
    { label: 'Gallery', href: '/gallery', id: 'nav-gallery' },
];

/**
 * Navigation Component
 * 
 * Features:
 * - Glassmorphism effect with gradient backdrop
 * - Brand-compliant logo placement
 * - Responsive navigation menu
 * - Brand-styled register button
 */
const Navigation = ({
    className = '',
    onRegisterClick,
    onNavigationClick,
    logoSrc = ASSETS.LOGOS.PRIMARY,
    ...props
}) => {
    const handleNavClick = (href, event) => {
        event.preventDefault();
        if (onNavigationClick) {
            onNavigationClick(href);
        } else {
            console.log('Navigate to:', href);
        }
    };

    const handleRegisterClick = (event) => {
        event.preventDefault();
        if (onRegisterClick) {
            onRegisterClick(event);
        } else {
            console.log('Register clicked');
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 ${className}`}
            style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
                backdropFilter: 'blur(10px)',
                height: '80px', // Reduced height for better proportions
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 2rem', // As specified in the layout breakdown
            }}
            {...props}
        >
            {/* Left side: Logo (image + text) */}
            <div className="flex items-center flex-shrink-0">
                <div
                    className="w-[175px] h-[50px] bg-center bg-cover bg-no-repeat cursor-pointer"
                    style={{ backgroundImage: `url('${logoSrc}')` }}
                    role="img"
                    aria-label="Xbotix Logo"
                    onClick={(e) => handleNavClick('/', e)}
                />
            </div>

            {/* Right side: Navigation links + Register button */}
            <div className="flex items-center space-x-8">
                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={(e) => handleNavClick(item.href, e)}
                            className="nav-link"
                            style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '500',
                                fontSize: '18px',
                                color: BRAND_COLORS.WHITE,
                                textShadow: 'rgba(0,0,0,0.8) 0px 0px 10px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                padding: '8px 12px',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = BRAND_COLORS.RED;
                                e.target.style.textShadow = `${BRAND_COLORS.RED} 0px 0px 20px`;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = BRAND_COLORS.WHITE;
                                e.target.style.textShadow = 'rgba(0,0,0,0.8) 0px 0px 10px';
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Register Button - positioned last in the nav list */}
                <button
                    onClick={handleRegisterClick}
                    className="register-btn"
                    style={{
                        backgroundColor: BRAND_COLORS.RED, // Red background as specified
                        color: BRAND_COLORS.WHITE, // White text as specified
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        padding: '12px 24px',
                        borderRadius: '50px', // Pill shape as specified
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#c41a10';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0px 6px 20px rgba(226,26,16,0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = BRAND_COLORS.RED;
                        e.target.style.transform = 'translateY(0px)';
                        e.target.style.boxShadow = '0px 4px 15px rgba(0,0,0,0.3)';
                    }}
                >
                    Register
                </button>
            </div>

            {/* Mobile Menu Button (Hidden for now, can be implemented) */}
            <div className="md:hidden">
                <button
                    className="mobile-menu-btn"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: BRAND_COLORS.WHITE,
                        fontSize: '24px',
                        cursor: 'pointer',
                    }}
                    aria-label="Open mobile menu"
                >
                    ☰
                </button>
            </div>

        </nav>
    );
};

export default Navigation;
