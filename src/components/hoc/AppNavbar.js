import React, {useState} from 'react';
import { Link, NavLink as RRNavLink } from 'react-router-dom';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';

export default function AppNavbar(props) {
    const [isOpen, setOpen] = useState(false);

    function toggle() {
        setOpen(!isOpen);
    }

    return(
    <div>
        <Navbar dark expand="md" width="100%">
            <NavbarBrand tag={Link} to="/">Tracker</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/groups">Groups</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/employees">Employees</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/projects">Projects</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        {props.children}
    </div>);
}