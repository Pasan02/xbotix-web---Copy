# Xbotix Website

A modern, premium website built with React and Vite, following strict brand guidelines for a bold, futuristic aesthetic.

## 🎨 Brand Guidelines

This project implements comprehensive **Xbotix Brand Guidelines** with strict adherence to:

- **Three-Color Palette**: Red (#e21a10), Black (#000000), White (#ffffff) - **NO OTHER COLORS PERMITTED**
- **Typography Hierarchy**: PP Monument Extended, Bebas Neue, Raleway, Montserrat
- **High-Contrast Design**: Premium, modern, tech-oriented aesthetic
- **Component-Based Architecture**: Reusable, brand-compliant components

### 📋 Quick Brand Reference

```javascript
// Only approved colors
BRAND_COLORS = {
  RED: '#e21a10',    // Accent, CTAs, highlights  
  BLACK: '#000000',  // Backgrounds, premium contrast
  WHITE: '#ffffff'   // Text on dark, clean sections
}

// Typography hierarchy
H1, H2: PP Monument Extended (headlines only)
H3: Bebas Neue (subheadings)
Body: Raleway (paragraphs, content)
Captions: Montserrat (labels, small text)
```

## 🚀 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **View Brand Showcase:**
Navigate to `/brand-showcase` to see all brand components in action.

## 📁 Project Structure

```
src/
├── components/
│   └── BrandComponents.jsx     # Brand-compliant UI components
├── constants/
│   └── brandConstants.js       # Brand colors, fonts, spacing
├── pages/
│   ├── Home.jsx
│   └── BrandShowcase.jsx      # Brand guidelines demo
└── index.css                  # Brand-aware styles
```

## 🎯 Brand Implementation

### Using Brand Components:
```jsx
import { BrandButton, BrandText, BrandCard } from './components/BrandComponents';

// ✅ Correct usage
<BrandText variant="h1">Main Headline</BrandText>
<BrandButton variant="primary">Get Started</BrandButton>
<BrandCard>
  <BrandCard.Title>Card Title</BrandCard.Title>
  <BrandCard.Content>Content here</BrandCard.Content>
</BrandCard>
```

### Brand Colors in CSS:
```css
/* Use brand CSS variables */
color: var(--xbotix-red);
background: var(--xbotix-black);
color: var(--xbotix-white);

/* Or Tailwind classes */
.text-xbotix-red
.bg-xbotix-black  
.text-xbotix-white
```

## 🚫 Critical Brand Rules

### NEVER:
- Use colors outside the approved palette
- Use body fonts (Raleway/Montserrat) for headlines
- Put red text on black backgrounds (poor contrast)
- Introduce unauthorized fonts or colors

### ALWAYS:
- Use white text on black backgrounds (recommended default)
- Follow typography hierarchy strictly
- Use red sparingly as accent color only
- Maintain high contrast for premium feel

## 📚 Documentation

- **[Brand Guidelines](./BRAND_GUIDELINES.md)** - Complete brand standards
- **[Quick Start Guide](./QUICK_START.md)** - Developer implementation guide
- **[Brand Showcase](http://localhost:5173/brand-showcase)** - Live component examples

## 🛠️ Tech Stack

- **React 18** - Component framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS (configured with brand variables)
- **Brand System** - Custom components following Xbotix guidelines

## 🔧 Configuration

Brand guidelines are configured in:
- `tailwind.config.js` - Brand colors and typography
- `src/constants/brandConstants.js` - JavaScript constants
- `src/index.css` - CSS custom properties and components

## 🎨 Design System

### Colors
- **Primary**: Black backgrounds with white text (default)
- **Accent**: Red for CTAs, highlights, and strategic attention
- **Clean**: White backgrounds with black text (minimal use)

### Typography
- **Headlines**: Bold, impactful (PP Monument Extended)
- **Body**: Clean, readable (Raleway)
- **UI**: Professional (Montserrat)
- **Display**: Strong, modern (Bebas Neue)

### Components
- **Buttons**: Primary (red) and Secondary (outline)
- **Cards**: Dark with red accents
- **Forms**: High-contrast, accessible
- **Layout**: Spacious, premium feel

## 🚨 Brand Validation

The project includes built-in validation tools:

```javascript
import { brandValidation } from './constants/brandConstants';

// Validate design compliance
const errors = brandValidation.validateDesign({
  textColor: '#ffffff',
  backgroundColor: '#000000'
});
```

## 📖 Getting Started with Brand

1. **Read the guidelines**: Start with `BRAND_GUIDELINES.md`
2. **Check the showcase**: Visit `/brand-showcase` for examples
3. **Use the components**: Import from `BrandComponents.jsx`
4. **Follow the rules**: Stick to approved colors and fonts
5. **Validate your work**: Use the validation tools

---

**Built with precision. Designed for impact. Xbotix 2025.**