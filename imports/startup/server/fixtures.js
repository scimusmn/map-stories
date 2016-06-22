import { Meteor } from 'meteor/meteor';
import { Locations } from '../../api/locations.js';

// If the database is empty on server start, create some sample data.
Meteor.startup(() => {
  Locations.remove({});
  if (Locations.find().count() === 0) {
    const data = [
      {
        name: 'Pike Island',
        lat: 44.892222,
        long: -93.165278,
      },
      {
        name: 'Fort Snelling',
        lat: 44.892778,
        long: -93.180556,
      },
    ];

    data.forEach((location) => {
      Locations.insert(location);

    });
  }
});
