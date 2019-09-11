import React, {useState, useEffect} from 'react';
import Group from '../loc/Group';
import EditDeleteButtonGroup from "../loc/EditDeleteButtonGroup";
import GroupEditModal from "./formModals/GroupEditModal";
import TablePage from "../loc/TablePage";
import {Button} from "reactstrap";

export default function GroupList() {
    const [isLoading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [groupId, setGroupId] = useState('new');
    const [show, setShow] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState(false);

    function fetchGroups() {
        setLoading(true);
        setEmptyResponse(false);

        fetch("/api/groups")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    setEmptyResponse(true);
                    return '';
                }
            })
            .then(data => {
                setGroups(data);
                setLoading(false);
            });
    }

    function toggleShow(id) {
        setGroupId(id);
        setShow(!show);

        if (!show) {
            fetchGroups();
        }
    }

    async function remove(id) {
        if (window.confirm("Permanently Delete Group?")) {
            await fetch(`/api/group/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                let updateGroups = [...groups].filter(item => item.groupId !== id);
                if (updateGroups && updateGroups.length > 0) {
                    setGroups(updateGroups)
                } else {
                    setEmptyResponse(true);
                }
            })
        }

    }

    useEffect(() => fetchGroups(), []);

    if (isLoading) {
        return <div><p>Loading...</p></div>
    }

    const groupList = (emptyResponse) ? <tr><td colSpan="4" align="center">No groups found</td></tr>
        : groups.map(group => {
            return <tr key={group.groupId}>
                <Group name={group.name} groupId={group.groupId}/>
                <EditDeleteButtonGroup editOnClick={() => toggleShow(group.groupId)}
                                       deleteOnClick={() => remove(group.groupId)}/>
            </tr>
        });

    return (
        <TablePage
            titleRow={
                <>
                    <div className="float-right">
                        <Button color="success" onClick={() => toggleShow('new')}>+Add Group</Button>
                    </div>
                    <h3 align="center">Groups</h3>
                </>
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
            modal={
                <GroupEditModal
                    show={show}
                    groupId={groupId}
                    toggle={() => toggleShow('new')}/>
            }
        />
    )
}