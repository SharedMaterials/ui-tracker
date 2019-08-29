import React from 'react';
import AppNavbar from "../hoc/AppNavbar";
import {Container} from "reactstrap";

const Home = (props) => {
    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <p>This is the home page</p>
            </Container>
        </div>
    );

}

export default Home;