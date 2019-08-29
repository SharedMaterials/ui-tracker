import React, {Component} from 'react';
import {Button, FormGroup, Input, Label} from 'reactstrap';
import Popup from "../../loc/Popup";

class GroupEditPopup extends Component {

    emptyItem = {
        name: ''
    }

    constructor(props) {

        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.groupId !== 'new') {
            const group = await (await fetch(`/api/group/${this.props.groupId}`)).json();
            this.setState({item: group});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (window.confirm("Save Group?")) {
            const {item} = this.state;

            const {url, method} = (item.groupId !== 'new' && item.groupId !== undefined) ?
                {url:`/api/group/${item.groupId}`, method: 'PUT'} :
                {url:'/api/group', method: 'POST'};

            await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.cancelOnClick();
        }
    }

    render() {
        const {item} = this.state;
        let title = <h3>{(item.groupId !== 'new' && item.groupId !== undefined) ? "Edit " : "Add "}Group</h3>;

        return (
            <Popup
                header={
                    title
                }
                body={
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                }
                footer={<FormGroup
                    className="float-right">
                    <Button color="success" type="submit">Save</Button>
                    {' '}
                    <Button color="secondary" onClick={this.props.cancelOnClick}>Cancel</Button>
                </FormGroup>
                }
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

export default GroupEditPopup;