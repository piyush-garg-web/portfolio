import { useState } from "react";
import { Menu, X } from "lucide-react";

import Button from "../common/Button";
import Logo from "../ui/Logo";
import MobileMenu from "./MobileMenu";

import navigation from "../../data/navigation";
import personal from "../../data/personal";
import useActiveSection from "../../hooks/useActiveSection";

function Navbar() {
  const activeSection = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full">
        <nav className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-xl">
          <Logo />

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 lg:flex">
  {navigation.map((item) => {
    const active =
      activeSection === item.href.replace("#", "");

    return (
      <li key={item.href}>
        <a
          href={item.href}
          className={`relative pb-1 text-sm font-medium transition-all duration-300 ${
            active
              ? "text-violet-400"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {item.name}

          <span
            className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-violet-500 transition-all duration-300 ${
              active ? "w-full" : "w-0"
            }`}
          />
        </a>
      </li>
    );
  })}
</ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Desktop Resume Button */}
            <div className="hidden lg:block">
              <Button href={personal.resume}>
                Resume
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="text-white lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default Navbar;