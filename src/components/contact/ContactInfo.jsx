import { motion } from "framer-motion";
import { useState, useRef } from "react";
import contact from "../../data/contact";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import { motionConfig } from "../../utils/motion";

function ContactInfo() {
  const items = [
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: contact.location,
    },
  ];

  const [copiedIndex, setCopiedIndex] = useState(null);
  const refs = useRef([]); // Array of refs for each item

  const copy = async (text, label, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success(`${label} copied`);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error(`Failed to copy ${label}`);
    }
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isCopied = copiedIndex === index;

        return (
          <motion.div
            ref={(el) => (refs.current[index] = el)}
            key={item.label}
            initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            animate={{ y: [0, -5 + index, 0] }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 8 + index * 1.5,
                ease: "easeInOut",
              },
              duration: motionConfig.normal,
              ease: motionConfig.ease,
              delay: index * 0.15,
            }}
            whileHover={{
              scale: motionConfig.hoverScale,
              borderColor: "rgba(139, 92, 246, 0.4)",
              backgroundColor: "rgba(139, 92, 246, 0.08)",
              boxShadow: "0 12px 24px rgba(124, 58, 237, 0.15)",
            }}
            whileTap={{ scale: motionConfig.tapScale }}
            className="interactive-card gpu-layer flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl transition-[border-color,background-color,box-shadow] duration-300 cursor-default relative overflow-hidden"
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
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 6 + index,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transform -skew-x-12"
            />

            <div className="rounded-xl bg-violet-600/25 p-3 text-violet-400 relative z-10">
              <motion.div
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-xl bg-violet-600/20 blur-md pointer-events-none"
              />
              <Icon size={20} aria-hidden="true" className="relative z-10" />
            </div>

            <div className="relative z-10">
              <p className="text-sm text-gray-400">{item.label}</p>

              {item.href ? (
                <motion.button
                  onClick={() => copy(item.value, item.label, index)}
                  aria-label={`Copy ${item.label}`}
                  whileHover={{ x: 4, color: "#c4b5fd" }}
                  whileTap={{ scale: motionConfig.tapScale }}
                  transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
                  className="flex items-center gap-2 text-left text-white transition-colors"
                >
                  {item.value}
                  <motion.div
                    animate={{
                      rotate: isCopied ? 360 : 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {isCopied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                  </motion.div>
                </motion.button>
              ) : (
                <p className="text-white">{item.value}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default ContactInfo;
