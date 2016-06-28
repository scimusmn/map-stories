import { Meteor } from 'meteor/meteor';
import { Places } from '../../api/places/places.js';
import _ from 'lodash';

// If the database is empty on server start, create some sample data.
Meteor.startup(() => {
  Places.remove({});
  if (Places.find().count() === 0) {

    const data = [
      {
        name: 'Pike Island',
        x: 100,
        y: 400,
      },
      {
        name: 'Fort Snelling',
        x: 600,
        y: 700,
      },
    ];

    data.forEach((place) => {
      place.slug = _.kebabCase(place.name);
      Places.insert(place);
    });
  }
});
