import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import {
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";

import personal from "../../data/personal";
import codingProfiles from "../../data/codingProfiles";
import { motionConfig } from "../../utils/motion";

function Footer() {
  const particles = [
    { size: 6, delay: 0, duration: 10, x: "15%", y: "25%" },
    { size: 5, delay: 2, duration: 12, x: "85%", y: "35%" },
    { size: 7, delay: 1.5, duration: 9, x: "45%", y: "75%" },
  ];

  return (
    <footer className="relative border-t border-white/10 py-12 overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/20 blur-sm pointer-events-none"
          style={{
            left: particle.x, top: particle.y, width: particle.size, height: particle.size }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -20, 18, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Glass effect background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none" />

      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: motionConfig.staggerFast } }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center"
      >
        {/* Name with glow */}
        <motion.div className="relative mb-2">
          {/* Ambient glow behind name */}
          <motion.div
            className="absolute -inset-6 rounded-full bg-violet-600/30 blur-3xl pointer-events-none"
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
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: motionConfig.normal,
                  ease: motionConfig.ease,
                },
              },
            }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            }}
            className="text-4xl font-black text-white relative z-10"
          >
            {personal.name}
          </motion.h3>
        </motion.div>

        {/* Role */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: motionConfig.normal,
                ease: motionConfig.ease,
              },
            },
          }}
          className="text-gray-400 relative z-10"
        >
          {personal.role}
        </motion.p>

        {/* Social links */}
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: motionConfig.staggerFast } }
          }}
          className="flex gap-6 text-2xl relative z-10"
        >
          {[
            { name: "GitHub", icon: FaGithub, url: codingProfiles.github.url },
            { name: "LinkedIn", icon: FaLinkedin, url: codingProfiles.linkedin.url },
            { name: "LeetCode", icon: SiLeetcode, url: codingProfiles.leetcode.url },
            { name: "GeeksforGeeks", icon: SiGeeksforgeeks, url: codingProfiles.gfg.url },
          ].map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                variants={{
                  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
                  visible: {
                    opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: motionConfig.normal, ease: motionConfig.ease },
                  },
                }}
                whileHover={{
                  y: -6,
                  scale: 1.25,
                  rotate: 5,
                  color: "#c4b5fd",
                }}
                whileTap={{
                  scale: motionConfig.tapScale,
                }}
                transition={{
                  duration: motionConfig.fast,
                  ease: motionConfig.ease,
                }}
                className="social-icon transition relative"
              >
                {/* Glow behind icon */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-2 rounded-full bg-violet-600/30 blur-md pointer-events-none"
                />
                <Icon className="relative z-10" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Divider with animated gradient */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: {
              opacity: 1, scaleX: 1,
              transition: { duration: motionConfig.normal, ease: motionConfig.ease },
            },
          }}
          className="h-px w-full max-w-md relative z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Copyright text */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
            visible: {
              opacity: 1,
              y: 0, filter: "blur(0px)",
              transition: { duration: motionConfig.normal, ease: motionConfig.ease },
            },
          }}
          whileHover={{
            textShadow: "0 0 12px rgba(196, 181, 253, 0.6)",
            color: "#d1d5db",
          }}
          className="text-sm text-gray-500 relative z-10 transition-colors duration-300"
        >
          © 2026 {personal.name}. All rights reserved.
        </motion.p>

        {/* Built with */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
            visible: {
              opacity: 1, y: 0, filter: "blur(0px)",
              transition: { duration: motionConfig.normal, ease: motionConfig.ease },
            },
          }}
          whileHover={{
            textShadow: "0 0 12px rgba(196, 181, 253, 0.5)",
            color: "#9ca3af",
          }}
          className="text-sm text-gray-500 relative z-10 transition-colors duration-300"
        >
          Built with React, Vite, Tailwind CSS & Framer Motion
        </motion.p>
      </motion.div>

      {/* Moving light reflection across footer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 4,
        }}
      />
    </footer>
  );
}

export default Footer;
