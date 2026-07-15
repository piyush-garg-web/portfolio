import { motion } from "framer-motion";

import Button from "../common/Button";
import AnimatedBackground from "../effects/AnimatedBackground";
import GradientOrb from "../effects/GradientOrb";

import personal from "../../data/personal";

import Badge from "../ui/Badge";
import SocialLinks from "../ui/SocialLinks";
import ProfileCard from "../ui/ProfileCard";

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
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
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 px-6 py-24 lg:grid-cols-2 lg:px-12"
      >
        {/* Left Column */}
        <div>
          <Badge>{personal.availability}</Badge>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
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
          <div className="mt-12">
            <SocialLinks />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex justify-center">
          <ProfileCard />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;