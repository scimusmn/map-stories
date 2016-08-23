import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import ThenNow from '/imports/api/thenNow/thenNow';

// If the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (ThenNow.find().count() === 0) {
    console.log('Loading then now data');
    const data = [
      {
        lat: 44.973497,
        long: -93.237940,
        place: 'Bohemian Flats',
        thenFilename: 'bohemian-flats-1880.jpg',
        nowFilename: 'bohemian-flats-2016.jpg',
        thumbFilename: 'bohemian-flats-thumb.jpg',
        thenYear: '1880',
        nowYear: '2016',
        thenCredit: 'Emil Hilgarde / Minnesota Historical Society / Public domain',
        nowCredit: '',
        offsetX: -140,
        offsetY: 150,
        width: 1539,
        height: 1196,
      },

      {
        lat: 44.948428,
        long: -93.201635,
        place: 'Lock and Dam #1',
        thenFilename: 'lock-and-dam-1-1912.jpg',
        nowFilename: 'lock-and-dam-1-2016.jpg',
        thumbFilename: 'lock-and-dam-1-thumb.jpg',
        thenYear: '1912',
        nowYear: '2016',
        thenCredit: 'Minnesota Historical Society / Public domain',
        nowCredit: '',
        offsetX: -140,
        offsetY: 150,
        width: 1550,
        height: 1004,
      },

      {
        lat: 44.932219,
        long: -93.102900,
        place: 'Saint Paul',
        thenFilename: 'saint-paul-1929.jpg',
        nowFilename: 'saint-paul-2016.jpg',
        thumbFilename: 'saint-paul-thumb.jpg',
        thenYear: '1929',
        nowYear: '2016',
        thenCredit: 'Charles P. Gibson / Minnesota Historical Society / Public domain',
        nowCredit: '',
        offsetX: -140,
        offsetY: 150,
        width: 1619,
        height: 955,
      },

      {
        lat: 44.978820,
        long: -93.253740,
        place: 'Saint Anthony Falls',
        thenFilename: 'saf-1865.jpg',
        nowFilename: 'saf-2016.jpg',
        thumbFilename: 'saf-thumb.jpg',
        thenYear: '1865',
        nowYear: '2008',
        thenCredit: 'Minnesota Historical Society / Public domain',
        nowCredit: 'Jerry Mathiason / Minnesota Historical Society / All rights reserved',
        offsetX: -140,
        offsetY: 150,
        width: 2000,
        height: 626,
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
