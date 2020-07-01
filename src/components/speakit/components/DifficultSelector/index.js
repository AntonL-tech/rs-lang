import React, { Component } from 'react';
import './difficultSelector.css';

class DifficultSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '0',
      hasUserWords: props.hasUserWords,
    };
  }

  handleChange = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div className="selector">
        <input
          type="radio"
          name="groups"
          className="selector__input"
          value="-1"
          checked={this.state.selectedOption === '-1'}
          onChange={this.handleChange}
          id="user_group"
          disabled={!this.state.hasUserWords}
        />
        <div className="selector__point-border">
          <label
            htmlFor="user_group"
            className="selector__point selector__point--user"
          ></label>
        </div>
        <input
          type="radio"
          name="groups"
          className="selector__input"
          value="0"
          checked={this.state.selectedOption === '0'}
          onChange={this.handleChange}
          id="group_1"
        />
        <div className="selector__point-border">
          <label htmlFor="group_1" className="selector__point"></label>
        </div>
        <input
          type="radio"
          name="groups"
          className="selector__input"
          value="1"
          checked={this.state.selectedOption === '1'}
          onChange={this.handleChange}
          id="group_2"
        />
        <div className="selector__point-border">
          <label htmlFor="group_2" className="selector__point"></label>
        </div>
        <input
          type="radio"
          name="groups"
          className="selector__input"
          value="2"
          checked={this.state.selectedOption === '2'}
          onChange={this.handleChange}
          id="group_3"
        />
        <div className="selector__point-border">
          <label htmlFor="group_3" className="selector__point"></label>
        </div>
        <input
          type="radio"
          name="groups"
          className="selector__input"
          value="3"
          checked={this.state.selectedOption === '3'}
          onChange={this.handleChange}
          id="group_4"
        />
        <div className="selector__point-border">
          <label htmlFor="group_4" className="selector__point"></label>
        </div>
        <input
          type="radio"
          name="groups"
          className="selector__input"
          value="4"
          checked={this.state.selectedOption === '4'}
          onChange={this.handleChange}
          id="group_5"
        />
        <div className="selector__point-border">
          <label htmlFor="group_5" className="selector__point"></label>
        </div>
        <input
          type="radio"
          name="groups"
          className="selector__input"
          value="5"
          checked={this.state.selectedOption === '5'}
          onChange={this.handleChange}
          id="group_6"
        />
        <div className="selector__point-border">
          <label htmlFor="group_6" className="selector__point"></label>
        </div>
      </div>
    );
  }
}

export default DifficultSelector;
