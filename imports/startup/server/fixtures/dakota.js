import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import Dakota from '/imports/api/dakota/dakota';

// If the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Dakota.find().count() === 0) {

    console.log('Loading Dakota data');

    const data = [
      // Mendota
      {
        lat: 44.885965,
        long: -93.162233,
        place: 'Mendota',
        englishPlaceName: 'Mendota',
        dakotaPlaceName: 'Bdote',
        nameFilename: 'mendota-name.mp4',
        explainFilename: 'mendota-explain.mp4',
        offsetX: -100,
        offsetY: -200,
      },

      {
        lat: 44.805654,
        long: -93.220164,
        place: 'Mendota',
        englishPlaceName: 'Black Dog\'s village',
        dakotaPlaceName: 'Ṡunkasapa',
        nameFilename: 'black-dog-name.mp4',
        explainFilename: 'black-dog-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      {
        lat: 44.844824,
        long: -93.170841,
        place: 'Mendota',
        englishPlaceName: 'Pilot Knob',
        dakotaPlaceName: 'Oheyawahi',
        nameFilename: 'pilot-knob-name.mp4',
        explainFilename: 'pilot-knob-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      // Saint Paul
      {
        lat: 44.910387,
        long: -93.169493,
        place: 'Saint Paul',
        englishPlaceName: 'Saint Paul',
        dakotaPlaceName: 'Imniżaska',
        nameFilename: 'saint-paul-name.mp4',
        explainFilename: 'saint-paul-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      // SAF
      {
        lat: 44.980559,
        long: -93.253200,
        place: 'Saint Anthony Falls',
        englishPlaceName: 'Spirit Island',
        dakotaPlaceName: 'Wanaġi Wait',
        nameFilename: 'spirit-island-name.mp4',
        explainFilename: 'spirit-island-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      {
        lat: 44.982077,
        long: -93.257285,
        place: 'Saint Anthony Falls',
        englishPlaceName: 'Saint Anthony Falls',
        dakotaPlaceName: 'Owamni Yemini',
        nameFilename: 'saint-anthony-name.mp4',
        explainFilename: 'saint-anthony-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      {
        lat: 44.987637,
        long: -93.262887,
        place: 'Saint Anthony Falls',
        englishPlaceName: 'Nicollet Island',
        dakotaPlaceName: 'Wita Waṡte',
        nameFilename: 'nicollet-island-name.mp4',
        explainFilename: 'nicollet-island-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      //  Mounds
      {
        lat: 44.876075,
        long: -93.007457,
        place: 'Mounds Park',
        englishPlaceName: 'Little Crow’s Village',
        dakotaPlaceName: 'Kapoża',
        nameFilename: 'little-crow-name.mp4',
        explainFilename: 'little-crow-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      {
        lat: 44.987637,
        long: -93.262887,
        place: 'Mounds Park',
        englishPlaceName: 'Carver’s Cave',
        dakotaPlaceName: 'Wankan Tipi',
        nameFilename: 'carvers-cave-name.mp4',
        explainFilename: 'carvers-cave-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      // Hastings
      {
        lat: 44.765451,
        long: -92.805478,
        place: 'Hastings',
        englishPlaceName: 'Saint Croix River',
        dakotaPlaceName: 'Okizuwakpa',
        nameFilename: 'saint-croix-name.mp4',
        explainFilename: 'saint-croix-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      // Fort Snelling
      {
        lat: 44.765451,
        long: -92.805478,
        place: 'Fort Snelling',
        englishPlaceName: 'Fort Snelling',
        dakotaPlaceName: 'Ḣaḣobdote',
        nameFilename: 'fort-snelling-name.mp4',
        explainFilename: 'fort-snelling-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      {
        lat: 44.892120,
        long: -93.166090,
        place: 'Fort Snelling',
        englishPlaceName: 'Pike Island',
        dakotaPlaceName: 'Wita Tanka',
        nameFilename: 'pike-island-name.mp4',
        explainFilename: 'pike-island-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      {
        lat: 44.877703,
        long: -93.182089,
        place: 'Fort Snelling',
        englishPlaceName: 'Minnesota River',
        dakotaPlaceName: 'Wakpa Minisota',
        nameFilename: 'minnesota-river-name.mp4',
        explainFilename: 'minnesota-river-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

      {
        lat: 44.893439,
        long: -93.153235,
        place: 'Fort Snelling',
        englishPlaceName: 'Meeting of the Rivers',
        dakotaPlaceName: 'Okiżu wakpa',
        nameFilename: 'meeting-rivers-name.mp4',
        explainFilename: 'meeting-rivers-explain.mp4',
        offsetX: 0,
        offsetY: 0,
      },

    ];

    // Insert the data with a slug
    data.forEach((dakota) => {
      const mutatedDakota = dakota;
      mutatedDakota.slug = _.kebabCase(`${dakota.place}-${dakota.englishPlaceName}`);
      Dakota.insert(mutatedDakota);
    });
  }
});
