"use client";

import { useLanguage, getTranslation } from "@/contexts/LanguageContext";

export function TranslatedExecutorsTitle() {
  const { translations } = useLanguage();
  return (
    <>
      {getTranslation(translations, "executors.title") || "Supporting your favorite executors"}
    </>
  );
}

export function TranslatedExecutorsMore() {
  const { translations } = useLanguage();
  return <>{getTranslation(translations, "executors.andMore") || "And many more..."}</>;
}

export function TranslatedGamesTitle({ count }: { count: number }) {
  const { translations } = useLanguage();
  const text =
    getTranslation(translations, "games.title") || "mspaint officially supports {count} games";
  return <>{text.replace("{count}", String(count))}</>;
}

export function TranslatedGamesSubtitle() {
  const { translations } = useLanguage();
  return <>{getTranslation(translations, "games.subtitle") || "quality & quantity"}</>;
}

export function TranslatedLanguagesTitle({ count }: { count: number }) {
  const { translations } = useLanguage();
  const text =
    getTranslation(translations, "languages.title") ||
    "mspaint is translated in {count} languages";
  return <>{text.replace("{count}", String(count))}</>;
}

export function TranslatedLanguagesSubtitle() {
  const { translations } = useLanguage();
  return (
    <>{getTranslation(translations, "languages.subtitle") || "accessibility done right"}</>
  );
}
