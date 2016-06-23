import React from 'react';
import { Link } from 'react-router';

/**
 * List of places component
 */
export default class ListPlaces extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { places } = this.props;
    return (
      <div>
        <p>List of Places</p>
        <ul>
          {places.map(place => (
            <li> {place.name} </li>
          ))}
        </ul>
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
