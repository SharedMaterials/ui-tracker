import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import GroupList from "./components/hoc/GroupList";
import EmployeeList from "./components/hoc/EmployeeList";
import ProjectList from "./components/hoc/ProjectList";
import EmployeeGroupSearch from "./components/hoc/EmployeeGroupSearch";
import ProjectGroupSearch from "./components/hoc/ProjectGroupSearch";
import Home from "./components/loc/Home";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/groups" component={GroupList}/>
                <Route exact path="/employees" component={EmployeeList}/>
                <Route exact path="/projects" component={ProjectList}/>
                <Route path="/employees/search/group/:id" component={EmployeeGroupSearch}/>
                <Route path="/projects/search/group/:id" component={ProjectGroupSearch}/>
            </Switch>
        </App>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
