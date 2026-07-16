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
  return (
    <footer className="border-t border-white/10 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: motionConfig.slow, ease: motionConfig.ease }}
        className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center"
      >
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.1 }}
          className="text-3xl font-black"
        >
          {personal.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.2 }}
          className="text-gray-400"
        >
          {personal.role}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.3 }}
          className="flex gap-6 text-2xl"
        >
          <motion.a
            href={codingProfiles.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: motionConfig.tapScale }}
            transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
            className="social-icon transition hover:text-violet-400"
          >
            <FaGithub />
          </motion.a>

          <motion.a
            href={codingProfiles.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: motionConfig.tapScale }}
            transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
            className="social-icon transition hover:text-violet-400"
          >
            <FaLinkedin />
          </motion.a>

          <motion.a
            href={codingProfiles.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: motionConfig.tapScale }}
            transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
            className="social-icon transition hover:text-violet-400"
          >
            <SiLeetcode />
          </motion.a>

          <motion.a
            href={codingProfiles.gfg.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GeeksforGeeks"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: motionConfig.tapScale }}
            transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
            className="social-icon transition hover:text-violet-400"
          >
            <SiGeeksforgeeks />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.4 }}
          className="h-px w-full max-w-md bg-white/10"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.5 }}
          className="text-sm text-gray-500"
        >
          © 2026 Piyush Garg. All rights reserved.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.6 }}
          className="text-sm text-gray-500"
        >
          Built with React, Vite, Tailwind CSS & Framer Motion
        </motion.p>
      </motion.div>
    </footer>
  );
}

export default Footer;