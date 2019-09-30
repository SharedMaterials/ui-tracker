import React, {useEffect, useState} from "react";
import Project from "../loc/Project";
import EditDeleteButtonGroup from "../loc/EditDeleteButtonGroup";
import ProjectEditModal from "./formModals/ProjectEditModal";
import TablePage from "../loc/TablePage";
import {Button} from "reactstrap";


export default function ProjectList() {
    const [isLoading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState('new');
    const [show, setShow] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState(false);

    function fetchProjects(){
        setLoading(true);
        setEmptyResponse(false);

        fetch("/api/projects")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    setEmptyResponse(true);
                    return '';
                }
            }).then(data => {
                setProjects(data);
                setLoading(false);
        });
    }

    function toggleShow(id){
        setProjectId(id);
        setShow(!show);

        if (!show){
            fetchProjects();
        }
    }

    async function remove(id){
        if (window.confirm("Permanently delete Projects?")) {
            await fetch(`/api/project/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(() => {
                let updateProjects = [...projects].filter(item => item.projectId !== id);
                if (updateProjects && updateProjects.length > 0){
                    setProjects(updateProjects);
                } else {
                    setEmptyResponse(true);
                }
            })
        }
    }

    useEffect(() => fetchProjects(), []);

    if (isLoading) {
        return <div><p>Loading...</p></div>
    }

    const projectList = (emptyResponse) ? <tr><td colSpan="4" style={{textAlign: "center"}}>No projects found</td></tr>
        : projects.map(project => {
            return(
            <tr key={project.projectId}>
                <Project
                    title={project.title}
                    descriptionLink={"TODO"}
                    budget={project.budget}
                    expenseTotal={project.expenseTotal}
                />
                <EditDeleteButtonGroup
                    editOnClick={() => toggleShow(project.projectId)}
                    deleteOnClick={() => remove(project.projectId)}
                />
            </tr>
            );
        });

    return (
        <TablePage
            titleRow={
                <>
                    <div className="float-right">
                        <Button color="success" onClick={() => toggleShow('new')}>+Add Project</Button>
                    </div>
                    <h3 style={{textAlign: "center"}}>Projects</h3>
                </>
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
            modal={
                <ProjectEditModal
                    show={show}
                    projectId={projectId}
                    toggle={() => toggleShow('new')}
                />
            }
        />
    );
}