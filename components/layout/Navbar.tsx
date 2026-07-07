"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import { useIsMounted } from "@/hooks/use-is-mounted";

export default function Navbar() {
  const t = useTranslations("nav");
  const mounted = useIsMounted();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/#products", label: t("products") },
    { href: "/#about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-[#D03232] text-[#FAFAFA] px-4 py-2 font-mono text-xs uppercase tracking-widest outline-none"
      >
        {t("skipToContent")}
      </a>
      <m.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-[#27272A] ${
          isScrolled
            ? "bg-[#0A0A0F]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 sm:h-20 w-full">
            <div className="flex items-center h-full">
              <Link href="/" className="flex items-center h-full border-r border-[#27272A] shrink-0 group hover:bg-[#27272A]/30 transition-colors">
                <div className="h-full aspect-square flex items-center justify-center p-2 transition-transform group-hover:scale-105">
                  <Image
                    src="/logo/clashware-small.png"
                    alt="Clashware"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-[#FAFAFA] font-mono text-xs uppercase tracking-widest hidden sm:flex items-center px-6 h-full">
                  Clashware
                </span>
              </Link>

              <div className="hidden lg:flex items-center h-full px-6 border-r border-[#27272A] gap-3 shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#D03232] animate-pulse"></div>
                <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">SYS.ONLINE</span>
              </div>
            </div>

            <div className="flex items-center h-full">
              <div className="hidden md:flex items-center h-full">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="h-full block">
                    <span className="relative h-full flex items-center px-6 font-mono text-xs uppercase tracking-widest text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors group border-l border-[#27272A]">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D03232] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="hidden md:flex items-center h-full border-l border-[#27272A]">
                <LanguageSwitcher />
              </div>

              <div className="hidden md:flex items-center h-full border-l border-[#27272A]">
                <Button
                  className="h-full bg-[#D03232] hover:bg-[#AF2828] text-[#FAFAFA] rounded-none font-mono text-xs uppercase tracking-widest px-8 transition-colors"
                  asChild
                >
                  <a href="mailto:contact@clashware.com">{t("getInTouch")}</a>
                </Button>
              </div>

              <div className="flex md:hidden items-center h-full border-l border-[#27272A] shrink-0">
                <div className="h-full border-r border-[#27272A] flex items-center">
                  <LanguageSwitcher />
                </div>
                {mounted ? (
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" className="h-full px-4 rounded-none text-[#FAFAFA] hover:bg-[#27272A] hover:text-[#FAFAFA]">
                        <Menu className="w-6 h-6" />
                        <span className="sr-only">{t("openMenu")}</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="w-full sm:w-80 bg-[#0A0A0F] border-l border-[#27272A] rounded-none p-0 flex flex-col z-[100]"
                    >
                      <SheetTitle className="sr-only">{t("menuTitle")}</SheetTitle>
                      <div className="flex flex-col h-full">
                        <div className="flex items-center h-16 sm:h-20 border-b border-[#27272A] pl-0">
                          <Link
                            href="/"
                            className="flex items-center h-full group"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="h-full aspect-square flex items-center justify-center p-1">
                              <Image
                                src="/logo/clashware-small.png"
                                alt="Clashware"
                                width={36}
                                height={36}
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                            <span className="text-[#FAFAFA] font-mono text-xs uppercase tracking-widest px-6">
                              Clashware
                            </span>
                          </Link>
                        </div>

                        <div className="flex flex-col overflow-y-auto">
                          {navLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="block w-full px-6 py-6 font-mono text-xs uppercase tracking-widest text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A]/50 border-b border-[#27272A] transition-colors">
                                {link.label}
                              </span>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-auto">
                          <Button
                            className="w-full bg-[#D03232] hover:bg-[#AF2828] text-[#FAFAFA] rounded-none font-mono text-xs uppercase tracking-widest h-16 sm:h-20"
                            asChild
                          >
                            <a
                              href="mailto:contact@clashware.com"
                              onClick={() => setIsOpen(false)}
                            >
                              {t("getInTouch")}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                ) : (
                  <Button variant="ghost" className="h-full px-4 rounded-none text-[#FAFAFA]">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">{t("openMenu")}</span>
                  </Button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </m.header>
    </>
  );
}
