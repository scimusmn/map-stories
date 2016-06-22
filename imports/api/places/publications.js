import Places from './places.js';

Meteor.publish('Places.public', function () {
  return Places.find({});
});
