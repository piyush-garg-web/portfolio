import { motion } from "framer-motion";
import contact from "../../data/contact";
import { Mail, Phone, MapPin, Copy } from "lucide-react";
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

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error(`Failed to copy ${label}`);
    }
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: index * 0.1 }}
            whileHover={{
              y: motionConfig.hoverLiftSmall,
              scale: motionConfig.hoverScale,
              borderColor: "rgba(139, 92, 246, 0.3)",
              backgroundColor: "rgba(139, 92, 246, 0.05)",
              boxShadow: "0 12px 24px rgba(124, 58, 237, 0.1)",
            }}
            className="interactive-card flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-shadow duration-300 cursor-default"
          >
            <div className="rounded-xl bg-violet-600/20 p-3 text-violet-400">
              <Icon size={20} aria-hidden="true" />
            </div>

            <div>
              <p className="text-sm text-gray-400">
                {item.label}
              </p>

              {item.href ? (
             <motion.button
  onClick={() => copy(item.value, item.label)}
  aria-label={`Copy ${item.label}`}
  whileHover={{ x: 3 }}
  whileTap={{ scale: motionConfig.tapScale }}
  transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
  className="flex items-center gap-2 text-left text-white transition hover:text-violet-400"
>
  {item.value}

  <Copy size={15} aria-hidden="true" />
</motion.button>
              ) : (
                <p className="text-white">
                  {item.value}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default ContactInfo;