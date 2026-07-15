import Button from "../common/Button";
import Logo from "../ui/Logo";

import navigation from "../../data/navigation";
import personal from "../../data/personal";

function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <nav className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-xl">
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-gray-300 transition hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href={personal.resume}>
          Resume
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;