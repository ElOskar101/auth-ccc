import {useState} from "react";

export const useLanguage = () => {
    const [language, setLanguage] = useState<string>(() => {
        return localStorage.getItem('language') || 'en';
    });

    const changeLanguage = (lang: string) => {
        localStorage.setItem('language', lang);
        setLanguage(lang);
    }

    return {
        language,
        changeLanguage,
    };
}