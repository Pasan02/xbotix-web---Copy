# Xbotix Brand Guidelines - Quick Start Guide

## 🚀 Getting Started with Xbotix Brand

This guide helps developers and designers quickly implement Xbotix brand guidelines in your projects.

## 📋 Prerequisites

1. **Font Setup** - Add these fonts to your HTML `<head>`:
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">

<!-- Premium Fonts (if available) -->
<!-- Add PP Monument Extended and Menda fonts if licensed -->
```

2. **Import Brand Constants**:
```javascript
import { 
  BRAND_COLORS, 
  BRAND_TYPOGRAPHY, 
  BRAND_BUTTONS 
} from './src/constants/brandConstants';
```

## 🎨 Using Brand Colors

### ✅ ONLY These Colors Are Allowed:
```javascript
const colors = {
  RED: '#e21a10',    // Accent, CTAs, highlights
  BLACK: '#000000',  // Backgrounds, premium contrast
  WHITE: '#ffffff'   // Text on dark, clean sections
};
```

### ✅ Approved Combinations:
- **White text on Black background** ← *RECOMMENDED DEFAULT*
- Red text/icons on White background
- Red accents on Black backgrounds

### ❌ NEVER Use:
- Red text on Black (poor contrast)
- Any other colors
- Large red backgrounds with small text

## 🔤 Typography Rules

### Font Hierarchy (STRICT):
```css
H1, H2: PP Monument Extended (or Montserrat if unavailable)
H3: Bebas Neue
Body: Raleway
Captions: Montserrat
```

### React Component Examples:
```jsx
import { BrandText } from './components/BrandComponents';

// ✅ Correct Usage
<BrandText variant="h1">Main Headline</BrandText>
<BrandText variant="body">Body content here</BrandText>

// ❌ Wrong Usage
<BrandText variant="body" style={{fontSize: '32px'}}>Headline</BrandText>
```

## 🔘 Buttons

### Pre-built Button Components:
```jsx
import { BrandButton } from './components/BrandComponents';

// Primary CTA
<BrandButton variant="primary">Get Started</BrandButton>

// Secondary Action  
<BrandButton variant="secondary">Learn More</BrandButton>
```

### Manual Button Styles:
```css
.btn-primary {
  background: #e21a10;
  color: #ffffff;
  font-family: Montserrat;
  padding: 12px 24px;
  border-radius: 4px;
}

.btn-secondary {
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  font-family: Montserrat;
  padding: 12px 24px;
  border-radius: 4px;
}
```

## 🏗️ Layout Components

### Container Setup:
```jsx
import { BrandContainer } from './components/BrandComponents';

<BrandContainer>
  {/* Your content here - automatically gets brand styling */}
</BrandContainer>
```

### Cards:
```jsx
import { BrandCard } from './components/BrandComponents';

<BrandCard>
  <BrandCard.Title>Card Title</BrandCard.Title>
  <BrandCard.Content>Card content here</BrandCard.Content>
</BrandCard>
```

## 📝 Form Elements

### Inputs:
```jsx
import { BrandInput } from './components/BrandComponents';

<BrandInput 
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={handleChange}
/>
```

## 🔧 Tailwind CSS Integration

Your `tailwind.config.js` is already set up with brand variables:

```javascript
// Use these Tailwind classes:
'text-xbotix-red'     // #e21a10
'bg-xbotix-black'     // #000000  
'text-xbotix-white'   // #ffffff

'font-monument'       // PP Monument Extended
'font-raleway'        // Raleway
'font-montserrat'     // Montserrat
'font-bebas'          // Bebas Neue
```

## 🎯 Quick Implementation Checklist

### ✅ Before You Start:
- [ ] Fonts are loaded in HTML head
- [ ] Brand constants are imported
- [ ] Background is set to black (#000000)
- [ ] Default text color is white (#ffffff)

### ✅ For Each Component:
- [ ] Uses only approved colors (red, black, white)
- [ ] Follows typography hierarchy
- [ ] Maintains proper contrast ratios
- [ ] Uses brand spacing scale

### ✅ Before Deployment:
- [ ] No unauthorized colors present
- [ ] Headlines use Monument/Bebas fonts
- [ ] Body text uses Raleway/Montserrat
- [ ] Red used sparingly as accent only
- [ ] All text has sufficient contrast

## 🚫 Common Mistakes to Avoid

1. **Color Violations**:
   ```css
   /* ❌ WRONG */
   color: #ff0000; /* Different red */
   color: blue;    /* Unauthorized color */
   
   /* ✅ CORRECT */
   color: #e21a10; /* Xbotix red only */
   ```

2. **Font Violations**:
   ```jsx
   {/* ❌ WRONG */}
   <h1 style={{fontFamily: 'Raleway'}}>Headline</h1>
   
   {/* ✅ CORRECT */}
   <BrandText variant="h1">Headline</BrandText>
   ```

3. **Contrast Violations**:
   ```css
   /* ❌ WRONG - Poor contrast */
   .red-on-black {
     color: #e21a10;
     background: #000000;
   }
   
   /* ✅ CORRECT - Good contrast */
   .white-on-black {
     color: #ffffff;
     background: #000000;
   }
   ```

## 🔍 Validation Tools

Use the built-in validation functions:

```javascript
import { brandValidation } from './constants/brandConstants';

// Check if design follows guidelines
const errors = brandValidation.validateDesign({
  textColor: '#ffffff',
  backgroundColor: '#000000',
  font: 'Raleway'
});

if (errors.length > 0) {
  console.error('Brand violations:', errors);
}
```

## 📖 Resources

- **Full Guidelines**: See `BRAND_GUIDELINES.md`
- **Brand Showcase**: Visit `/brand-showcase` route
- **Component Library**: Check `src/components/BrandComponents.jsx`
- **Constants Reference**: See `src/constants/brandConstants.js`

## 🆘 Need Help?

1. **Not sure about a color?** → Check `BRAND_COLORS` object
2. **Typography questions?** → Use `BrandText` component
3. **Layout issues?** → Use `BrandContainer` and `BrandSection`
4. **Form styling?** → Use `BrandInput` and `BrandButton`

---

**Remember**: These guidelines are STRICT. Every design decision must adhere to the three-color palette and typography hierarchy. No exceptions.

**When in doubt**: Use the brand showcase page as your reference!
