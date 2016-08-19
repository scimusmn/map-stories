import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import ThenNow from '/imports/api/thenNow/thenNow';

// If the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (ThenNow.find().count() === 0) {
    console.log('Loading then now data');
    const data = [
      {
        place: 'Bohemian Flats',
        thenFilename: 'then.jpg',
        nowFilename: 'now.jpg',
        thenYear: '1880',
        nowYear: '2016',
        thisCredit: 'Emil Hilgarde / Minnesota Historical Society / Public domain',
        nowCredit: '',
      },

      {
        place: 'Lock and Dam #1',
        thenFilename: 'then.jpg',
        nowFilename: 'now.jpg',
        thenYear: '1912',
        nowYear: '2016',
        thisCredit: 'Minnesota Historical Society / Public domain',
        nowCredit: '',
      },

      {
        place: 'Saint Paul',
        thenFilename: 'then.jpg',
        nowFilename: 'now.jpg',
        thenYear: '1929',
        nowYear: '2016',
        thisCredit: 'Charles P. Gibson / Minnesota Historical Society / Public domain',
        nowCredit: '',
      },

    ];

    // Insert the data with a slug
    data.forEach((thenNow) => {
      const mutatedThenNow = thenNow;
      mutatedThenNow.slug = _.kebabCase(`${thenNow.place}-${thenNow.thenYear}-${thenNow.nowYear}`);
      ThenNow.insert(mutatedThenNow);
    });
  }
});



