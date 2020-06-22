import React, {Component} from 'react';

export default class ButtonSettings extends Component {
    render() {
        const {label ='',classNameBtn, event} = this.props;
        return (
            <button className={classNameBtn} onClick={event}> {label} </button>
        )
    } 
}
