import React, {useCallback, useEffect, useState} from 'react';
import Project from "../loc/Project";
import {Button, ButtonGroup} from "reactstrap";
import TablePage from "../loc/TablePage";
import {Link} from "react-router-dom";
import AssignProjectPopup from "./formModals/AssignProjectModal";

export default function ProjectGroupSearch(props) {
    const [isLoading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [show, setShow] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState(false);

    const fetchProjects = useCallback(() => {
        setLoading(true);
        setEmptyResponse(false);

        fetch(`/api/projects/search/group/${props.match.params.id}`)
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
    },[props.match.params.id]);

    function toggleShow() {
        setShow(!show);
        if (!show) {
            fetchProjects();
        }
    }

    async function remove(id) {
        if (window.confirm("Remove this group from the project?")) {
            await fetch(`/api/group/project/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let updateProjects = [...projects].filter(item => item.projectId !== id);
                if (updateProjects && updateProjects.length > 0) {
                    setProjects(updateProjects);
                } else {
                    setEmptyResponse(true);
                }
            })
        }
    }

    useEffect(() => fetchProjects(), [fetchProjects]);

    if (isLoading) {
        return <div><p>Loading...</p></div>
    }

    const projectList = (emptyResponse) ? <tr><td colSpan="4" align="center">No Projects found for this Group</td></tr>
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
                                onClick={() => remove(project.projectId)}>Remove</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

    return (
        <TablePage
            titleRow={
                <>
                    <div className="float-right">
                        <Button color="success" onClick={toggleShow}>+Assign Project</Button>
                    </div>
                    <div className={"float-left"}>
                        <Link to="/groups">&lsaquo; Groups</Link>
                    </div>
                    <h3 align="center">Assigned</h3>
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
                <AssignProjectPopup
                    show={show}
                    groupId={props.match.params.id}
                    toggle={toggleShow}/>
            }
        />
    )
}
