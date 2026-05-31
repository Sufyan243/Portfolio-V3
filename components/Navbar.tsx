import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1200px] mx-auto px-10 flex items-center justify-between h-[58px]">
        <Link href="/" className="font-display text-xl font-bold tracking-[-0.04em] text-fg">
          sufyan
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Stack", href: "/#stack" },
            { label: "Projects", href: "/#projects" },
            { label: "FAQs", href: "/#faq" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] text-fg2 tracking-[0.1em] uppercase hover:text-fg transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="text-[11px] px-5 py-[9px] border border-accent text-accent rounded-[3px] tracking-[0.08em] uppercase hover:bg-accent hover:text-background transition-all duration-200 font-mono"
        >
          Get in touch
        </a>
      </div>
    </nav>
  );
}
