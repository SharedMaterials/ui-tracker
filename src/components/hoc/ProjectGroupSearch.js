import React, {Component} from 'react';
import AppNavbar from "./AppNavbar";
import Project from "../loc/Project";
import {Button, ButtonGroup} from "reactstrap";
import TablePage from "../loc/TablePage";
import {Link} from "react-router-dom";
import AssignProjectPopup from "./formModals/AssignProjectPopup";

class ProjectGroupSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            emptyResponse: false,
            projects: [],
            show: false,
        };
        this.remove = this.remove.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.fetchProjects = this.fetchProjects.bind(this);
    }

    componentDidMount(){

        this.fetchProjects();
    }

    toggleShow() {

        this.setState({show: !this.state.show})
        if (!this.state.show) {

            this.fetchProjects();
        }
    }

    fetchProjects() {

        this.setState({isLoading: true, emptyResponse: false})

        fetch(`/api/projects/search/group/${this.props.match.params.id}`)
            .then(response => {
                if(response.status === 200) {
                    return response.json();
                } else {
                    this.setState({emptyResponse: true});
                    return '';
                }
            }).then(data => this.setState({projects: data, isLoading: false}));
    }

    async remove(id) {
        if (window.confirm("Remove this group from the project?")) {
            await fetch(`/api/group/project/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(response => {
                let updatedProjects = [...this.state.projects].filter(item => item.projectId !== id);
                if (updatedProjects && updatedProjects > 0) {
                    this.setState({projects: updatedProjects});
                } else {
                    this.setState({emptyResponse: true});
                }
            })
        }
    }

    render() {
        const {isLoading, emptyResponse, projects, show} = this.state;

        if (isLoading) {
            return <div><AppNavbar><p>Loading...</p></AppNavbar></div>
        }

        const projectList = (emptyResponse) ? <tr>
                <td colSpan="4" align="center">No Projects found for this Group</td>
            </tr>
            : projects.map(project => {
                return <tr key={project.projectId}>
                    <Project
                        title={project.title}
                        descriptionLink={"TODO"}
                        budget={project.budget}
                        expenseTotal={project.expenseTotal}
                    />
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="danger"
                                    onClick={() => this.remove(project.projectId)}>Remove</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            });

        return (
            <TablePage
                activeLink='groups'
                titleRow={
                    <React.Fragment>
                        <div className="float-right">
                            <Button color="success" onClick={this.toggleShow}>+Assign Project</Button>
                        </div>
                        <div className={"float-left"}>
                            <Link to="/groups">&lsaquo; Groups</Link>
                        </div>
                        <h3 align="center">Assigned</h3>
                    </React.Fragment>
                }
                tableHeader={
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Remaining Budget</th>
                        <th></th>
                    </tr>
                }
                tableBody={projectList}
                popup={
                    (show) ?
                        <AssignProjectPopup groupId={this.props.match.params.id} cancelOnClick={this.toggleShow}/>
                        : null
                }
            />
        )
    }
}

export default ProjectGroupSearch;