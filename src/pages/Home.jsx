import { Layout, HeroSection } from '../components';
import Hero2 from '../components/sections/Hero2';
import { useHeroPage } from '../hooks/useHeroPage';

/**
 * Home Page Component
 * 
 * Features:
 * - Hero landing page with brand-compliant design
 * - Modular component architecture
 * - Custom hooks for state management
 * - Responsive design
 * - Accessibility features
 */
const Home = () => {
  // Custom hook for handling page interactions
  const {
    isLoading,
    handleRegisterClick,
    handleCtaClick,
    handleNavigationClick,
  } = useHeroPage();

  return (
    <Layout
      navigationProps={{
        onRegisterClick: handleRegisterClick,
        onNavigationClick: handleNavigationClick,
      }}
    >
      <HeroSection
        title="XbotiX Galactic Core"
        subtitle="The beacon has reached Earth. Will you answer the call?"
        ctaText="Begin the Journey"
        onCtaClick={handleCtaClick}
        // Pass loading state to show loading indicators if needed
        isLoading={isLoading}
      />
      <Hero2 />
    </Layout>
  );
};

export default Home;
