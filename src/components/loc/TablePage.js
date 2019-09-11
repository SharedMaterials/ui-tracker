import React from 'react';
import {Container, Table} from 'reactstrap';

export default function TablePage(props) {
    return (
        <Container fluid>
            {props.modal}
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
    );
};