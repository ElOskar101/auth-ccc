import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import "./index.css"
import './i18n';
import {App} from './App.tsx'
import React from "react";
import {LanguageProvider} from "@/app/context/LanguageContext.tsx";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <App/>
            </LanguageProvider>
        </BrowserRouter>
    </React.StrictMode>

)
