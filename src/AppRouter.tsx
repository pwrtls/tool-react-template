import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PowerToolsContextProvider } from 'powertools/context';
import { MainView } from 'views/MainView';

import './App.css';

export const AppRouter: React.FC = () => (
    <PowerToolsContextProvider showNoConnection>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<MainView />} />
            </Routes>
        </BrowserRouter>
    </PowerToolsContextProvider>
);