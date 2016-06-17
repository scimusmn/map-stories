import { Meteor } from 'meteor/meteor';
import { Locations } from '../../api/locations.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Locations.find().count() === 0) {
    const data = [
      {
        name: 'Pike Island',
      },
      {
        name: 'Fort Snelling',
      },
    ];

    data.forEach((location) => {
      Locations.insert(location);

    });
  }
});
