import React from 'react';
import './App.css';
import './Navbar.css';
import AppNavbar from "./components/hoc/AppNavbar";

const App = (props) => {

    return (
        <>
            <AppNavbar/>
            {props.children}
        </>
    );
};

export default App;
