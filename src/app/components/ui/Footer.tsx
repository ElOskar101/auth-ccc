import { useTranslation } from "react-i18next";
export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="w-full bg-gray-50 dark:bg-zinc-800 dark:text-gray-50 text-gray-500 p-6 shadow-lg text-sm rounded-lg">
            <div className="flex justify-between">
                <div className="flex self-center tracking-wide">
                    <span>© {new Date().getFullYear()} DentalRobot. </span>
                    <span>{` ${t('login.rightReserved')}`}</span>
                </div>
                <div className="">
                    <a >
                        Dev Control Central
                    </a>
                    <a >Dev Incidents
                    </a>
                </div>
            </div>
        </footer>
    );
}