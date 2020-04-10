import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Routes from '@/routes';
import AppBar from '@/components/app-bar/AppBar';

import '@/app/app.scss';
function App() {
    return <BrowserRouter>
        <AppBar/>
        <Routes/>  
    </BrowserRouter>;
}

export default App;