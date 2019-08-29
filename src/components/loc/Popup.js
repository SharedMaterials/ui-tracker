import React from 'react';
import {Form} from 'reactstrap';

const Popup = (props) => {

    let {headerIsPresent, footerIsPresent} = {
        headerIsPresent: !(props.header === null || props.header === undefined),
        footerIsPresent: !(props.footer === null || props.footer === undefined)
    };
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <Form onSubmit={props.handleSubmit}>
                    {(headerIsPresent) ? props.header : ''}
                    {(headerIsPresent) ? <hr/> : ''}
                    {props.body}
                    {(footerIsPresent) ? <hr/> : ''}
                    {(footerIsPresent) ? props.footer : ''}
                </Form>
            </div>
        </div>
    );
};

export default Popup;