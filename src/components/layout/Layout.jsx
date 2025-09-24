import Navigation from './Navigation';
import { BRAND_COLORS } from '../../constants/brandConstants';

/**
 * Main Layout Component
 * 
 * Features:
 * - Consistent layout structure
 * - Navigation integration
 * - Brand-compliant styling
 * - Responsive design
 * - Accessibility features
 */
const Layout = ({
    children,
    showNavigation = true,
    navigationProps = {},
    className = '',
    ...props
}) => {
    return (
        <div
            className={`layout-container ${className}`}
            style={{
                minHeight: '100vh',
                backgroundColor: BRAND_COLORS.BLACK,
                position: 'relative',
                overflow: 'hidden',
            }}
            {...props}
        >
            {/* Navigation */}
            {showNavigation && (
                <Navigation
                    {...navigationProps}
                />
            )}

            {/* Main Content */}
            <main
                className="layout-main"
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}
                role="main"
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;
