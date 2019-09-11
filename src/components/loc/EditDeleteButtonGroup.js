import React from 'react';
import {Button, ButtonGroup} from "reactstrap";

export default function EditDeleteButtonGroup(props){
    return (
        <>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="success" onClick={props.editOnClick}>Edit</Button>
                    <Button size="sm" color="danger" onClick={props.deleteOnClick}>Delete</Button>
                </ButtonGroup>
            </td>
        </>
    );
};