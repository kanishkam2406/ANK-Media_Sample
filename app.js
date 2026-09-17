// Sony Alpha Hero Landing Page & 3D Interactive Canvas Scrubbing Showcase

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Hero Navigation & Micro-Interactions
     ========================================================================== */
  const navPills = document.querySelectorAll('.nav-pill');
  navPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      navPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Subtle Parallax Tilt on Statue and CTA during desktop mouse movement
  const heroStage = document.querySelector('.hero-stage');
  const statueImg = document.getElementById('statue-hero-img');
  const rightCta = document.querySelector('.hero-right-cta');
  const bgGrid = document.querySelector('.bg-diagonal-grid');

  if (heroStage && window.innerWidth > 1024) {
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { innerWidth, innerHeight } = window;
          const mouseXRatio = (e.clientX / innerWidth) - 0.5;
          const mouseYRatio = (e.clientY / innerHeight) - 0.5;

          if (statueImg) {
            const statueMoveX = mouseXRatio * -12;
            const statueMoveY = mouseYRatio * -8;
            statueImg.style.transform = `translate3d(${statueMoveX}px, ${statueMoveY}px, 0)`;
          }

          if (bgGrid) {
            const gridMoveX = mouseXRatio * 15;
            const gridMoveY = mouseYRatio * 15;
            bgGrid.style.transform = `translate3d(${gridMoveX}px, ${gridMoveY}px, 0)`;
          }

          if (rightCta) {
            const ctaMoveX = mouseXRatio * 6;
            const ctaMoveY = mouseYRatio * 6;
            rightCta.style.transform = `translate3d(${ctaMoveX}px, ${ctaMoveY}px, 0)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Clean CTA button ripple / click feedback
  const buttons = document.querySelectorAll('.btn-clean, .btn-neon, .newsletter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'scale(0.97)';
    });
    btn.addEventListener('mouseup', () => {
      btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // Newsletter Form Handler
  const newsletterForm = document.getElementById('footer-newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail ? newsletterEmail.value.trim() : '';
      if (email) {
        if (newsletterFeedback) {
          newsletterFeedback.textContent = 'Thank you for subscribing to Sony Alpha stories and updates.';
          newsletterFeedback.style.color = '#ffffff';
        }
        if (newsletterEmail) {
          newsletterEmail.value = '';
        }
      }
    });
  }

  /* ==========================================================================
     2. Lenis Smooth Scrolling Engine
     ========================================================================== */
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like exponential decay
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }

    if (typeof gsap !== 'undefined') {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Smooth scroll prompt click
  const scrollPrompt = document.querySelector('.hero-scroll-prompt');
  if (scrollPrompt) {
    scrollPrompt.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('showcase-3d');
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  /* ==========================================================================
     3. Hardware-Accelerated 3D Canvas Frame Scrubbing Engine (192 Frames)
     ========================================================================== */
  const canvas = document.getElementById('camera-3d-canvas');
  const rotationVal = document.getElementById('hud-rotation-val');
  const scrubberFill = document.getElementById('scrubber-progress');
  const showcaseSection = document.getElementById('showcase-3d');
  
  const callouts = [
    document.getElementById('callout-1'),
    document.getElementById('callout-2'),
    document.getElementById('callout-3'),
    document.getElementById('callout-4')
  ];
  const scrubberNodes = [
    document.getElementById('node-1'),
    document.getElementById('node-2'),
    document.getElementById('node-3'),
    document.getElementById('node-4')
  ];

  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  // Set crisp image smoothing quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 192 high-definition 24fps frames for ultra-smooth rotation
  const totalFrames = 192;
  const frameImages = new Array(totalFrames);
  let loadedCount = 0;
  let lastDrawnIndex = -1;

  // Preload all 192 sequential 3D camera frames
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    const frameNum = String(i).padStart(4, '0');
    img.src = `assets/frames/frame_${frameNum}.jpg`;
    img.onload = () => {
      loadedCount++;
      // Draw initial frame as soon as frame 1 is ready
      if (i === 1 && lastDrawnIndex === -1) {
        drawFrame(0);
      }
    };
    frameImages[i - 1] = img;
  }

  function drawFrame(index) {
    const img = frameImages[index];
    if (img && img.complete && img.naturalWidth > 0) {
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      lastDrawnIndex = index;
      return true;
    }

    // If target frame is still loading and canvas has never been drawn, show closest available frame
    if (lastDrawnIndex === -1) {
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = frameImages[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          ctx.drawImage(prev, 0, 0, canvas.width, canvas.height);
          break;
        }
        const next = frameImages[index + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          ctx.drawImage(next, 0, 0, canvas.width, canvas.height);
          break;
        }
      }
    }

    if (img) {
      img.onload = () => {
        const currentTarget = Math.min(totalFrames - 1, Math.max(0, Math.round(currentProgress * (totalFrames - 1))));
        if (Math.abs(currentTarget - index) <= 1 || lastDrawnIndex === -1) {
          drawFrame(index);
        }
      };
    }
    return false;
  }

  // Smooth Interpolation State
  let targetProgress = 0;
  let currentProgress = 0;

  function renderScrubLoop() {
    // Responsive, jitter-free lerp (0.28 factor eliminates motion lag while remaining fluid)
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.0002) {
      currentProgress += diff * 0.28;
    } else {
      currentProgress = targetProgress;
    }

    // Determine target frame index (0 to 191)
    const frameIdx = Math.min(totalFrames - 1, Math.max(0, Math.round(currentProgress * (totalFrames - 1))));

    // Render frame to canvas if index changed
    if (frameIdx !== lastDrawnIndex) {
      drawFrame(frameIdx);
    }

    // Update HUD 360° CAD Axis Degree Display (000° to 360°)
    if (rotationVal) {
      const degrees = Math.min(360, Math.max(0, Math.round(currentProgress * 360)));
      rotationVal.textContent = String(degrees).padStart(3, '0');
    }

    // Update Bottom HUD Progress Bar
    if (scrubberFill) {
      scrubberFill.style.width = `${(currentProgress * 100).toFixed(1)}%`;
    }

    // Contextual Callout States (Alternating Left & Right):
    // Stage 1 (Left - Chassis Build): 0.05 - 0.27
    // Stage 2 (Right - Sensor & Optical): 0.29 - 0.53
    // Stage 3 (Left - AI Focus & Tracking): 0.55 - 0.77
    // Stage 4 (Right - Cinema & CTA): 0.79 - 1.00
    const activeStep = 
      currentProgress >= 0.05 && currentProgress < 0.27 ? 0 :
      currentProgress >= 0.29 && currentProgress < 0.53 ? 1 :
      currentProgress >= 0.55 && currentProgress < 0.77 ? 2 :
      currentProgress >= 0.79 ? 3 : -1;

    callouts.forEach((card, idx) => {
      if (card) {
        if (idx === activeStep) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      }
    });

    // Update Scrubber Active Node
    scrubberNodes.forEach((node, idx) => {
      if (node) {
        if (idx === activeStep || (activeStep === -1 && idx === 0)) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      }
    });

    requestAnimationFrame(renderScrubLoop);
  }

  // Start continuous render loop
  requestAnimationFrame(renderScrubLoop);

  /* --------------------------------------------------------------------------
     4. GSAP ScrollTrigger Integration with Lenis
     -------------------------------------------------------------------------- */
  function initGSAPScrollTrigger() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && showcaseSection) {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: '#showcase-3d',
        start: 'top top',
        end: '+=350%',
        pin: '.showcase-sticky-frame',
        pinSpacing: true,
        // Since Lenis already smooths scroll velocity, scrub 0.1 gives immediate sync without lag
        scrub: 0.1,
        onUpdate: (self) => {
          targetProgress = self.progress;
        }
      });
      return true;
    }
    return false;
  }

  // Fallback native scroll listener if GSAP isn't available
  function initNativeScrollFallback() {
    if (!showcaseSection) return;

    window.addEventListener('scroll', () => {
      const rect = showcaseSection.getBoundingClientRect();
      const scrollDist = showcaseSection.offsetHeight - window.innerHeight;
      if (scrollDist > 0) {
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / scrollDist));
        targetProgress = p;
      }
    }, { passive: true });
  }

  if (!initGSAPScrollTrigger()) {
    initNativeScrollFallback();
  }

  /* --------------------------------------------------------------------------
     5. Clickable HUD Scrubber Navigation (Jump directly to 3D angle)
     -------------------------------------------------------------------------- */
  const stepTargetProgress = [0.15, 0.40, 0.65, 0.90];
  scrubberNodes.forEach((node, idx) => {
    if (node && showcaseSection) {
      node.style.cursor = 'pointer';
      node.addEventListener('click', () => {
        const targetP = stepTargetProgress[idx];
        const scrollDist = showcaseSection.offsetHeight - window.innerHeight;
        const targetScroll = showcaseSection.offsetTop + (targetP * scrollDist);
        if (lenis) {
          lenis.scrollTo(targetScroll, { duration: 1.2 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      });
    }
  });

  /* --------------------------------------------------------------------------
     6. URL Test / Verification Hook (?progress=0.15 or ?view=showcase or ?scroll=1800)
     -------------------------------------------------------------------------- */
  const urlParams = new URLSearchParams(window.location.search);
  const progressParam = urlParams.get('progress');
  const viewParam = urlParams.get('view');
  const scrollParam = urlParams.get('scroll');

  if (scrollParam !== null) {
    const s = parseInt(scrollParam, 10);
    setTimeout(() => {
      if (lenis) lenis.scrollTo(s, { immediate: true });
      window.scrollTo(0, s);
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
    }, 150);
  } else if (viewParam === 'showcase' && showcaseSection) {
    const p = progressParam !== null ? parseFloat(progressParam) : 0.15;
    targetProgress = p;
    currentProgress = p;
    setTimeout(() => {
      const scrollDist = showcaseSection.offsetHeight - window.innerHeight;
      const targetScroll = showcaseSection.offsetTop + (p * scrollDist);
      if (lenis) lenis.scrollTo(targetScroll, { immediate: true });
      window.scrollTo(0, targetScroll);
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
    }, 150);
  } else if (progressParam !== null) {
    targetProgress = parseFloat(progressParam);
    currentProgress = targetProgress;
  }
});
