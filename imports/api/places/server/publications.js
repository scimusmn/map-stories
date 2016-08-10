import { Meteor } from 'meteor/meteor';
import { Places } from '../places.js';
import { Images } from '../../images/images.js';
import { ImageFiles } from '../../imageFiles/imageFiles';

Meteor.publish('places', () => Places.find());

Meteor.publish('placesImages', function () {
  var places = Places.find();
  const publication = [
    places,
    Images.find(),
    ImageFiles.find(),
  ];
  return publication;
});
