import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import ThenNow from '../../api/thenNow/thenNow';
import Dakota from '../../api/dakota/dakota';
import { Loading } from '../components/loading.js';
import { Images } from '../../api/images/images.js';
import { Places } from '../../api/places/places.js';
import ListPlaces from '../components/ListPlaces.jsx';

/**
 * Provide data for the list all places component
 *
 * Pass the data along to the ListPlaces react component, using the react-komposer idiom
 */
const composer = (props, onData) => {
  const subscription = Meteor.subscribe('placesImages');
  if (subscription.ready()) {
    const places = Places.find({}).fetch();
    const images = Images.find({}).fetch();
    const thenNow = ThenNow.find({}).fetch();
    const dakota = Dakota.find({}).fetch();
    onData(null, { places, images, thenNow, dakota });
  }
};

export default composeWithTracker(composer, Loading)(ListPlaces);
