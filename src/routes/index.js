
import React, { Suspense } from 'react';
import {Switch, Route} from 'react-router-dom';

import Loading from "@/pages/loading/Loading.js";
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '@/pages/home/Home'));
const About = React.lazy(() => import(/* webpackChunkName: "about" */ '@/pages/about/About'));

export default () => {
    return (
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
    );
};