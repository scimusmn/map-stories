import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Places } from '../../../api/places/places.js';

// If the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Places.find().count() === 0) {
    const data = [
      {
        name: 'Coon Rapids',
        lat: 45.12,
        long: -93.2875,
        offsetX: -340,
        offsetY: -145,
      },
      {
        name: 'Bohemian Flats',
        lat: 44.975381,
        long: -93.241104,
        offsetX: -10,
        offsetY: -450,
      },
      {
        name: 'Saint Anthony Falls',
        lat: 44.981667,
        long: -93.258611,
        offsetX: -300,
        offsetY: -150,
        color: 'purple',
      },
      {
        name: 'Lock and Dam #1',
        lat: 44.945270,
        long: -93.200567,
        offsetX: -440,
        offsetY: 30,
      },
      {
        name: 'Fort Snelling',
        lat: 44.892778,
        long: -93.180556,
        offsetX: -230,
        offsetY: 90,
      },
      {
        name: 'Saint Paul',
        lat: 44.95,
        long: -93.099681,
        offsetX: -90,
        offsetY: -250,
      },
      {
        name: 'Mendota',
        lat: 44.885963,
        long: -93.161747,
        offsetX: -20,
        offsetY: 150,
      },
      {
        name: 'Mounds Park',
        lat: 44.945556,
        long: -93.053611,
        offsetX: 80,
        offsetY: -125,
      },
      {
        name: 'Hastings',
        lat: 44.759722,
        long: -92.868611,
        offsetX: 30,
        offsetY: -225,
      },
    ];

    data.forEach((place) => {
      const mutatedPlace = place;
      mutatedPlace.slug = _.kebabCase(place.name);
      Places.insert(mutatedPlace);
    });
  }
});
