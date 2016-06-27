import React from 'react';
import { Link } from 'react-router';
import { Loading } from '../../ui/components/loading.js';

export class SinglePlace extends React.Component {
  render() {
    const places = this.props.places;
    return (
      places.length > 0 ? <div className="documents-list">
      {places.map((place) => (
          <div key={ place._id }>{place.name}</div>
        ))}
      </div> :
      <div>No places yet.</div>
    );
  }
}
