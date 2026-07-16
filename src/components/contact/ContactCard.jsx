import { motion } from "framer-motion";
import ContactInfo from "./ContactInfo";
import ContactSocials from "./ContactSocials";
import ContactCTA from "./ContactCTA";

import contact from "../../data/contact";
import { motionConfig } from "../../utils/motion";

function ContactCard() {
  return (
    <motion.div
      whileHover={{
        borderColor: "rgba(139, 92, 246, 0.2)",
        boxShadow: "0 25px 50px rgba(124, 58, 237, 0.1)",
      }}
      transition={{ duration: motionConfig.normal, ease: motionConfig.ease }}
      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-shadow duration-300"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.1 }}
        className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400"
      >
        Get In Touch
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.2 }}
        className="mt-4 text-4xl font-black"
      >
        Let's Build Something Amazing Together
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionConfig.normal, ease: motionConfig.ease, delay: 0.3 }}
        className="mt-5 max-w-2xl leading-8 text-gray-400"
      >
        {contact.availability}
      </motion.p>

      <div className="mt-10">
        <ContactCTA />
      </div>

      <div className="mt-12">
        <ContactInfo />
      </div>

      <div className="mt-12">
        <ContactSocials />
      </div>
    </motion.div>
  );
}

export default ContactCard;