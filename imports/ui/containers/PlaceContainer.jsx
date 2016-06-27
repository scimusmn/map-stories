import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Loading } from '../components/loading.js';
import { Places } from '../../api/places/places.js';
import { SinglePlace } from '../components/SinglePlace.jsx';

/**
 * Provide data for a single place component
 *
 * Get place to display from the router (params) and filter the Meteor data.
 *
 * Pass the data along to the SinglePlace react component, using the react-komposer idiom
 */
const composer = (props, onData) => {
  const subscription = Meteor.subscribe('places');
  if (subscription.ready()) {
    const places = Places.find({ slug: props.params.slug }).fetch();
    const initialRectWidth = 300;
    onData(null, { places, initialRectWidth });
  }
};

export default composeWithTracker(composer, Loading)(SinglePlace);
