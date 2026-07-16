import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import {
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";

import contact from "../../data/contact";
import { motionConfig } from "../../utils/motion";

const icons = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  LeetCode: SiLeetcode,
  GeeksforGeeks: SiGeeksforgeeks,
};

function ContactSocials() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {contact.socials.map((social, index) => {
        const Icon = icons[social.name];

        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: index * 0.1 }}
            whileHover={{
              y: motionConfig.hoverLiftSmall,
              scale: motionConfig.hoverScale,
              borderColor: "rgba(139, 92, 246, 0.4)",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              boxShadow: "0 12px 24px rgba(124, 58, 237, 0.15)",
            }}
            whileTap={{ scale: motionConfig.tapScale }}
            transition={{ duration: motionConfig.normal, ease: motionConfig.ease }}
            className="social-icon flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-shadow duration-300 cursor-pointer"
          >
            <Icon className="text-2xl text-violet-400" />

            <span className="font-medium">
              {social.name}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default ContactSocials;