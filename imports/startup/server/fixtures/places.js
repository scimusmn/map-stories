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
        offsetX: -300,
        offsetY: -70,
      },
      {
        name: 'Bohemian Flats',
        lat: 44.975381,
        long: -93.241104,
        offsetX: -300,
        offsetY: 150,
      },
      {
        name: 'Saint Anthony Falls',
        lat: 44.981667,
        long: -93.258611,
        offsetX: 50,
        offsetY: -350,
        color: 'purple',
      },
      {
        name: 'Fort Snelling',
        lat: 44.892778,
        long: -93.180556,
        offsetX: -20,
        offsetY: 100,
      },
      {
        name: 'Pike Island',
        lat: 44.892222,
        long: -93.165278,
        offsetX: 0,
        offsetY: 50,
      },
    ];;

    data.forEach((place) => {
      place.slug = _.kebabCase(place.name);
      Places.insert(place);
    });
  }
});
