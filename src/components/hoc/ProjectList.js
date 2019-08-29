import React, {Component} from "react";
import AppNavbar from "./AppNavbar";
import Project from "../loc/Project";
import EditDeleteButtonGroup from "../loc/EditDeleteButtonGroup";
import ProjectEditPopup from "./formModals/ProjectEditPopup";
import TablePage from "../loc/TablePage";
import {Button} from "reactstrap";


class ProjectList extends Component {

    constructor(props){

        super(props);
        this.state = {
            isLoading: true,
            projects:[],
            emptyResponse: false,
            show: false,
            projectId: ''
        };
        this.remove = this.remove.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.fetchProjects = this.fetchProjects.bind(this);
    }

    componentDidMount() {
        this.fetchProjects();
    }

    toggleShow(id){

        this.setState({projectId: id, show:!this.state.show});
        if (!this.state.show){
            this.fetchProjects();
        }
    }

    fetchProjects(){

        this.setState({isLoading: true, emptyResponse: false});

        fetch("/api/projects")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    this.setState({emptyResponse: true});
                    return '';
                }
            }).then(data => this.setState({projects: data, isLoading: false}));
    }

    async remove(id){
        if (window.confirm("Permanently delete Projects?")) {
            await fetch(`/api/project/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(() => {
                let updateProjects = [...this.state.projects].filter(item => item.projectId !== id);
                if (updateProjects && updateProjects.length > 0){
                    this.setState({projects:updateProjects});
                } else {
                    this.setState({emptyResponse: true});
                }
            })
        }
    }

    render() {
        const {isLoading, emptyResponse, show, projects} = this.state;

        if (isLoading) {
            return <div><AppNavbar/><p>Loading...</p></div>
        }

        const projectList = (emptyResponse) ? <tr><td colSpan="4" align="center">No projects found</td></tr>
            : projects.map(project => {
                return <tr key={project.projectId}>
                    <Project
                        title={project.title}
                        descriptionLink={"TODO"}
                        budget={project.budget}
                        expenseTotal={project.expenseTotal}
                    />
                    <EditDeleteButtonGroup
                        editOnClick={() => this.toggleShow(project.projectId)}
                        deleteOnClick={() => this.remove(project.projectId)}
                    />
                </tr>
            });

        return (
            <TablePage
                activeLink='projects'
                titleRow={
                    <React.Fragment>
                        <div className="float-right">
                            <Button color="success" onClick={() => this.toggleShow('new')}>+Add Project</Button>
                        </div>
                        <h3 align="center">Projects</h3>
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
                    <ProjectEditPopup
                        projectId={this.state.projectId}
                        cancelOnClick={this.toggleShow}
                    />
                    : null
                }
            />
        );
    }
}

export default ProjectList;