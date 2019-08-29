import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export default class AppNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return <Navbar dark expand="md" width="100%">
            <NavbarBrand tag={Link} to="/">Tracker</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/groups" className={(this.props.activeLink === 'groups')?'active':''}>Groups</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/employees" className={(this.props.activeLink === 'employees')?'active':''}>Employees</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/projects" className={(this.props.activeLink === 'projects')?'active':''}>Projects</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}