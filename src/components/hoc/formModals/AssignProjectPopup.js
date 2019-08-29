import React, {Component} from 'react';
import {
    Button,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    FormGroup
} from 'reactstrap';
import Popup from "../../loc/Popup";

class AssignProjectPopup extends Component {

    constructor(props) {

        super(props);
        this.state = {
            groupId: this.props.groupId,
            isLoading: true,
            projects: [],
            emptyResponse: true,
            chosenProjectId: '',
            dropdownOpen: false,
            dropDownValue: "Select Project"
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {

        this.setState({isLoading: true});
        const url = `/api/projects/search/group/0`;
        fetch(url).then(response => {
            if (response.status === 200) {
                this.setState({emptyResponse: false});
                return response.json();
            } else {
                this.setState({emptyResponse: true});
                return [];
            }
        }).then(data => this.setState({isLoading: false, projects: data}));
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    async handleSubmit(event) {

        event.preventDefault();
        const localState = this.state;

        if (localState.chosenProjectId) {
            const url = `/api/group/${localState.groupId}/project/${localState.chosenProjectId}`;
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            this.props.cancelOnClick();
        } else {
            alert("No unassigned projects selected");
        }
    }

    render() {
        const localState = this.state;

        if (localState.isLoading) {
            return <p>Loading...</p>
        }

        const projectList = (localState.emptyResponse) ? <option disabled>No Available Projects</option>
            : localState.projects.map(project =>
                <DropdownItem key={project.projectId}
                              onClick={() => {
                                  this.setState({chosenProjectId: project.projectId, dropDownValue: project.title})
                              }}>
                    {project.title}
                </DropdownItem>
            );

        return (
            <Popup
                header={<h3>Assign Project</h3>}
                body={
                    <FormGroup align="center">
                        <Dropdown color="success" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret color="success">
                                {this.state.dropDownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Projects</DropdownItem>
                                {projectList}
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

export default AssignProjectPopup;