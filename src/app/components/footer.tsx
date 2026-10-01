import {useAppSelectorContext} from "@/app/pages/auth/context/AppSelectorContext.tsx";
import {RoundedTinyButton} from "@/app/components/ui/rounded-tiny-button.tsx";

export const Footer = () => {
    const {currentApp, setCurrentApp, APPS} = useAppSelectorContext();

    return (
        <footer className="mx-auto my-4 w-fit max-w-[calc(100%-2rem)] shrink-0 bg-white/80 border border-gray-200 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-gray-400 text-gray-500 px-5 py-3 shadow-xl text-sm rounded-full backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <div className="tracking-wider content-center">
                    <span>© {new Date().getFullYear()} </span>
                    <span>• Auth v3 </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {/*<div className="flex self-center tracking-wide">
                        <p className="">
                            {t('login.devEnv')}:
                        </p>
                    </div>*/}
                    <div className="flex gap-3">
                        {APPS.filter(app => app.type === 'dev').map(app => (
                            <RoundedTinyButton
                                className={`hover:bg-gray-200
                                ${currentApp?.id === app.id
                                    ? 'ring-2 ring-gray-400 dark:ring-blue-400'
                                    : ''}`}
                                onClick={()=> setCurrentApp(app)}
                                key={app.id}
                                aria-label={`Select ${app.name}`}
                            >
                                <img
                                    src={app.logo}
                                    alt={app.id}
                                    className="grayscale h-5 rounded-full dark:brightness-140"
                                />
                            </RoundedTinyButton>
                        ))
                        }
                    </div>
                </div>
            </div>
        </footer>
    );
}
