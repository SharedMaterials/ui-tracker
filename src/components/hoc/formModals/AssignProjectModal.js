import React, {Component} from 'react';
import {
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    FormGroup
} from 'reactstrap';
import ModalTemplate from "../../loc/ModalTemplate";

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
        this.toggleDropdown = this.toggleDropdown.bind(this);
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

    toggleDropdown() {
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
            this.props.toggle();
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
            <>
                <ModalTemplate
                    show={this.props.show}
                    toggle={this.props.toggle}
                    title={"Assign Project"}
                    body={
                        <FormGroup align="center">
                            <Dropdown color="success" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
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
                    submit={this.handleSubmit}
                />
            </>
        );
    }
}

export default AssignProjectPopup;