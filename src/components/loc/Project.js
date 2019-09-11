import React from 'react';

export default function Project(props){
    return(
        <>
            <td>{props.title}</td>
            <td>{props.descriptionLink}</td>
            <td>{
                ("" + ((props.budget - props.expenseTotal) / props.budget) * 100)
                    .substr(0, 3) + '%'
            }</td>
        </>
    );
}