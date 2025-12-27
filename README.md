# Safetizen - VR Safety Training Landing Page

A modern, responsive landing page for Safetizen VR Safety Training Library built with React, Vite, and TailwindCSS.

## 🌟 Features

### Core Sections
- **Hero Section** - Engaging introduction with statistics and CTA buttons
- **VR Safety Module Library** - Filterable catalog of 21+ training modules
- **EOT Crane Simulators** - Dedicated section for crane training modules
- **Trusted By Industry Leaders** - Infinite scrolling logo carousel
- **Awards & Recognition** - 3D auto-scrolling awards carousel
- **Roadmap** - Upcoming modules and features
- **Footer** - Contact information and quick links

### Interactive Components

#### 1. Logo Carousel
- Infinite horizontal scroll animation
- 31 company logos (Tata, L&T, JSW, Indian Armed Forces, etc.)
- Smooth 120-second loop
- Grayscale to color on hover
- Fully responsive

#### 2. Awards Carousel (3D)
- 8 award certificates with titles and descriptions
- 3D perspective effect with center focus
- Auto-scroll every 5 seconds
- Pause on hover/interaction
- Navigation: arrows, pagination dots, keyboard, touch/swipe
- Smooth 800ms transitions
- Mobile responsive with adaptive card sizing

#### 3. Module Filtering
- Search by module name
- Filter by language (English, Hindi, Kannada)
- Filter by runtime (≤10 mins, >10 mins)
- Filter by category (11 categories)
- Real-time filtering with smooth UI updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
safetizen-app/
├── public/
│   ├── logos/           # Company logos (31 images)
│   └── awards/          # Award certificates (8 images)
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles & animations
│   └── main.jsx         # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Customization

### Adding/Updating Logos

1. Add logo images to `public/logos/`
2. Update the `logos` array in `App.jsx` (around line 631):

```javascript
const logos = [
  "/logos/your-logo.jpeg",
  // Add more logos
];
```

3. Update the CSS animation in `index.css` if changing logo count:

```css
@keyframes scroll {
  100% {
    transform: translateX(calc(-250px * YOUR_LOGO_COUNT));
  }
}

.animate-scroll {
  width: calc(250px * YOUR_LOGO_COUNT * 2);
}
```

### Adding/Updating Awards

1. Add award images to `public/awards/`
2. Update the `awards` array in `App.jsx` (around line 697):

```javascript
const awards = [
  {
    image: "/awards/your-award.jpg",
    title: "Award Title",
    subtitle: "Award Description"
  },
  // Add more awards
];
```

### Updating Modules

Edit the `MODULES` array in `App.jsx` (starting at line 7) to add/modify training modules.

## 🎯 Key Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **CSS Animations** - Custom keyframe animations for carousels

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+

### Mobile Optimizations
- Reduced card sizes in awards carousel
- Tighter spacing between elements
- Touch/swipe gestures enabled
- Overflow-x hidden to prevent horizontal scrolling
- Adaptive navigation and layout

## 🎭 Carousel Features

### Logo Carousel
- **Speed**: 120 seconds for full loop
- **Animation**: Linear infinite scroll
- **Hover**: Pauses animation
- **Effect**: Grayscale → Color transition

### Awards Carousel
- **Auto-scroll**: Every 5 seconds
- **Pause**: On hover, click, touch, or keyboard input
- **Resume**: Immediately on mouse leave, or after 6 seconds for manual navigation
- **3D Effect**: Center card 1.1x scale, side cards 0.9x/0.8x
- **Spacing**: ±100px (1st level), ±200px (2nd level)
- **Navigation**: 
  - Arrows (left/right)
  - Pagination dots
  - Keyboard (← →)
  - Touch/swipe (mobile)
  - Click side cards

## 🔧 Configuration

### Vite Configuration
See `vite.config.js` for build and dev server settings.

### TailwindCSS Configuration
See `tailwind.config.js` for theme customization.

### ESLint Configuration
See `eslint.config.js` for linting rules.

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Deploy to Hosting

The built files can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

## 📝 License

All rights reserved © Aatral

## 🤝 Contact

- **Website**: [aatral.io](https://aatral.io)
- **Email**: sales@aatral.io
- **Phone**: +91 7338945666 / 9830714314 / 9600067005
- **US**: +1 (669) 249-5831

## 🏢 Address

Padma Vilas, Door No. 3/233, Survey No. 34/1b  
Manapakkam Main Road, Manapakkam  
Chennai - 600125, Tamil Nadu, India
