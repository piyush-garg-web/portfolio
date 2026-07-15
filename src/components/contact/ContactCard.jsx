import ContactInfo from "./ContactInfo";
import ContactSocials from "./ContactSocials";
import ContactCTA from "./ContactCTA";

import contact from "../../data/contact";

function ContactCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
        Get In Touch
      </p>

      <h2 className="mt-4 text-4xl font-black">
        Let's Build Something Amazing Together
      </h2>

      <p className="mt-5 max-w-2xl leading-8 text-gray-400">
        {contact.availability}
      </p>

      <div className="mt-10">
        <ContactCTA />
      </div>

      <div className="mt-12">
        <ContactInfo />
      </div>

      <div className="mt-12">
        <ContactSocials />
      </div>
    </div>
  );
}

export default ContactCard;