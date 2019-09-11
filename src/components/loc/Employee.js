import React from 'react';

export default function Employee(props) {
    return (
        <>
            <td>{props.name}</td>
            <td>{props.position}</td>
            <td>{props.email}</td>
        </>
    );
};