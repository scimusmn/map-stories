import React from 'react';
import { Navigation } from '../components/navigation.jsx';
import { Places } from '../../api/places/places.js';

import ListPlaces from '../components/ListPlaces.jsx';

export default class App extends React.Component {

  render() {
    const { places } = this.props;
    return (
      <div>
        <Navigation />
        <h3>App component</h3>
        <ListPlaces places={places}/>
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
  places: React.PropTypes.object,
};
