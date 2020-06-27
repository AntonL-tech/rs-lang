import React, {Component} from 'react';

export default class ButtonSettings extends Component {
    render() {
        const {label ='',classNameBtn, clickBtn} = this.props;
        return (
            <button className={classNameBtn} onClick={clickBtn}> {label} </button>
        )
    } 
}
