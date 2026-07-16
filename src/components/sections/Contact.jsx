import { motion } from "framer-motion";

import Section from "../layout/Section";
import ContactCard from "../contact/ContactCard";
import { revealVariants, viewportConfig } from "../../utils/motion";

function Contact() {
  return (
    <Section id="contact">
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <ContactCard />
      </motion.div>
    </Section>
  );
}

export default Contact;