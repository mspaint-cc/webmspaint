"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import NumberTicker from "./magicui/number-ticker";

export function TranslatedStatsTitle({ count }: { count: number }) {
  const { translations } = useLanguage();
  const t = translations;

  return (
    <span>
      {t?.stats?.usedBy || "Used by"}{" "}
      <span className="font-bold">
        {t?.stats?.over || "over"} <NumberTicker value={count} />+ {t?.stats?.people || "people"}
      </span>
    </span>
  );
}

export function TranslatedStatsKardin() {
  const { translations } = useLanguage();
  const t = translations;

  return (
    <span className="text-muted-foreground text-lg">
      {t?.stats?.evenBy || "And even by"}{" "}
      <span className="font-bold text-white">{t?.stats?.kardin || "Kardin Hong"}</span>
    </span>
  );
}
