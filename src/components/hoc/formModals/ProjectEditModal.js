import React, {Component} from 'react';
import {FormGroup, Input, Label} from "reactstrap";
import ModalTemplate from "../../loc/ModalTemplate";

class ProjectEditModal extends Component {

    emptyItem = {
        title:'',
        description:'',
        budget:''
    }

    constructor(props) {

        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        if (this.props.projectId !== 'new') {

            const project = await (await fetch(`/api/project/${this.props.projectId}`)).json();
            this.setState({item: project});
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event){

        event.preventDefault();
        if(window.confirm("Save Project?")) {
            const {item} = this.state.item;

            const {url, method} = (item.projectId !== 'new' && item.projectId !== undefined) ?
                {url:`/api/project/${item.projectId}`, method:'PUT'}:
                {url:'/api/project', method:'POST'};
            fetch(url, {
                method: method,
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(item)
            });
            this.props.toggle();
        }
    }

    render() {
        const {item} = this.state;
        let title = (item.projectId !== 'new' && item.projectId !== undefined) ? 'Edit ':'Add ';

        return(
            <>
                <ModalTemplate
                    show={this.props.show}
                    toggle={this.props.toggle}
                    title={title + "Project"}
                    body={
                        <>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="title" value={item.title||''}
                                       onChange={this.handleChange} autoComplete="title"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" id="description" value={item.description||''}
                                       onChange={this.handleChange} autoComplete="description"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="budget">Budget</Label>
                                <Input type="number" name="budget" id="budget" value={item.budget||''}
                                       onChange={this.handleChange} min="1" autoComplete="budget"/>
                            </FormGroup>
                        </>
                    }
                    submit={this.handleSubmit}
                />
            </>
        );
    }
}

export default ProjectEditModal;