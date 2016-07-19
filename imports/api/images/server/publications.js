import { Meteor } from 'meteor/meteor';
import { Places } from '../images.js';

Meteor.publish('images', () => Images.find());
