import React, { Suspense } from 'react';
import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';

import '@/app/app.scss';
import Loading from '@/app/Loading';
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '@/app/Home'));
const About = React.lazy(() => import(/* webpackChunkName: "about" */ '@/app/About'));

function AppBar() {
    return <nav>
        <NavLink to="/" className="nav-item" exact={true}>HOME</NavLink>
        <NavLink to="/about" className="nav-item" exact={true}>ABOUT</NavLink>
    </nav>;
}

function App() {
    return <BrowserRouter>
        <AppBar/>
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route path='/' exact={true}>
                    <Home/>
                </Route>
                <Route path='/about'>
                    <About/>
                </Route>
            </Switch>
        </Suspense>
    </BrowserRouter>;
}

export default App;