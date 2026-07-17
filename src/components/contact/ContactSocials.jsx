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
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            animate={{ y: [0, -4 + index, 0] }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 7 + index * 1.5,
                ease: "easeInOut",
              },
              duration: motionConfig.normal,
              ease: motionConfig.ease,
              delay: index * 0.15,
            }}
            whileHover={{
              scale: motionConfig.hoverScale,
              borderColor: "rgba(139, 92, 246, 0.45)",
              backgroundColor: "rgba(139, 92, 246, 0.15)",
              boxShadow: "0 16px 32px rgba(124, 58, 237, 0.2)",
            }}
            whileTap={{ scale: motionConfig.tapScale }}
            className="social-icon gpu-layer flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl transition-[border-color,background-color,box-shadow] duration-300 cursor-pointer relative overflow-hidden"
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-[-2px] rounded-2xl pointer-events-none"
              style={{
                background: "rgba(139, 92, 246, 0.25)",
              }}
              animate={{
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Soft moving light reflection */}
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "150%" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 5 + index,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent pointer-events-none transform -skew-x-12"
            />

            {/* Icon with breathing glow */}
            <div className="relative z-10">
              <motion.div
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-xl bg-violet-600/30 blur-md pointer-events-none"
              />
              <motion.div
                whileHover={{
                  rotate: 5,
                  scale: 1.15,
                }}
                transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
              >
                <Icon size={24} className="text-violet-400 relative z-10" />
              </motion.div>
            </div>

            <span className="font-medium text-white relative z-10">{social.name}</span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default ContactSocials;
