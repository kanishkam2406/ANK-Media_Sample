# Sony Alpha - Luxury Editorial Camera Experience

A cinematic, editorial-style camera store landing experience inspired by Sony Alpha branding. Features an interactive **Hero Viewport**, a **Fullscreen 3D Scrubbing Inspection Showcase** powered by GSAP and Lenis, and an **Arched Terracotta Footer** with vertical typography.

---

## Key Features

### 1. Editorial Hero Viewport
- **Centered Classical Sculptural Composition:** Classical statue holding a Sony Alpha mirrorless camera with subtle parallax response to mouse movements.
- **Backdrop Typography:** Large editorial condensed headline (*CAPTURE MORE THAN MOMENTS*) anchored behind the foreground subject.
- **Interactive Badges:** Viewfinder focus card with targeting reticles, professional grade specs, and feature badges (*Latest Technology*, *Genuine Products*, *Fast Delivery*).
- **Clean Aesthetic CTAs:** Solid matte white pill action buttons with subtle hover physics and zero distracting neon glows.

### 2. Fullscreen 3D Video Scrubbing Canvas
- **Hardware-Accelerated 192-Frame Canvas Engine:** 360-degree rotational product inspection driven smoothly by page scrolling with zero motion blur.
- **Scroll Synchronization:** Synchronized using **GSAP ScrollTrigger** and **Lenis Smooth Scroll** with adaptive frame interpolation (lerp).
- **Live CAD HUD Telemetry:**
  - Real-time rotational angle tracker (000 to 360 deg).
  - Active frame counter (FRAME 001 / 192).
  - Interactive bottom scrubber progress bar with clickable checkpoints (Chassis, Sensor, AI Focus, Cinema).
- **Contextual Technical Callouts:** Glassmorphism spec cards alternating left and right with authentic camera capabilities (61.0MP sensor, 693 AF detection points, 8K cinema video).

### 3. Arched Terracotta Brand Footer
- **Terracotta Palette:** Distinctive card container with generous radius.
  - **Desktop:** Asymmetric sweeping arch.
  - **Mobile:** Symmetric arch dome with optimized padding.
- **Vertical Sony Brand Wordmark:** Dedicated vertical sidebar on the right side with complete, unclipped letter **Y** (zero descender clipping).
- **Rearranged 3-Column Content Layout:**
  - **Brand Statement:** Mission copy and copyright note.
  - **Links Columns:** Structured NAVIGATION and SUPPORT sections.
  - **Newsletter Block:** Outline pill input form with solid white Subscribe button and interactive feedback.
  - **Social Media:** Circular icon buttons for Instagram, TikTok, and Facebook.

---

## Technology Stack

- **Markup & Structure:** HTML5 (Semantic elements, accessible ARIA roles).
- **Styling:** Vanilla CSS (CSS Grid, Flexbox, custom CSS tokens, modern clamp-based typography).
- **Animation & Scrubbing:** GSAP 3.12 & ScrollTrigger.
- **Smooth Scrolling Engine:** Lenis for unified inertia across devices.
- **Rendering:** HTML5 Canvas 2D with preloaded frame caching and single-layer lerp.

---

## Project Structure

`
+-- index.html            # Main semantic HTML structure
+-- style.css             # Complete design system, layouts, and responsive queries
+-- app.js                # Canvas scrubber, Lenis engine, and newsletter handler
+-- lenis.min.js          # Standalone Lenis smooth scroll engine
+-- vercel.json           # Caching headers for high-speed frame delivery
+-- .vercelignore         # Exclusion rules for lean production deployments
+-- .gitignore            # Git exclusion rules
+-- assets/
    +-- frames/           # 192 high-definition 360 CAD rotation frames
    +-- mountain.jpg      # Viewfinder camera sample
    +-- statue-hero.png   # Hero foreground classical statue subject
`

---

## Getting Started Locally

1. **Clone the repository:**
   `ash
   git clone https://github.com/kanishkam2406/ANK-Media_Sample.git
   cd ANK-Media_Sample
   `

2. **Run with any static file server:**
   - **Using Python 3:**
     `ash
     python -m http.server 3000
     `
   - **Using Node.js:**
     `ash
     npx serve .
     `

3. **Open**
   **https://ank-media-sample-git-main-kanishka24.vercel.app/**

---


