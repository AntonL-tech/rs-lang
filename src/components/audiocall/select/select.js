import React, { Component } from 'react';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level,
      isOpen: false,
    }
  }

  openMenu = () => {
    // console.lsog('here')
    this.setState((state) => ({
      isOpen: !this.state.isOpen
    }));
  }

  render() {
    // console.log(this.state.isOpen)
    if (this.state.isOpen) {
      console.log('here', this.state)
      return (
        <>
          <p onClick={this.openMenu}>{this.state.level}</p>          
          <ul>
            <li data-level='0'onClick={this.props.callback}>Уровень 1</li>
            <li data-level='1'onClick={this.props.callback}>Уровень 2</li>
            <li data-level='2'onClick={this.props.callback}>Уровень 3</li>
            <li data-level='3'onClick={this.props.callback}>Уровень 4</li>
            <li data-level='4'onClick={this.props.callback}>Уровень 5</li>
            <li data-level='5'onClick={this.props.callback}>Уровень 6</li>
          </ul>
        </>
      ) 
    }
    return <p onClick={this.openMenu}>{this.state.level}</p> 
  }
}