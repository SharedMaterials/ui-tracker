import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup} from 'reactstrap';
import Employee from "../loc/Employee";
import AddMemberPopup from "./formModals/AddMemberPopup";
import TablePage from "../loc/TablePage";

class EmployeeGroupSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            emptyResponse: false,
            employees: [],
            show: false
        };
        this.remove = this.remove.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.fetchEmployees = this.fetchEmployees.bind(this);
    }

    componentDidMount() {

        this.fetchEmployees();
    }

    toggleShow() {
        this.setState({show: !this.state.show});
        if (!this.state.show) {
            this.fetchEmployees();
        }
    }

    fetchEmployees() {

        this.setState({isLoading: true, emptyResponse: false});
        fetch(`/api/employees/search/group/${this.props.match.params.id}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    this.setState({emptyResponse: true});
                    return '';
                }
            })
            .then(data => this.setState({employees: data, isLoading: false}));
    }

    async remove(id) {
        if (window.confirm("Remove Member from Group?")) {
            await fetch(`/api/group/employee/${id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                    let updatedEmployees = [...this.state.employees].filter(item => item.employeeId !== id);
                    if (updatedEmployees && updatedEmployees.length > 0) {
                        this.setState({employees: updatedEmployees});
                    } else {
                        this.setState({emptyResponse: true});
                    }
            })

        }
    }

    render() {
        const {isLoading, employees, emptyResponse, show} = this.state;

        if (isLoading) {
            return <div><AppNavbar/><p>Loading...</p></div>
        }

        const employeeList = (emptyResponse) ? <tr><td colSpan="4" align="center">No Members found for this Group</td></tr>
            : employees.map(employee => {
                return <tr key={employee.employeeId}>
                    <Employee name={employee.name} position={employee.position} email={employee.email}/>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="danger"
                                    onClick={() => this.remove(employee.employeeId)}>Remove</Button>
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
                            <Button color="success" onClick={this.toggleShow}>+Add Member</Button>
                        </div>
                        <div className={"float-left"}>
                            <Link to="/groups">&lsaquo; Groups</Link>
                        </div>
                        <h3 align="center">Members</h3>
                    </React.Fragment>
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
                popup={
                    (show) ?
                        <AddMemberPopup groupId={this.props.match.params.id} cancelOnClick={this.toggleShow}/>
                        : null
                }
            />
        );
    }
}

export default EmployeeGroupSearch;