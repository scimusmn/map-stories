import { createContainer } from 'meteor/react-meteor-data';
import { Images } from '../../api/images/images.js';
import { Places } from '../../api/places/places.js';
import App from '../layouts/App.jsx';

/**
 * Create a container for the App
 *
 * This is a Meteor idiom that separates the Meteor/React data interface
 * from the React presentation template.
 *
 * We load the Meteor data into the React props which are then passed along
 * to the App component.
 */
export default createContainer(() => {
  const publicHandle = Meteor.subscribe('Places.public');
  const privateHandle = Meteor.subscribe('Places.private');

  return {
    user: Meteor.user(),
    loading: !(publicHandle.ready() && privateHandle.ready()),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    places: Places.find({}).fetch(),
    images: Images.find({}).fetch(),
  };
}, App);
