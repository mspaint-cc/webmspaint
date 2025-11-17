"use client";

import { useLanguage, getTranslation } from "@/contexts/LanguageContext";
import NumberTicker from "./magicui/number-ticker";

export function TranslatedStatsTitle({ count }: { count: number }) {
  const { translations } = useLanguage();

  return (
    <span>
      {getTranslation(translations, "stats.usedBy") || "Used by"}{" "}
      <span className="font-bold">
        {getTranslation(translations, "stats.over") || "over"} <NumberTicker value={count} />+{" "}
        {getTranslation(translations, "stats.people") || "people"}
      </span>
    </span>
  );
}

export function TranslatedStatsKardin() {
  const { translations } = useLanguage();

  return (
    <span className="text-muted-foreground text-lg">
      {getTranslation(translations, "stats.evenBy") || "And even by"}{" "}
      <span className="font-bold text-white">
        {getTranslation(translations, "stats.kardin") || "Kardin Hong"}
      </span>
    </span>
  );
}
