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
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  places: React.PropTypes.object,      // all places visible to the current user
};
