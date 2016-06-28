import React from 'react';
import { Navigation } from '../components/navigation.jsx';
import { Places } from '../../api/places/places.js';

import ListPlaces from '../components/ListPlaces.jsx';

/**
 * Highest level presentational component
 *
 * Contains all of our dynamic components
 */
export default class App extends React.Component {
  render() {

    // Load data from props
    const { children, places } = this.props;

    // Presentation layout
    // We removed the <Navigation /> componet until the UI is better developed
    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  // current meteor user
  user: React.PropTypes.object,

  // server connection status
  connected: React.PropTypes.bool,

  // subscription status
  loading: React.PropTypes.bool,

  // is side menu open?
  menuOpen: React.PropTypes.bool,

  // All the places visible to the current user
  places: React.PropTypes.array,

  // IndexRoute children
  children: React.PropTypes.element.isRequired,

};
