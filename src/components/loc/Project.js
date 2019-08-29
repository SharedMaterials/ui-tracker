import React from 'react';

const Project = (props) => {
    return(
        <React.Fragment>
            <td>{props.title}</td>
            <td>{props.descriptionLink}</td>
            <td>{
                ("" + ((props.budget - props.expenseTotal) / props.budget) * 100)
                    .substr(0, 3) + '%'
            }</td>
        </React.Fragment>
    );
}

export default Project;