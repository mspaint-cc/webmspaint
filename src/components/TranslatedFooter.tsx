"use client";

import { useLanguage, getTranslation } from "@/contexts/LanguageContext";
import Image from "next/image";

export function TranslatedFooter() {
  const { translations } = useLanguage();

  return (
    <div className="px-10 py-6 w-screen flex flex-row justify-between items-center max-md:justify-center max-md:flex-col">
      <div className="px-2 py-2 flex flex-row items-center gap-2">
        <Image alt="mspaint" src="/icon.png" width={25} height={25} />
        <div>
          <p className="text-xs text-left">mspaint</p>
          <p className="text-muted-foreground text-xs">
            {getTranslation(translations, "footer.madeBy") || "Site made by upio"}
          </p>
        </div>
      </div>
      <p className="text-muted-foreground text-xs px-2 py-2 text-right max-md:text-center max-md:mt-5">
        {getTranslation(translations, "footer.disclaimer") ||
          "This software is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Roblox or Microsoft or any of its subsidiaries or its affiliates."}
      </p>
    </div>
  );
}
