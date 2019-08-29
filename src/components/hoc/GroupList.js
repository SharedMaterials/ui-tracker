import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import Group from '../loc/Group';
import EditDeleteButtonGroup from "../loc/EditDeleteButtonGroup";
import GroupEditModal from "./formModals/GroupEditModal";
import TablePage from "../loc/TablePage";
import {Button} from "reactstrap";

class GroupList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            groups: [],
            groupId: "new",
            show: false,
            emptyResponse: false
        };
        this.remove = this.remove.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);

    }

    componentDidMount() {

        this.fetchGroups()
    }

    toggleShow(id) {

        this.setState({groupId: id, show: !this.state.show});
        if(!this.state.show){
            this.fetchGroups();
        }
    }

    fetchGroups(){
        this.setState({isLoading: true, emptyResponse: false})

        fetch("/api/groups")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    this.setState({emptyResponse: true});
                    return '';
                }
            })
            .then(data => this.setState({groups: data, isLoading: false}));
    }

    async remove(id) {
        if (window.confirm("Permanently Delete Group?")) {
            await fetch(`/api/group/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                    let updateGroups = [...this.state.groups].filter(item => item.groupId !== id);
                    if (updateGroups && updateGroups.length > 0) {
                        this.setState({groups: updateGroups});
                    } else {
                        this.setState({emptyResponse: true})
                    }
            })
        }

    }

    render(){
        const {isLoading, groups, show, emptyResponse } = this.state;

        if (isLoading) {
            return <div><AppNavbar/><p>Loading...</p></div>
        }

        const groupList = (emptyResponse) ? <tr><td colSpan="4" align="center">No groups found</td></tr>
            : groups.map(group => {
            return <tr key={group.groupId}>
                <Group name={group.name} groupId={group.groupId}/>
                <EditDeleteButtonGroup editOnClick={() => this.toggleShow(group.groupId)} deleteOnClick={() => this.remove(group.groupId)}/>
            </tr>
        });

        return (
            <TablePage
                activeLink='groups'
                titleRow={
                    <React.Fragment>
                        <div className="float-right">
                            <Button color="success" onClick={() => this.toggleShow('new')}>+Add Group</Button>
                        </div>
                        <h3 align="center">Groups</h3>
                    </React.Fragment>
                }
                tableHeader={
                    <tr>
                        <th>Name</th>
                        <th>Members</th>
                        <th>Projects</th>
                        <th></th>
                    </tr>
                }
                tableBody={groupList}
                popup={
                    (show) ?
                    <GroupEditModal groupId={this.state.groupId} cancelOnClick={this.toggleShow} />
                    : null
                }
            />
        )
    }
}

export default GroupList;