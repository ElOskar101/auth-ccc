import { Label, Input, Button, LinkButton } from "../../components/ui/";
import {useNavigate} from "react-router-dom";
import {AppSelector} from "@/app/pages/auth/components/AppSelector.tsx";
import {useState} from "react";
import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";


const APPS: AppInfo[] = [
    {
        id: 'ccc',
        name: 'Control Central',
        logo: '/new-ccc-logo.svg',
    },
    {
        id: 'incidents',
        name: 'Incidents',
        logo: '/new-incidents-logo.svg',
    },
    {
        id: 'orioris',
        name: 'Oriois Playground',
        logo: '/orioris-logo.svg',
    },
];

export const Login = ()=> {

    const navigate = useNavigate();
    const [selectedApp, setSelectedApp] = useState<AppInfo | null>(APPS[0] ?? null);


    return (
        <main className="flex-1 w-full max-w-md mt-16">
            <div className="p-6 shadow-lg rounded-xl bg-white border border-gray-50">
                    <form className="max-w-sm mx-auto">
                        {selectedApp &&
                            (
                                <>
                                <img
                                    src={selectedApp.logo}
                                    alt={selectedApp.id}
                                    className='w-24 mx-auto'
                                />
                                <p className="text-center text-lg font-semibold text-gray-700 p-3 ">Login to {selectedApp.name}</p>
                                </>
                            )
                        }


                        <div className="mb-5">
                            <Label htmlFor="email">Username</Label>
                            <Input className="focus:scale-110 transition-transform" type="text" id="username"
                                   placeholder="Mi Usuario" required/>
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="password">Password</Label>
                            <Input className="focus:scale-110 transition-transform" type="password" id="password"
                                   placeholder="**************" required/>
                        </div>
                        <div className="mb-5">
                            <Button
                                onClick={() => navigate('/home')}
                                disabled={false}
                                className="hover:scale-110 transition-transform"
                                type="submit">
                                Ingresar
                            </Button>
                        </div>
                    </form>
                    <div className="flex flex-col items-center m-3 gap-3 border-t-2 pt-3 border-zinc-300">
                        <div className="flex gap-2">
                            <p className="text-gray-700">Dont you have an account?</p>
                            <LinkButton href="/reset-password">
                                Create Account
                            </LinkButton>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-gray-700">Forgot your password?</p>
                            <LinkButton href="/reset-password">
                                Reset Password
                            </LinkButton>

                        </div>
                        <div className="relative inline-block text-left group">
                            <button
                                aria-haspopup="menu"
                                aria-expanded="false"
                                className="inline-flex items-center justify-center rounded-md px-4 text-gray-700 hover:border-b-gray-700 cursor-pointer py-2 group-hover:shadow-lg group-hover:bg-gray-100 "
                            >
                                Select Language
                                <svg
                                    className="ml-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>


                            <div
                                className="absolute top-full z-10 w-44 origin-top-right shadow-lg rounded-md bg-white hidden group-hover:block"
                            >
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Spanish
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                        English
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <AppSelector
                apps={APPS}
                selectedAppId={selectedApp && selectedApp.id || ''}
                onSelect={(appInfo) => setSelectedApp(appInfo)}
            />
        </main>
    );
}