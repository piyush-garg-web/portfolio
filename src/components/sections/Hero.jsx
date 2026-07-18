import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

import Button from "../common/Button";
import AnimatedBackground from "../effects/AnimatedBackground";
import GradientOrb from "../effects/GradientOrb";

import personal from "../../data/personal";

import Badge from "../ui/Badge";
import SocialLinks from "../ui/SocialLinks";
import ProfileCard from "../ui/ProfileCard";
import { motionConfig, parallaxMax } from "../../utils/motion";

function Hero() {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const [typedName, setTypedName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    const fullName = personal.name;
    
    const typing = setTimeout(() => {
      if (!isDeleting && charIndex < fullName.length) {
        setTypedName(fullName.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedName(fullName.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (charIndex === fullName.length && !isDeleting) {
        setIsDeleting(true);
        setTimeout(() => setIsDeleting(false), 2000); // Pause before deleting
      } else if (charIndex === 0 && isDeleting) {
        setIsDeleting(false);
      }
    }, isDeleting ? 100 : 150); // Typing speed

    return () => clearTimeout(typing);
  }, [charIndex, isDeleting]);
  // Capture cursor position normalized coordinates [-1, 1]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth cursor springs for premium dampened responsiveness
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 });

  // Monitor scroll progress to fade out the scroll indicator
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (event.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Transform coordinates for subtle multi-layered depth (parallax - max 10px)
  const bgParallaxX = useTransform(springX, [-1, 1], [-parallaxMax, parallaxMax]);
  const bgParallaxY = useTransform(springY, [-1, 1], [-parallaxMax, parallaxMax]);

  const orb1ParallaxX = useTransform(springX, [-1, 1], [-20, 20]);
  const orb1ParallaxY = useTransform(springY, [-1, 1], [-20, 20]);

  const orb2ParallaxX = useTransform(springX, [-1, 1], [20, -20]);
  const orb2ParallaxY = useTransform(springY, [-1, 1], [20, -20]);

  const textParallaxX = useTransform(springX, [-1, 1], [-4, 4]);
  const textParallaxY = useTransform(springY, [-1, 1], [-4, 4]);

  // Entrance variants for cinematic reveals with better stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.16,
      },
    },
  };

  const itemVariants = {
    hidden: isDesktop
      ? { opacity: 0, x: -24, scale: 0.985, filter: "blur(8px)" }
      : { opacity: 0, y: 26, scale: 0.985, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.15,
        ease: motionConfig.ease,
      },
    },
  };

  const leftColumnVariants = {
    hidden: isDesktop ? { opacity: 0, x: -72 } : {},
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: motionConfig.ease,
      },
    },
  };

  const rightColumnVariants = {
    hidden: isDesktop
      ? { opacity: 0, x: 72, scale: 0.985, filter: "blur(8px)" }
      : { opacity: 0, y: 26, scale: 0.985, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: motionConfig.ease,
      },
    },
  };

  const nameVariants = {
    hidden: {
      opacity: 0,
      y: 32,
      scale: 0.98,
      filter: "blur(10px)",
      letterSpacing: "-0.04em",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      letterSpacing: "-0.015em",
      transition: {
        duration: 1.35,
        ease: motionConfig.ease,
      },
    },
  };

  // Floating particles configuration
  const particles = [
    { size: 8, delay: 0, duration: 8, x: "10%", y: "20%" },
    { size: 6, delay: 1, duration: 10, x: "85%", y: "30%" },
    { size: 10, delay: 2, duration: 12, x: "25%", y: "75%" },
    { size: 7, delay: 0.5, duration: 9, x: "70%", y: "80%" },
    { size: 9, delay: 1.5, duration: 11, x: "50%", y: "15%" },
    { size: 5, delay: 2.5, duration: 7, x: "15%", y: "60%" },
    { size: 8, delay: 0.8, duration: 13, x: "90%", y: "55%" },
    { size: 6, delay: 1.8, duration: 8, x: "40%", y: "45%" },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Background depth layers */}
      <AnimatedBackground parallaxX={bgParallaxX} parallaxY={bgParallaxY} />

      {/* Large soft animated violet glow behind left content */}
      <motion.div
        className="absolute -left-60 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/40 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient orbs */}
      <GradientOrb
        color="bg-violet-600"
        className="-left-40 top-20 h-[350px] w-[350px]"
        parallaxX={orb1ParallaxX}
        parallaxY={orb1ParallaxY}
        delay={0}
      />

      <GradientOrb
        color="bg-blue-600"
        className="bottom-10 right-0 h-[300px] w-[300px]"
        parallaxX={orb2ParallaxX}
        parallaxY={orb2ParallaxY}
        delay={0.4}
      />

      {/* Floating blurred particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-sm"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 px-6 py-24 lg:grid-cols-2 lg:px-12"
      >
        {/* Left Column (Parallax Layered) */}
        <motion.div
          variants={leftColumnVariants}
        >
          <motion.div
          style={{ x: textParallaxX, y: textParallaxY }}
          className="flex flex-col justify-center relative"
        >
          {/* Badge */}
          <Badge variants={itemVariants}>{personal.availability}</Badge>

          {/* Name with glow and shimmer */}
          <motion.div variants={nameVariants} className="relative mt-6">
            {/* Glow behind name */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/10 to-transparent blur-2xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <h1 className="relative max-w-5xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent relative">
                {typedName}
                {/* Animated shimmer */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  {typedName}
                </motion.span>
              </span>
              {/* Improved blinking cursor */}
              <motion.span
                animate={{
                  opacity: [1, 0, 1],
                  boxShadow: [
                    "0 0 0px rgba(139, 92, 246, 0)",
                    "0 0 15px rgba(139, 92, 246, 0.8)",
                    "0 0 0px rgba(139, 92, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block w-1.5 h-14 ml-2 bg-violet-400 align-middle rounded-full"
              />
            </h1>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-6 text-2xl font-semibold text-gray-300 sm:text-3xl"
          >
            {personal.role}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-3 text-lg text-violet-400 font-medium"
          >
            {personal.tagline}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-lg leading-8 text-gray-400"
          >
            {personal.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href="#projects">{personal.cta.primary}</Button>

            <Button href={personal.resume} variant="secondary">
              {personal.cta.secondary}
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="mt-12">
            <SocialLinks />
          </motion.div>
        </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          variants={rightColumnVariants}
          className="flex justify-center"
        >
          <ProfileCard mouseX={springX} mouseY={springY} />
        </motion.div>
      </motion.div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />

      {/* Premium scroll indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        transition={{
          delay: 2,
          duration: 1,
          ease: motionConfig.ease,
        }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer pointer-events-auto"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
          Discover
        </span>
        <div className="relative flex h-12 w-6 items-start justify-center rounded-full border border-white/25 p-1.5 backdrop-blur-sm">
          {/* Animated glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-violet-500/30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            animate={{
              y: [0, 14, 0],
              opacity: [0.4, 1, 0.4],
              boxShadow: [
                "0 0 0px rgba(139, 92, 246, 0)",
                "0 0 10px rgba(139, 92, 246, 0.8)",
                "0 0 0px rgba(139, 92, 246, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-2 w-2 rounded-full bg-violet-400"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
