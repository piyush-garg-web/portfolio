import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import {
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";

import personal from "../../data/personal";
import codingProfiles from "../../data/codingProfiles";

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <h3 className="text-3xl font-black">
          {personal.name}
        </h3>

        <p className="text-gray-400">
          {personal.role}
        </p>

        <div className="flex gap-6 text-2xl">
          <a
            href={codingProfiles.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-violet-400"
          >
            <FaGithub />
          </a>

          <a
            href={codingProfiles.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-violet-400"
          >
            <FaLinkedin />
          </a>

          <a
            href={codingProfiles.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-violet-400"
          >
            <SiLeetcode />
          </a>

          <a
            href={codingProfiles.gfg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-violet-400"
          >
            <SiGeeksforgeeks />
          </a>
        </div>

        <div className="h-px w-full max-w-md bg-white/10" />

        <p className="text-sm text-gray-500">
          © 2026 Piyush Garg. All rights reserved.
        </p>

        <p className="text-sm text-gray-500">
          Built with React, Vite, Tailwind CSS & Framer Motion
        </p>
      </div>
    </footer>
  );
}

export default Footer;