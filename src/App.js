import React from 'react';
import './App.css';
import './Navbar.css';
import Home from './components/loc/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import GroupList from "./components/hoc/GroupList";
import EmployeeList from "./components/hoc/EmployeeList";
import EmployeeGroupSearch from "./components/hoc/EmployeeGroupSearch";
import ProjectList from "./components/hoc/ProjectList";
import ProjectGroupSearch from "./components/hoc/ProjectGroupSearch";


const App = (props) => {

    return (
        <Router>
            <Switch>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/groups" exact={true} component={GroupList}/>
                <Route path="/employees" exact={true} component={EmployeeList}/>
                <Route path="/projects" exact={true} component={ProjectList}/>
                <Route path="/employees/search/group/:id" exact={true} component={EmployeeGroupSearch}/>
                <Route path="/projects/search/group/:id" exact={true} component={ProjectGroupSearch}/>
            </Switch>
        </Router>
    )
};

export default App;
