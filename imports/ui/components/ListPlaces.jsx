import React from 'react';
import { Link } from 'react-router';

/**
 * List of places component
 */
export default class ListPlaces extends React.Component {

  constructor(props) {
    super(props);
  }

  clickPlace(event, place) {
    console.log('event: ', event);
    console.log('place: ', place);
  }

  render() {
    const { places } = this.props;
    return (
      <div className="container container-map map-base">
        <h3>MNRRA</h3>
        <svg width="1920" height="1080">
          {places.map(place => (
            <circle
              key={place._id}
              cx={place.x} cy={place.y}
              r={10} fill={place.color}
              onClick={this.clickPlace.bind(this, event)}
            />
          ))}
        </svg>
      </div>
    );
  }

}

ListPlaces.propTypes = {
  places: React.PropTypes.array,
};

ListPlaces.contextTypes = {
  router: React.PropTypes.object,
};
