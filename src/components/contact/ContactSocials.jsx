import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import {
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";

import contact from "../../data/contact";

const icons = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  LeetCode: SiLeetcode,
  GeeksforGeeks: SiGeeksforgeeks,
};

function ContactSocials() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {contact.socials.map((social) => {
        const Icon = icons[social.name];

        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10"
          >
            <Icon className="text-2xl text-violet-400" />

            <span className="font-medium">
              {social.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default ContactSocials;