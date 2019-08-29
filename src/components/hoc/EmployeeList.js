import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import Employee from '../loc/Employee';
import EditDeleteButtonGroup from "../loc/EditDeleteButtonGroup";
import EmployeeEditModal from "./formModals/EmployeeEditModal";
import TablePage from "../loc/TablePage";
import {Button} from "reactstrap";

class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            employees: [],
            emptyResponse: false,
            show: false,
            employeeId: ''
        };
        this.remove = this.remove.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.fetchEmployees = this.fetchEmployees.bind(this);
    }

    componentDidMount() {

        this.fetchEmployees()
    }

    toggleShow(id){

        this.setState({employeeId: id, show: !this.state.show});
        if(!this.state.show){
            this.fetchEmployees();
        }
    }

    fetchEmployees(){
        this.setState({isLoading: true, emptyResponse: false});

        fetch("/api/employees")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    this.setState({emptyResponse: true});
                    return '';
                }
            }).then(data => this.setState({isLoading: false, employees: data}));
    }

    async remove(id) {
        if (window.confirm("Permanently delete Employee?")) {
            await fetch(`/api/employee/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                let updatedEmployees = [...this.state.employees].filter(item => item.employeeId !== id);
                if (updatedEmployees && updatedEmployees.length > 0) {
                    this.setState({employees: updatedEmployees});
                } else {
                    this.setState({emptyResponse: true})
                }
            })
        }
    }

    render() {
        const {isLoading, employees, show, emptyResponse} = this.state;

        if (isLoading) {
            return <div><AppNavbar/><p>Loading...</p></div>
        }

        const employeeList = (emptyResponse) ? <tr>
                <td colSpan="4" align="center">No employees found</td>
            </tr>
            : employees.map(employee => {
                return <tr key={employee.employeeId}>
                    <Employee name={employee.name} position={employee.position} email={employee.email}/>
                    <EditDeleteButtonGroup editOnClick={() => this.toggleShow(employee.employeeId)}
                                           deleteOnClick={() => this.remove(employee.employeeId)}/>
                </tr>
            });

        return (
            <TablePage
                activeLink='employees'
                titleRow={
                    <React.Fragment>
                        <div className="float-right">
                            <Button color="success" onClick={() => this.toggleShow('new')}>+Add Employee</Button>
                        </div>
                        <h3 align="center">Employees</h3>
                    </React.Fragment>
                }
                tableHead={
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Contact</th>
                        <th></th>
                    </tr>
                }
                tableBody={employeeList}
                popup={
                    (show) ?
                    <EmployeeEditModal employeeId={this.state.employeeId} cancelOnClick={this.toggleShow}/>
                    : null
                }
            />
        );
    }
}

export default EmployeeList;