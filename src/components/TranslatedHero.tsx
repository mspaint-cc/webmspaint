"use client";

import { useLanguage, getTranslation } from "@/contexts/LanguageContext";
import WordRotate from "./ui/word-rotate";

export function TranslatedHeroSubtitle({ words }: { words: string[] }) {
  const { translations } = useLanguage();

  return (
    <div className="text-2xl flex flex-row justify-center items-center gap-2">
      <span className="font-bold">
        {getTranslation(translations, "hero.bestScript") || "The best"}
      </span>
      <WordRotate duration={2500} words={words} />
      {getTranslation(translations, "hero.script") || "script"}
    </div>
  );
}
