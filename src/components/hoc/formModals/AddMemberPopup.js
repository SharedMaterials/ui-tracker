import React, {Component} from 'react';
import {
    Button,
     Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    FormGroup
} from 'reactstrap';
import Popup from "../../loc/Popup";

class AddMemberPopup extends Component {

    constructor(props) {

        super(props);
        this.state = {
            groupId: this.props.groupId,
            isLoading: true,
            employees: [],
            emptyResponse: true,
            chosenEmployeeId: '',
            dropdownOpen: false,
            dropDownValue: "Select Member"
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {

        this.setState({isLoading: true});
        const url = `/api/employees/search/group/0`;
        fetch(url).then(response => {
            if (response.status === 200) {
                this.setState({emptyResponse: false});
                return response.json();
            } else {
                this.setState({emptyResponse: true});
                return [];
            }
        }).then(data => this.setState({isLoading: false, employees: data}));
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    async handleSubmit(event) {

        event.preventDefault();
        const localState = this.state;

        if (localState.chosenEmployeeId) {
            const url = `/api/group/${localState.groupId}/employee/${localState.chosenEmployeeId}`;
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            this.props.cancelOnClick();
        } else {
            alert("No valid employee selected");
        }
    }

    render() {
        const localState = this.state;

        if (localState.isLoading) {
            return <p>Loading...</p>
        }

        const employeeList = (localState.emptyResponse) ? <option disabled>No Available Employees</option>
            : localState.employees.map(employee =>
                <DropdownItem key={employee.employeeId}
                              onClick={() => {
                                  this.setState({chosenEmployeeId: employee.employeeId, dropDownValue: employee.name})
                              }}>
                    {employee.name}
                </DropdownItem>
            );

        return (
            <Popup
                header={<h3>Add Member</h3>}
                body={
                    <FormGroup align="center">
                        <Dropdown color="success" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret color="success">
                                {this.state.dropDownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Employees</DropdownItem>
                                {employeeList}
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
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

export default AddMemberPopup;