import navigation from "../../constants/navigation";
import Button from "../common/Button";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold tracking-tight"
        >
          Piyush<span className="text-violet-500">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-gray-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Resume Button */}
        <div className="hidden lg:block">
          <Button>Resume</Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;