import {createContext, useContext, ReactNode} from "react";
import {useLanguage as useLanguageLogic} from "@/app/hooks/useLanguage.ts";

interface LanguageContextType {
    language: string;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({children}: {children: ReactNode}) => {
    const languageLogic = useLanguageLogic();
    return (
        <LanguageContext.Provider value={languageLogic}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguageContext = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguageContext should be used inside of a language Provider");
    }
    return context;
};