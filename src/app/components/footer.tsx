import { useTranslation } from "react-i18next";
export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="w-full bg-gray-50 border-t border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-gray-50 text-gray-500 p-3 mt-3 shadow-xl text-sm rounded-xl">
            <div className="flex justify-between">
                <div className="flex self-center tracking-wide">
                    <span>© {new Date().getFullYear()} DentalRobot. </span>
                    <span>{` ${t('login.rightReserved')}`}</span>
                </div>
                <div className="flex gap-5">
                    <a >
                        <img
                            className="h-8 object-cover grayscale cursor-pointer"
                            alt="log"
                            src="/new-ccc-isolated-logo.svg"
                        />
                    </a>
                    <a >
                        <img
                            className="h-8 object-cover grayscale cursor-pointer"
                            alt="log"
                            src="/new-incidents-logo.svg"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}