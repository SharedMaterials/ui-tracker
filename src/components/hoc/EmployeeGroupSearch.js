import React, {useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup} from 'reactstrap';
import Employee from "../loc/Employee";
import AddMemberModal from "./formModals/AddMemberModal";
import TablePage from "../loc/TablePage";

export default function EmployeeGroupSearch(props){
    const [isLoading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [show, setShow] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState(false);

    const fetchEmployees = useCallback(() => {
        setLoading(true);
        setEmptyResponse(false);
        fetch(`/api/employees/search/group/${props.match.params.id}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    setEmptyResponse(true);
                    return '';
                }
            })
            .then(data => {
                setEmployees(data);
                setLoading(false);
            });
    },[props.match.params.id]);

    function toggleShow() {
        setShow(!show);
        if (!show) {
            fetchEmployees();
        }
    }

    async function remove(id) {
        if (window.confirm("Remove Member from Group?")) {
            await fetch(`/api/group/employee/${id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                let updatedEmployees = [...employees].filter(item => item.employeeId !== id);
                if (updatedEmployees && updatedEmployees.length > 0) {
                    setEmployees(updatedEmployees);
                } else {
                    setEmptyResponse(true);
                }
            })

        }
    }

    useEffect(() => fetchEmployees(),[fetchEmployees]);


    if (isLoading) {
        return <div><p>Loading...</p></div>
    }

    const employeeList = (emptyResponse) ? <tr><td colSpan="4" style={{textAlign: "center"}}>No Members found for this Group</td></tr>
        : employees.map(employee => {
            return <tr key={employee.employeeId}>
                <Employee name={employee.name} position={employee.position} email={employee.email}/>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger"
                                onClick={() => remove(employee.employeeId)}>Remove</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

    return (
        <TablePage
            titleRow={
                <>
                    <div className="float-right">
                        <Button color="success" onClick={toggleShow}>+Add Member</Button>
                    </div>
                    <div className={"float-left"}>
                        <Link to="/groups">&lsaquo; Groups</Link>
                    </div>
                    <h3 style={{textAlign: "center"}}>Members</h3>
                </>
            }
            tableHeader={
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Contact</th>
                    <th></th>
                </tr>
            }
            tableBody={employeeList}
            modal={
                <AddMemberModal
                    show={show}
                    groupId={props.match.params.id}
                    toggle={toggleShow}
                />
            }
        />
    );
}
