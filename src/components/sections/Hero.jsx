import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";

import Button from "../common/Button";
import AnimatedBackground from "../effects/AnimatedBackground";
import GradientOrb from "../effects/GradientOrb";

import personal from "../../data/personal";
import codingProfiles from "../../data/codingProfiles";

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background */}
      <AnimatedBackground />

      <GradientOrb
        color="bg-violet-600"
        className="-left-40 top-20 h-[350px] w-[350px]"
      />

      <GradientOrb
        color="bg-blue-600"
        className="bottom-10 right-0 h-[300px] w-[300px]"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-8 lg:px-12"
      >
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
          {personal.availability}
        </p>

        <h1 className="max-w-5xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
          {personal.name}
        </h1>

        <h2 className="mt-6 text-2xl font-semibold text-gray-300 sm:text-3xl">
          {personal.role}
        </h2>

        <p className="mt-3 text-lg text-violet-400">
          {personal.tagline}
        </p>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
          {personal.description}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="#projects">
            {personal.cta.primary}
          </Button>

          <Button
            href={personal.resume}
            variant="secondary"
          >
            {personal.cta.secondary}
          </Button>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex items-center gap-6 text-2xl text-gray-400">
          <a
            href={codingProfiles.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-white"
          >
            <FaGithub />
          </a>

          <a
            href={codingProfiles.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[#0A66C2]"
          >
            <FaLinkedin />
          </a>

          <a
            href={codingProfiles.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[#FFA116]"
          >
            <SiLeetcode />
          </a>

          <a
            href={codingProfiles.gfg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[#2F8D46]"
          >
            <SiGeeksforgeeks />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;