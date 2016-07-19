import { Meteor } from 'meteor/meteor';
import { Places } from '../places.js';
import { Images } from '../../images/images.js';

Meteor.publish('places', () => Places.find());

Meteor.publish('placesImages', () => [
  Places.find(),
  Images.find(),
]);
