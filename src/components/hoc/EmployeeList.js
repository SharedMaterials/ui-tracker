import React, {useEffect, useState} from 'react';
import Employee from '../loc/Employee';
import EditDeleteButtonGroup from "../loc/EditDeleteButtonGroup";
import EmployeeEditModal from "./formModals/EmployeeEditModal";
import TablePage from "../loc/TablePage";
import {Button} from "reactstrap";

export default function EmployeeList() {
    const [isLoading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState('new');
    const [show, setShow] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState(false);

    function fetchEmployees() {
        setLoading(true);
        setEmptyResponse(false);

        fetch("/api/employees")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    setEmptyResponse(true)
                    return '';
                }
            }).then(data => {
            setEmployees(data);
            setLoading(false);
        });
    }

    function toggleShow(id) {

        setEmployeeId(id);
        setShow(!show);
        if (!show) {
            fetchEmployees();
        }
    }

    async function remove(id) {
        if (window.confirm("Permanently delete Employee?")) {
            await fetch(`/api/employee/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let updatedEmployees = [...employees].filter(item => item.employeeId !== id);
                if (updatedEmployees && updatedEmployees.length > 0) {
                    setEmployees(updatedEmployees);
                } else {
                    setEmptyResponse(true);
                }
            })
        }
    }

    useEffect(() => fetchEmployees(), []);

    if (isLoading) {
        return <div><p>Loading...</p></div>
    }

    const employeeList = (emptyResponse) ? <tr><td colSpan="4" align="center">No employees found</td></tr>
        : employees.map(employee => {
            return <tr key={employee.employeeId}>
                <Employee name={employee.name} position={employee.position} email={employee.email}/>
                <EditDeleteButtonGroup editOnClick={() => toggleShow(employee.employeeId)}
                                       deleteOnClick={() => remove(employee.employeeId)}/>
            </tr>
        });

    return (
        <TablePage
            titleRow={
                <>
                    <div className="float-right">
                        <Button color="success" onClick={() => toggleShow('new')}>+Add Employee</Button>
                    </div>
                    <h3 align="center">Employees</h3>
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
                <EmployeeEditModal
                    show={show}
                    employeeId={employeeId}
                    toggle={() => toggleShow('new')}
                />
            }
        />
    );
}