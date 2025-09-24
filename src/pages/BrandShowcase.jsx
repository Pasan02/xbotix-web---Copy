import React from 'react';
import {
    BrandContainer,
    BrandSection,
    BrandText,
    BrandButton,
    BrandCard,
    BrandInput,
    BrandIcon
} from '../components/BrandComponents';
import { BRAND_COLORS } from '../constants/brandConstants';

/**
 * Brand Guidelines Showcase Page
 * 
 * This page demonstrates all the brand components and guidelines in action.
 * Use this as a reference for proper implementation of Xbotix brand standards.
 */
const BrandShowcase = () => {
    const [email, setEmail] = React.useState('');

    return (
        <BrandContainer>
            {/* Hero Section */}
            <BrandSection spacing="xl">
                <BrandText variant="h1" style={{ textAlign: 'center', marginBottom: '24px' }}>
                    Xbotix Brand Showcase
                </BrandText>
                <BrandText
                    variant="body"
                    style={{
                        textAlign: 'center',
                        maxWidth: '600px',
                        margin: '0 auto 32px',
                        opacity: 0.9
                    }}
                >
                    This showcase demonstrates the proper implementation of Xbotix brand guidelines.
                    All components strictly adhere to our three-color palette and typography hierarchy.
                </BrandText>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <BrandButton variant="primary">
                        Get Started Now
                    </BrandButton>
                    <BrandButton variant="secondary">
                        View Documentation
                    </BrandButton>
                </div>
            </BrandSection>

            {/* Color Palette Section */}
            <BrandSection spacing="lg">
                <BrandText variant="h2" style={{ marginBottom: '24px' }}>
                    Brand Color Palette
                </BrandText>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                    marginBottom: '32px'
                }}>
                    {/* Red Color */}
                    <div style={{
                        backgroundColor: BRAND_COLORS.RED,
                        padding: '32px 24px',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <BrandText variant="h3" color={BRAND_COLORS.WHITE}>
                            Xbotix Red
                        </BrandText>
                        <BrandText variant="caption" color={BRAND_COLORS.WHITE}>
                            #e21a10
                        </BrandText>
                        <BrandText variant="caption" color={BRAND_COLORS.WHITE} style={{ marginTop: '8px' }}>
                            Accent • CTAs • Icons
                        </BrandText>
                    </div>

                    {/* Black Color */}
                    <div style={{
                        backgroundColor: BRAND_COLORS.BLACK,
                        padding: '32px 24px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        border: '1px solid #333'
                    }}>
                        <BrandText variant="h3" color={BRAND_COLORS.WHITE}>
                            Xbotix Black
                        </BrandText>
                        <BrandText variant="caption" color={BRAND_COLORS.WHITE}>
                            #000000
                        </BrandText>
                        <BrandText variant="caption" color={BRAND_COLORS.WHITE} style={{ marginTop: '8px' }}>
                            Foundation • Backgrounds
                        </BrandText>
                    </div>

                    {/* White Color */}
                    <div style={{
                        backgroundColor: BRAND_COLORS.WHITE,
                        padding: '32px 24px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        border: '1px solid #333'
                    }}>
                        <BrandText variant="h3" color={BRAND_COLORS.BLACK}>
                            Xbotix White
                        </BrandText>
                        <BrandText variant="caption" color={BRAND_COLORS.BLACK}>
                            #ffffff
                        </BrandText>
                        <BrandText variant="caption" color={BRAND_COLORS.BLACK} style={{ marginTop: '8px' }}>
                            Text • Clean Backgrounds
                        </BrandText>
                    </div>
                </div>
            </BrandSection>

            {/* Typography Section */}
            <BrandSection spacing="lg">
                <BrandText variant="h2" style={{ marginBottom: '32px' }}>
                    Typography Hierarchy
                </BrandText>

                <div style={{ marginBottom: '32px' }}>
                    <BrandText variant="h1" style={{ marginBottom: '8px' }}>
                        H1 - PP Monument Extended Bold, 48px
                    </BrandText>
                    <BrandText variant="caption" style={{ opacity: 0.7, marginBottom: '24px' }}>
                        Used for: Main headlines, hero text, brand statements
                    </BrandText>

                    <BrandText variant="h2" style={{ marginBottom: '8px' }}>
                        H2 - PP Monument Extended Regular, 36px
                    </BrandText>
                    <BrandText variant="caption" style={{ opacity: 0.7, marginBottom: '24px' }}>
                        Used for: Section titles, secondary headlines
                    </BrandText>

                    <BrandText variant="h3" style={{ marginBottom: '8px' }}>
                        H3 - BEBAS NEUE REGULAR, 24PX
                    </BrandText>
                    <BrandText variant="caption" style={{ opacity: 0.7, marginBottom: '24px' }}>
                        Used for: Subsections, card titles, tertiary headlines
                    </BrandText>

                    <BrandText variant="body" style={{ marginBottom: '8px' }}>
                        Body - Raleway Regular, 16px, line-height 1.6
                    </BrandText>
                    <BrandText variant="caption" style={{ opacity: 0.7, marginBottom: '16px' }}>
                        Used for: Paragraphs, descriptions, readable content
                    </BrandText>

                    <BrandText variant="caption">
                        Caption - Montserrat Regular, 12px - Used for: Labels, small text, metadata
                    </BrandText>
                </div>
            </BrandSection>

            {/* Component Examples */}
            <BrandSection spacing="lg">
                <BrandText variant="h2" style={{ marginBottom: '32px' }}>
                    Brand Components
                </BrandText>

                {/* Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '32px'
                }}>
                    <BrandCard>
                        <BrandCard.Title>Premium Features</BrandCard.Title>
                        <BrandCard.Content>
                            Our premium features are designed with precision and innovation in mind.
                            Every detail follows our strict brand guidelines for maximum impact.
                        </BrandCard.Content>
                        <div style={{ marginTop: '16px' }}>
                            <BrandButton variant="primary">Learn More</BrandButton>
                        </div>
                    </BrandCard>

                    <BrandCard>
                        <BrandCard.Title>Tech Innovation</BrandCard.Title>
                        <BrandCard.Content>
                            Built with cutting-edge technology and futuristic design principles,
                            delivering a bold and modern user experience.
                        </BrandCard.Content>
                        <div style={{ marginTop: '16px' }}>
                            <BrandButton variant="secondary">Explore</BrandButton>
                        </div>
                    </BrandCard>

                    <BrandCard>
                        <BrandCard.Title>Brand Compliance</BrandCard.Title>
                        <BrandCard.Content>
                            Every element strictly adheres to our three-color palette and
                            typography hierarchy, ensuring consistent brand identity.
                        </BrandCard.Content>
                        <div style={{ marginTop: '16px' }}>
                            <BrandButton variant="primary">Guidelines</BrandButton>
                        </div>
                    </BrandCard>
                </div>
            </BrandSection>

            {/* Form Section */}
            <BrandSection spacing="lg">
                <BrandText variant="h2" style={{ marginBottom: '24px' }}>
                    Form Elements
                </BrandText>

                <div style={{ maxWidth: '400px' }}>
                    <BrandText variant="body" style={{ marginBottom: '16px' }}>
                        All form elements follow brand guidelines with proper contrast and typography.
                    </BrandText>

                    <div style={{ marginBottom: '16px' }}>
                        <BrandText variant="caption" style={{ display: 'block', marginBottom: '8px' }}>
                            Email Address
                        </BrandText>
                        <BrandInput
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <BrandText variant="caption" style={{ display: 'block', marginBottom: '8px' }}>
                            Full Name
                        </BrandText>
                        <BrandInput
                            type="text"
                            placeholder="Enter your full name"
                            style={{ width: '100%' }}
                        />
                    </div>

                    <BrandButton variant="primary" style={{ width: '100%' }}>
                        Submit Form
                    </BrandButton>
                </div>
            </BrandSection>

            {/* Brand Rules Section */}
            <BrandSection spacing="lg">
                <BrandText variant="h2" style={{ marginBottom: '24px' }}>
                    Critical Brand Rules
                </BrandText>

                <div style={{
                    backgroundColor: '#1a1a1a',
                    padding: '24px',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${BRAND_COLORS.RED}`
                }}>
                    <BrandText variant="h3" color={BRAND_COLORS.RED} style={{ marginBottom: '16px' }}>
                        🚫 NEVER DO THESE:
                    </BrandText>

                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        <li style={{ marginBottom: '8px' }}>
                            <BrandText variant="body">
                                Never introduce colors outside: {BRAND_COLORS.RED}, {BRAND_COLORS.BLACK}, {BRAND_COLORS.WHITE}
                            </BrandText>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <BrandText variant="body">
                                Never use Raleway or Montserrat for headlines
                            </BrandText>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <BrandText variant="body">
                                Never use red text on black backgrounds (low contrast)
                            </BrandText>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <BrandText variant="body">
                                Never compromise on the established typography hierarchy
                            </BrandText>
                        </li>
                    </ul>

                    <BrandText variant="h3" color={BRAND_COLORS.RED} style={{ marginTop: '24px', marginBottom: '16px' }}>
                        ✅ ALWAYS DO THESE:
                    </BrandText>

                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        <li style={{ marginBottom: '8px' }}>
                            <BrandText variant="body">
                                Use white text on black backgrounds (recommended default)
                            </BrandText>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <BrandText variant="body">
                                Use PP Monument Extended for impactful headlines
                            </BrandText>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <BrandText variant="body">
                                Use red sparingly as accent color for maximum impact
                            </BrandText>
                        </li>
                        <li>
                            <BrandText variant="body">
                                Maintain high contrast for accessibility and premium feel
                            </BrandText>
                        </li>
                    </ul>
                </div>
            </BrandSection>

            {/* Footer */}
            <BrandSection spacing="md">
                <div style={{
                    textAlign: 'center',
                    borderTop: '1px solid #333',
                    paddingTop: '24px'
                }}>
                    <BrandText variant="caption" style={{ opacity: 0.7 }}>
                        Xbotix Brand Guidelines Showcase • All components strictly follow brand standards
                    </BrandText>
                </div>
            </BrandSection>
        </BrandContainer>
    );
};

export default BrandShowcase;
