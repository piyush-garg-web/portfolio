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
  }, [charIndex, isDeleting, personal.name]);
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
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);
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

  // Entrance variants for cinematic reveals
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: motionConfig.staggerNormal,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
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

  const nameVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(12px)",
      letterSpacing: "-0.04em",
      textShadow: "0 0 0px rgba(124, 58, 237, 0)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      letterSpacing: "-0.015em",
      textShadow: "0 0 30px rgba(124, 58, 237, 0.15)",
      transition: {
        duration: motionConfig.slow,
        ease: motionConfig.ease,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Background depth layers */}
      <AnimatedBackground parallaxX={bgParallaxX} parallaxY={bgParallaxY} />

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

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 px-6 py-24 lg:grid-cols-2 lg:px-12"
      >
        {/* Left Column (Parallax Layered) */}
        <motion.div
          style={{ x: textParallaxX, y: textParallaxY }}
          className="flex flex-col justify-center"
        >
          <Badge variants={itemVariants}>{personal.availability}</Badge>

          <motion.h1
            variants={nameVariants}
            className="mt-6 max-w-5xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl"
          >
            {typedName}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 h-12 ml-2 bg-violet-400 align-middle"
            />
          </motion.h1>

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

        {/* Right Column */}
        <div className="flex justify-center">
          <ProfileCard mouseX={springX} mouseY={springY} />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 0.6, y: 0 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        transition={{
          delay: 1.6,
          duration: motionConfig.slow,
          ease: motionConfig.ease,
        }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold">
          Scroll
        </span>
        <div className="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1 rounded-full bg-violet-400"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;