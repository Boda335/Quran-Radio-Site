import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INVITE_URL } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeSelector } from "@/components/ThemeSelector";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { key: "nav.home", href: "/#home" },
    { key: "nav.features", href: "/#features" },
    { key: "nav.statistics", href: "/#statistics" },
    { key: "nav.dashboard", href: "/dashboard" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-primary/10"
          : "bg-transparent",
      )}
    >
      <nav className="container flex h-16 items-center justify-between md:h-20 gap-3">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:border-primary/60">
            <Moon className="h-5 w-5 text-primary" strokeWidth={1.8} />
            <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity -z-10" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-wide text-foreground">
              Quran Radio
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70">
              Discord Bot
            </span>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSelector />
          <ThemeSelector />
          <Button asChild variant="default" className="bg-gradient-gold text-primary-foreground hover:opacity-90 hover:glow-gold font-medium">
            <a href={INVITE_URL} target="_blank" rel="noopener noreferrer">{t("nav.invite")}</a>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-1.5">
          <LanguageSelector compact />
          <ThemeSelector />
          <button
            className="rounded-lg p-2 text-foreground hover:bg-primary/10 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-primary/10 bg-background/95 backdrop-blur-xl animate-fade-in">
          <ul className="container flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full bg-gradient-gold text-primary-foreground">
                <a href={INVITE_URL} target="_blank" rel="noopener noreferrer">{t("nav.invite")}</a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
