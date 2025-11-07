"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { NavbarItem } from "@heroui/navbar";

export function TranslatedNav({ noAccount }: { noAccount: boolean }) {
  const { translations } = useLanguage();
  const t = translations;

  return (
    <>
      <NavbarItem>
        <Link
          href="https://shop.mspaint.cc/"
          className="relative text-foreground transition-colors hover:text-neutral-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
        >
          {t?.nav?.shop || "Shop"}
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link
          href={noAccount ? "/sign-in" : "/subscription-dashboard"}
          className="relative text-foreground transition-colors hover:text-neutral-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
        >
          {noAccount ? (t?.nav?.signIn || "Sign In") : (t?.nav?.dashboard || "Dashboard")}
        </Link>
      </NavbarItem>
    </>
  );
}
