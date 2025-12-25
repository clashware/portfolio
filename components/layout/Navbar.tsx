"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#products", label: t("products") },
    { href: "#about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-obsidian/95 backdrop-blur-xl border-b border-edge"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo/clashware-icon.png"
              alt="Clashware"
              width={32}
              height={32}
              className="rounded-lg w-8 h-8 object-contain"
            />
            <span className="text-snow font-semibold text-lg hidden sm:block">
              Clashware
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-zinc hover:text-snow transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-zinc hover:text-snow transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA + Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              size="sm"
              className="gradient-brand text-snow hover:opacity-90 transition-opacity rounded-lg"
              asChild
            >
              <a href="mailto:contact@clashware.com">{t("getInTouch")}</a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            {mounted ? (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-snow">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-obsidian border-edge"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-between mb-8">
                    <Link
                      href="/"
                      className="flex items-center gap-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src="/logo/clashware-icon.png"
                        alt="Clashware"
                        width={32}
                        height={32}
                        className="rounded-lg w-8 h-8 object-contain"
                      />
                      <span className="text-snow font-semibold text-lg">
                        Clashware
                      </span>
                    </Link>
                  </div>

                  {/* Mobile Links */}
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) =>
                      link.href.startsWith("#") ? (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="text-zinc hover:text-snow transition-colors text-lg font-medium py-2"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="text-zinc hover:text-snow transition-colors text-lg font-medium py-2"
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </div>

                  {/* Mobile CTA */}
                  <div className="mt-auto pt-8">
                    <Button
                      className="w-full gradient-brand text-snow hover:opacity-90 transition-opacity rounded-lg py-6"
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
              <Button variant="ghost" size="icon" className="text-snow">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
