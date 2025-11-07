"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "de" | "pt" | "fr" | "ro";

interface Translations {
    [key: string]: string | Translations | undefined;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translations: Record<string, unknown>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");
    const [translations, setTranslations] = useState<Record<string, unknown>>({});

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang && ["en", "de", "pt", "fr", "ro"].includes(savedLang)) {
            setLanguageState(savedLang);
        }
    }, []);

    useEffect(() => {
        fetch(`/lang/${language}.json`)
            .then((res) => res.json())
            .then((data) => setTranslations(data))
            .catch((err) => console.error("Failed to load translations:", err));
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

export function getTranslation(translations: Record<string, unknown>, path: string): string {
    const keys = path.split(".");
    let value: unknown = translations;

    for (const key of keys) {
        if (value && typeof value === "object" && key in value) {
            value = (value as Record<string, unknown>)[key];
        } else {
            return "";
        }
    }

    return typeof value === "string" ? value : "";
}
