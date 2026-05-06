"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  locales,
  localeNames,
  localeFlags,
  type Locale,
} from "@/lib/i18n/config";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const buttonClasses =
    "h-full rounded-none border-none text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-transparent focus:bg-transparent font-mono text-xs uppercase tracking-widest px-6 flex items-center gap-2 transition-colors";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={!mounted}>
        <Button
          variant="ghost"
          className={buttonClasses}
          suppressHydrationWarning
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline" suppressHydrationWarning>
            {localeFlags[locale as Locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      {mounted && (
        <DropdownMenuContent
          align="end"
          className="bg-[#0A0A0F] border border-[#27272A] rounded-none min-w-[140px] font-mono text-xs uppercase tracking-widest"
        >
          {locales.map((loc) => (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`cursor-pointer rounded-none focus:bg-[#27272A] focus:text-[#FAFAFA] py-3 px-4 transition-colors ${
                locale === loc ? "text-[#DC2626]" : "text-[#A1A1AA]"
              }`}
            >
              <span className="mr-3 text-sm">{localeFlags[loc]}</span>
              {localeNames[loc]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
