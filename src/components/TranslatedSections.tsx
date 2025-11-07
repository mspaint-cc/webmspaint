"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function TranslatedExecutorsTitle() {
  const { translations } = useLanguage();
  return <>{translations?.executors?.title || "Supporting your favorite executors"}</>;
}

export function TranslatedExecutorsMore() {
  const { translations } = useLanguage();
  return <>{translations?.executors?.andMore || "And many more..."}</>;
}

export function TranslatedGamesTitle({ count }: { count: number }) {
  const { translations } = useLanguage();
  const text = translations?.games?.title || "mspaint officially supports {count} games";
  return <>{text.replace("{count}", String(count))}</>;
}

export function TranslatedGamesSubtitle() {
  const { translations } = useLanguage();
  return <>{translations?.games?.subtitle || "quality & quantity"}</>;
}

export function TranslatedLanguagesTitle({ count }: { count: number }) {
  const { translations } = useLanguage();
  const text = translations?.languages?.title || "mspaint is translated in {count} languages";
  return <>{text.replace("{count}", String(count))}</>;
}

export function TranslatedLanguagesSubtitle() {
  const { translations } = useLanguage();
  return <>{translations?.languages?.subtitle || "accessibility done right"}</>;
}
