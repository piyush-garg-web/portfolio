import { motion } from "framer-motion";

import Section from "../layout/Section";
import ContactCard from "../contact/ContactCard";

function Contact() {
  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <ContactCard />
      </motion.div>
    </Section>
  );
}

export default Contact;