import React, { Component } from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import Popup from "../../loc/Popup";

class EmployeeEditModal extends Component {

    emptyItem = {
        name: '',
        position: '',
        email:''
    }

    constructor(props) {

        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){

        if (this.props.employeeId !== 'new') {
            const employee = await( await fetch(`/api/employee/${this.props.employeeId}`)).json();
            this.setState({item: employee})
        }
    }

    handleChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {

        event.preventDefault();
        if (window.confirm("Save Employee?")) {
            const {item} = this.state;

            const {url, method} = (item.employeeId !== 'new' && item.employeeId !== undefined) ?
                {url: `/api/employee/${item.employeeId}`, method: 'PUT'} :
                {url: '/api/employee', method: 'POST'};

            await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
            this.props.cancelOnClick();
        }
    }

    render(){

        const {item} = this.state;
        let title = <h3>{(item.employeeId !== 'new' && item.employeeId !== undefined) ? "Edit " : "Add "}Employee</h3>

        return (
            <Popup
                header={title}
                body={
                    <React.Fragment>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={item.name || ''}
                                   onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="position">Position</Label>
                            <Input type="text" name="position" id="position" value={item.position || ''}
                                   onChange={this.handleChange} autoComplete="position"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" value={item.email || ''}
                                   onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                    </React.Fragment>
                }
                footer={
                    <FormGroup className="float-right">
                        <Button color="success" type="submit">Save</Button>
                        {' '}
                        <Button color="secondary" onClick={this.props.cancelOnClick}>Cancel</Button>
                    </FormGroup>
                }
                handleSubmit={this.handleSubmit}
                />
        );
    }
}

export default EmployeeEditModal;