import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import Dakota from '/imports/api/dakota/dakota';

// If the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Dakota.find().count() === 0) {

    console.log('Loading Dakota data');

    const data = [
      {
        lat: 44.973497,
        long: -93.237940,
        place: 'Mendota',
        englishPlaceName: 'Mendota',
        dakotaPlaceName: 'Bdote',
        nameFilename: 'mendota-name.mp4',
        explainFilename: 'mendota-explain.mp4',
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
