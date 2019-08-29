import React from 'react';
import AppNavbar from "../hoc/AppNavbar";
import {Container, Table} from 'reactstrap';

const TablePage = (props) => {
    return <div>
        <AppNavbar activeLink={props.activeLink}/>
        <Container fluid>
            {props.popup}
            {props.titleRow}
            <Table className="mt-4" style={{whiteSpace: 'nowrap'}} responsive>
                <thead>
                {props.tableHeader}
                </thead>
                <tbody>
                {props.tableBody}
                </tbody>
            </Table>
        </Container>
    </div>
}

export default TablePage;