import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";

import codingProfiles from "../../data/codingProfiles";
import { motionConfig } from "../../utils/motion";

function SocialLinks({ iconSize = 24, ...props }) {
  const links = [
    {
      icon: <FaGithub size={iconSize} />,
      url: codingProfiles.github.url,
      hover: "hover:text-white",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin size={iconSize} />,
      url: codingProfiles.linkedin.url,
      hover: "hover:text-[#0A66C2]",
      label: "LinkedIn",
    },
    {
      icon: <SiLeetcode size={iconSize} />,
      url: codingProfiles.leetcode.url,
      hover: "hover:text-[#FFA116]",
      label: "LeetCode",
    },
    {
      icon: <SiGeeksforgeeks size={iconSize} />,
      url: codingProfiles.gfg.url,
      hover: "hover:text-[#2F8D46]",
      label: "GeeksforGeeks",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionConfig.staggerFast,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: motionConfig.normal,
        ease: motionConfig.ease,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      className="flex items-center gap-6"
      {...props}
    >
      {links.map((link) => (
        <motion.a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          variants={itemVariants}
          whileHover={{
            scale: 1.15,
            y: motionConfig.hoverLiftSmall,
          }}
          whileTap={{ scale: motionConfig.tapScale }}
          transition={{
            duration: motionConfig.fast,
            ease: motionConfig.ease,
          }}
          className={`social-icon text-gray-400 transition-colors duration-300 ${link.hover}`}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}

export default SocialLinks;