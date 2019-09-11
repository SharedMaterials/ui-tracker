import React from 'react';
import {
    Button,
    Form,
    FormGroup, Modal,
    ModalBody, ModalFooter,
    ModalHeader
} from 'reactstrap';

export default function ModalTemplate(props){
    return (
        <Modal isOpen={props.show} toggle={props.toggle} centered>
            <Form onSubmit={props.submit}>
                <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
                <ModalBody>
                    {props.body}
                </ModalBody>
                <ModalFooter>
                    <FormGroup className="float-right">
                        <Button color="success" type="submit">Save</Button>
                    </FormGroup>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

