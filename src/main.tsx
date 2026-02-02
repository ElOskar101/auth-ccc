import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import "./index.css"
import './i18n';
import {App} from './App.tsx'
import React from "react";
import {LanguageProvider} from "@/app/context/LanguageContext.tsx";
import {AppSelectorProvider} from "@/app/pages/context/AppSelectorContext.tsx";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <AppSelectorProvider>
                    <App/>
                </AppSelectorProvider>
            </LanguageProvider>
        </BrowserRouter>
    </React.StrictMode>

)
