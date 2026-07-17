// Global Motion System
// Consistent animation values across the entire portfolio

export const motionConfig = {
  // Easing functions - premium, smooth feel
  ease: [0.16, 1, 0.3, 1], // Custom bezier for elegant motion
  easeOut: [0.22, 1, 0.36, 1],
  easeInOut: "easeInOut",
  
  // Durations - slow luxurious animations
  fast: 0.5,
  normal: 0.7,
  slow: 1.0,
  slower: 1.5,
  slowest: 2.2,
  
  // Spring values for natural motion
  spring: {
    stiffness: 400,
    damping: 28,
    mass: 0.8,
  },
  
  springStiff: {
    stiffness: 600,
    damping: 30,
    mass: 0.6,
  },
  
  springSoft: {
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
  
  // Stagger delays for cinematic reveals
  staggerFast: 0.08,
  staggerNormal: 0.15,
  staggerSlow: 0.12,
  
  // Opacity values for subtle effects
  glowOpacity: 0.15,
  glowHoverOpacity: 0.35,
  spotlightOpacity: 0.03,
  
  // Scale values
  hoverScale: 1.03,
  tapScale: 0.97,
  
  // Translation values
  hoverLift: -8,
  hoverLiftSmall: -4,
  
  // Blur values for cinematic reveals
  revealBlur: "8px",
  revealBlurHeavy: "12px",
};

// Reveal animation variants
export const revealVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: motionConfig.revealBlur,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.slow,
      ease: motionConfig.ease,
    },
  },
};

// Staggered container variants
export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionConfig.staggerNormal,
    },
  },
};

// Fade in variants (no Y movement)
export const fadeInVariants = {
  hidden: {
    opacity: 0,
    filter: motionConfig.revealBlur,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.normal,
      ease: motionConfig.ease,
    },
  },
};

// Scale reveal variants
export const scaleRevealVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    filter: motionConfig.revealBlur,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.slow,
      ease: motionConfig.ease,
    },
  },
};

// Slide from left variants
export const slideLeftVariants = {
  hidden: {
    opacity: 0,
    x: -60,
    filter: motionConfig.revealBlur,
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.slow,
      ease: motionConfig.ease,
    },
  },
};

// Slide from right variants
export const slideRightVariants = {
  hidden: {
    opacity: 0,
    x: 60,
    filter: motionConfig.revealBlur,
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.slow,
      ease: motionConfig.ease,
    },
  },
};

// Hover lift effect
export const hoverLift = {
  y: motionConfig.hoverLift,
  scale: motionConfig.hoverScale,
  transition: {
    duration: motionConfig.normal,
    ease: motionConfig.ease,
  },
};

// Glow effect on hover
export const glowHover = {
  boxShadow: "0 20px 40px rgba(124, 58, 237, 0.15)",
  transition: {
    duration: motionConfig.normal,
    ease: motionConfig.ease,
  },
};

// Default viewport for scroll-triggered animations
export const viewportConfig = {
  once: true,
  margin: "-40px",
};

// Parallax max movement (10px as specified)
export const parallaxMax = 10;
