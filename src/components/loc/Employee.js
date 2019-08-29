import React from 'react';

const Employee = (props) => {
    return (
        <React.Fragment>
            <td>{props.name}</td>
            <td>{props.position}</td>
            <td>{props.email}</td>
        </React.Fragment>
    );
};

export default Employee;