import { Meteor } from 'meteor/meteor';
import { Places } from '../../api/places/places.js';
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
        offsetX: -40,
        offsetY: 30,
      },
      {
        name: 'Saint Anthony Falls',
        lat: 44.981667,
        long: -93.258611,
        offsetX: -40,
        offsetY: 30,
        color: 'purple',
      },
      {
        name: 'Fort Snelling',
        lat: 44.892778,
        long: -93.180556,
        offsetX: -60,
        offsetY: 50,
      },
      {
        name: 'Pike Island',
        lat: 44.892222,
        long: -93.165278,
        offsetX: 90,
        offsetY: 100,
      },
    ];;

    data.forEach((place) => {
      place.slug = _.kebabCase(place.name);
      Places.insert(place);
    });
  }
});
