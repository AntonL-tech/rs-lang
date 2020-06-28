import React from 'react';

const DifficultSelector = () => {
  return (
    <div className="header__selector selector" id="selector">
      <input
        type="radio"
        name="groups"
        id="group_1"
        className="selector__input"
        value="1"
        checked
      />
      <div className="selector__point-border">
        <label for="group_1" className="selector__point"></label>
      </div>
      <input
        type="radio"
        name="groups"
        id="group_2"
        className="selector__input"
        value="2"
      />
      <div className="selector__point-border">
        <label for="group_2" className="selector__point"></label>
      </div>
      <input
        type="radio"
        name="groups"
        id="group_3"
        className="selector__input"
        value="3"
      />
      <div className="selector__point-border">
        <label for="group_3" className="selector__point"></label>
      </div>
      <input
        type="radio"
        name="groups"
        id="group_4"
        className="selector__input"
        value="4"
      />
      <div className="selector__point-border">
        <label for="group_4" className="selector__point"></label>
      </div>
      <input
        type="radio"
        name="groups"
        id="group_5"
        className="selector__input"
        value="5"
      />
      <div className="selector__point-border">
        <label for="group_5" className="selector__point"></label>
      </div>
      <input
        type="radio"
        name="groups"
        id="group_6"
        className="selector__input"
        value="6"
      />
      <div className="selector__point-border">
        <label for="group_6" className="selector__point"></label>
      </div>
    </div>
  );
};

export default DifficultSelector;
