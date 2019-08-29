import React from 'react';
import {Button, ButtonGroup} from "reactstrap";

const EditDeleteButtonGroup = (props) => {
    return (
        <React.Fragment>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="success" onClick={props.editOnClick}>Edit</Button>
                    <Button size="sm" color="danger" onClick={props.deleteOnClick}>Delete</Button>
                </ButtonGroup>
            </td>
        </React.Fragment>
    );
};

export default EditDeleteButtonGroup;