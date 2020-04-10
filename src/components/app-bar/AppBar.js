import React from 'react';
import {NavLink} from 'react-router-dom';

import '@/components/app-bar/app-bar.scss';

export default () => {
    return <nav>
        <NavLink to="/" className="nav-item" exact="true">HOME</NavLink>
        <NavLink to="/about" className="nav-item" exact="true">ABOUT</NavLink>
    </nav>;
};