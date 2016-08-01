import { Meteor } from 'meteor/meteor';
import { Places } from '../../../api/places/places.js';
import _ from 'lodash';

// If the database is empty on server start, create some sample data.
Meteor.startup(() => {
  Places.remove({});
  if (Places.find().count() === 0) {

    const data = [
      {
        name: 'Coon Rapids',
        lat: 45.12,
        long: -93.2875,
        offsetX: -400,
        offsetY: -200,
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
        offsetX: -370,
        offsetY: -180,
        color: 'purple',
      },
      {
        name: 'Ford and Meeker Island',
        lat: 44.915270,
        long: -93.200567,
        offsetX: -400,
        offsetY: -50,
      },
      {
        name: 'Fort Snelling',
        lat: 44.892778,
        long: -93.180556,
        offsetX: -250,
        offsetY: 90,
      },
      {
        name: 'Saint Paul',
        lat: 44.892222,
        long: -93.165278,
        offsetX: -10,
        offsetY: -300,
      },
      {
        name: 'Hastings',
        lat: 44.759722,
        long: -92.868611,
        offsetX: 100,
        offsetY: -150,
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
    ];

    data.forEach((place) => {
      place.slug = _.kebabCase(place.name);
      Places.insert(place);
    });
  }
});
