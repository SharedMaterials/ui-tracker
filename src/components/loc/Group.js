import React from 'react';
import {Link} from "react-router-dom";

const Group = (props) => {
    return (
        <React.Fragment>
            <td>{props.name}</td>
            <td><Link to={"/employees/search/group/" + props.groupId}>View</Link></td>
            <td><Link to={"/projects/search/group/" + props.groupId}>View</Link></td>
        </React.Fragment>
    );
};

export default Group;