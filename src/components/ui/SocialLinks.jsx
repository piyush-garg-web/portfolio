import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";

import codingProfiles from "../../data/codingProfiles";

function SocialLinks({ iconSize = 24 }) {
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

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`text-gray-400 transition-all duration-300 ${link.hover}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;