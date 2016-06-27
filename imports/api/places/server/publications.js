import { Meteor } from 'meteor/meteor';
import { Places } from '../places.js';

Meteor.publish('places', () => Places.find());
