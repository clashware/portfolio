"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { useIsMounted } from "@/hooks/use-is-mounted";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useIsMounted();

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
          aria-label={t("changeLanguage")}
          suppressHydrationWarning
        >
          <Globe className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline" suppressHydrationWarning>
            {(locale as Locale).toUpperCase()}
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
                locale === loc ? "text-[#D03232]" : "text-[#A1A1AA]"
              }`}
            >
              <span className="mr-3 w-6 shrink-0">{loc.toUpperCase()}</span>
              {localeNames[loc]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
