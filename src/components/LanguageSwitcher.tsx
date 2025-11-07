"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";

const languages = [
  { code: "en", name: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "de", name: "Deutsch", flag: "https://flagcdn.com/w40/de.png" },
  { code: "pt", name: "Português", flag: "https://flagcdn.com/w40/br.png" },
  { code: "fr", name: "Français", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "ro", name: "Română", flag: "https://flagcdn.com/w40/ro.png" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];
  const otherLanguages = languages.filter((lang) => lang.code !== language);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-full mb-2 flex flex-col gap-2 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border rounded-lg p-2 shadow-lg">
            {otherLanguages.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setLanguage(lang.code as any);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 justify-start hover:bg-primary/10"
              >
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  width={20}
                  height={15}
                  className="rounded-sm"
                />
                <span className="text-sm">{lang.name}</span>
              </Button>
            ))}
          </div>
        )}

        <Button
          variant="default"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 shadow-lg"
        >
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            width={20}
            height={15}
            className="rounded-sm"
          />
          <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
        </Button>
      </div>
    </div>
  );
}
