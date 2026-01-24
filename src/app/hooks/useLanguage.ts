import {useState} from "react";

export const useLanguage = () => {
    const [language, setLanguage] = useState<string>(() => {
        return localStorage.getItem('language') || 'en';
    });

    const toggleLanguage = () => {
        const newLanguage = language === "es" ? "en" : "es";
        localStorage.setItem('language', newLanguage);
        setLanguage(newLanguage);
    }

    return {
        language,
        toggleLanguage,
    };
}