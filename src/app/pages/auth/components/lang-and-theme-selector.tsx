import {RoundedTinyButton} from "@/app/components/ui/rounded-tiny-button.tsx";
import {IoMoonOutline} from "react-icons/io5";
import {MdLightMode} from "react-icons/md";
import {HiLanguage} from "react-icons/hi2";
import {useTheme} from "@/app/hooks/useTheme.ts";
import {useLanguageContext} from "@/app/context/LanguageContext.tsx";

export const LangAndThemeSelector = () => {

    const { theme, toggleTheme } = useTheme();
    const { toggleLanguage } = useLanguageContext();

    return (<div className="flex gap-4 ml-auto px-2 py-1 shadow-inner shadow-gray-300 rounded-full bg-zinc-100 dark:shadow-zinc-800 dark:bg-zinc-900">
        <RoundedTinyButton onClick={() => toggleTheme()}>
            {theme === 'light' ? <IoMoonOutline color="gray" size={22} /> : <MdLightMode color="white" size={22}/>}
        </RoundedTinyButton>
        <RoundedTinyButton onClick={() => toggleLanguage()}>
            <HiLanguage size={22} color={theme === 'light' ? 'gray' : 'white'}/>
        </RoundedTinyButton>
    </div>);
}