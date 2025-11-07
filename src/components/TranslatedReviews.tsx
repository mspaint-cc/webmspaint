"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Highlighter } from "./magicui/highlighter";

export function TranslatedReviewsTitle() {
  const { translations } = useLanguage();
  const t = translations;

  return (
    <>
      {t?.reviews?.title || "Here's what people say about"}{" "}
      <Highlighter action="underline" color="#FF9800" isView>
        mspaint
      </Highlighter>
    </>
  );
}
