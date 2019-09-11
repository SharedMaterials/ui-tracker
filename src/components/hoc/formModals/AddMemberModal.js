import React, {useEffect, useState} from 'react';
import {
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    FormGroup
} from 'reactstrap';
import ModalTemplate from "../../loc/ModalTemplate";

export default function AddMemberModal(props) {
    const [isLoading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [emptyResponse, setEmptyResponse] = useState(true);
    const [chosenEmployeeId, setChosenEmployee] = useState('');
    const [dropdownOpen, setOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState("Select Member");

    function toggleDropdown() {
        setOpen(!dropdownOpen);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (chosenEmployeeId) {
            const url = `/api/group/${props.groupId}/employee/${chosenEmployeeId}`;
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            props.toggle();
        } else {
            alert("No valid employee selected");
        }
    }

    useEffect(() => {
        setLoading(true);

        const url = `/api/employees/search/group/0`;
        fetch(url).then(response => {
            if (response.status === 200) {
                setEmptyResponse(false);
                return response.json();
            } else {
                setEmptyResponse(true);
                return [];
            }
        }).then(data => {
            setEmployees(data);
            setLoading(false);
        });
    },[]);

    const employeeList = (emptyResponse) ? <option disabled>No Available Employees</option>
        : employees.map(employee =>
            <DropdownItem key={employee.employeeId}
                          onClick={() => {
                              setChosenEmployee(employee.employeeId);
                              setDropDownValue(employee.name);
                          }}>
                {employee.name}
            </DropdownItem>
        );

    return (
        <>
            <ModalTemplate
                show={props.show}
                toggle={props.toggle}
                title={"Add Member"}
                body={
                    <FormGroup align="center">
                        <Dropdown color="success" isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle caret color="success">
                                {dropDownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Employees</DropdownItem>
                                {employeeList}
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
                }
                submit={handleSubmit}
            />
        </>
    );
}

