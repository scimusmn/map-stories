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
        <h3>List of places</h3>
        <ul>
          {places.map(place => (
            <li key={place._id}>
              <Link to={'/place/' + place.slug}>{place.name}</Link>
            </li>
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
