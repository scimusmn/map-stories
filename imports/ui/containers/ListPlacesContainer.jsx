import { createContainer } from 'meteor/react-meteor-data';
import { Places } from '../../api/places/places.js';
import ListPlaces from '../components/ListPlaces.jsx';

export default createContainer(() => {
  const places = Places.find({}).fetch();

  return {
    places: places,
  };

}, ListPlaces);
