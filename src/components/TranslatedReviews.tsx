"use client";

import { useLanguage, getTranslation } from "@/contexts/LanguageContext";
import { Highlighter } from "./magicui/highlighter";

export function TranslatedReviewsTitle() {
  const { translations } = useLanguage();

  return (
    <>
      {getTranslation(translations, "reviews.title") || "Here's what people say about"}{" "}
      <Highlighter action="underline" color="#FF9800" isView>
        mspaint
      </Highlighter>
    </>
  );
}
