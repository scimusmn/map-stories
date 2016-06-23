import { Places } from '../../api/places/places.js';
import { createContainer } from '../helpers/create-container.jsx';
import App from '../layouts/App.jsx';

export default createContainer(() => {
  const publicHandle = Meteor.subscribe('Places.public');
  const privateHandle = Meteor.subscribe('Places.private');
  return {
    user: Meteor.user(),
    loading: !(publicHandle.ready() && privateHandle.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    places: Places.find({}).fetch(),
  };
}, App);
