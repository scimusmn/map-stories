import React, { Component, PropTypes } from 'react';
import { Places } from '../api/places/places.js';

// Place component - represents a single place item
export default class Place extends Component {

  toggleChecked() {
    Places.update(this.props.place._id, {
      $set: { checked: !this.props.place.checked },
    });
  }

  deleteThisPlace() {
    console.log('Places: ', Places);
    console.log('this: ', this);
    Places.remove(this.props.place._id);
  }

  render() {
    const placeClassName = this.props.place.checked ? 'checked' : '';
    return (
      <li className={placeClassName}>

        <button className="delete" onClick={this.deleteThisPlace.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.place.checked}
          onClick={this.toggleChecked.bind(this)}
          />

        <span className="text">
          <strong>{this.props.place.username}</strong>: {this.props.place.name}
        </span>
      </li>
    );
  }
}

Place.propTypes = {
  // This component gets the place to display through a React prop.
  // We can use propTypes to indicate it is required
  place: PropTypes.object.isRequired,
};
