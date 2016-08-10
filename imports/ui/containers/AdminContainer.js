/**
 * Container for the admin view where we control and manage image data
 */
import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Loading } from '../components/loading.js';
import { Images } from '../../api/images/images.js';
import { Places } from '../../api/places/places.js';
import AdminList from '../components/AdminList';

/**
 * Provide data for the list of places and images
 */
const composer = (props, onData) => {
  // Create a subscription of places and images
  const subscription = Meteor.subscribe('placesImages');
  if (subscription.ready()) {
    const places = Places.find({}).fetch();
    const images = Images.find({}).fetch();
    onData(null, { places, images });
  }
};

export default composeWithTracker(composer, Loading)(AdminList);
