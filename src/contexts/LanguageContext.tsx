"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "de" | "pt" | "fr" | "ro";

interface Translations {
    [key: string]: any;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");
    const [translations, setTranslations] = useState<Translations>({});

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
