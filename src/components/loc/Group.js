import React from 'react';
import {Link} from "react-router-dom";

export default function Group(props){
    return (
        <>
            <td>{props.name}</td>
            <td><Link to={"/employees/search/group/" + props.groupId}>View</Link></td>
            <td><Link to={"/projects/search/group/" + props.groupId}>View</Link></td>
        </>
    );
};
