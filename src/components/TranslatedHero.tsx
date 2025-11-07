"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import WordRotate from "./ui/word-rotate";

export function TranslatedHeroSubtitle({ words }: { words: string[] }) {
  const { translations } = useLanguage();
  const t = translations;

  return (
    <div className="text-2xl flex flex-row justify-center items-center gap-2">
      <span className="font-bold">{t?.hero?.bestScript || "The best"}</span>
      <WordRotate duration={2500} words={words} />
      {t?.hero?.script || "script"}
    </div>
  );
}
