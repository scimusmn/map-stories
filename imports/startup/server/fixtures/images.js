import { Meteor } from 'meteor/meteor';
import { Images } from '../../../api/images/images.js';
import _ from 'lodash';
import sizeOf from 'image-size';

// If the database is empty on server start, create some sample data.

Meteor.startup(() => {
  Images.remove({});
  if (Images.find().count() === 0) {

    const data = [
      // Coon rapids
      {
        place: 'Coon Rapids',
        name: 'Coon Rapids Dam',
        filename: 'CoonRdsDam1928.jpg',
        type: 'historic',
      },
      {
        place: 'Coon Rapids',
        name: 'Men Lounging',
        filename: 'HE21r30.jpg',
        type: 'historic',
      },

      // Bohemian Flats
      {
        place: 'Bohemian Flats',
        name: 'I-35 Bridge Collapse',
        filename: 'I35_Bridge_Collapse_4crop.jpg',
        type: 'historic',
      },
      {
        place: 'Bohemian Flats',
        name: 'Collecting wood',
        filename: 'GT2-52-p17.jpg',
        type: 'historic',
      },

      // Lock and Dam #1
      {
        place: 'Lock and Dam #1',
        name: 'Meeker island',
        filename: 'Meeker.jpg',
      },

      // SAFL
      {
        place: 'Saint Anthony Falls',
        name: 'Old Bridge',
        filename: 'SprtIslnd-669-B.jpg',
      },
      {
        place: 'Saint Anthony Falls',
        name: 'Washburn poster',
        filename: 'Washbrn-Postr.jpg',
      },
      {
        place: 'Saint Anthony Falls',
        name: 'Washburn A Mill',
        filename: 'Washburnamill.jpg',
      },

      // Fort Snelling
      {
        place: 'Fort Snelling',
        name: 'Fort Snelling painting',
        filename: 'AV1988-45-18.jpg',
      },
      {
        place: 'Fort Snelling',
        name: 'Fort Snelling sketch',
        filename: 'FortSnellingHeadofNavigation.jpg',
      },
      {
        place: 'Saint Paul',
        name: 'Nothing',
        filename: 'example.jpg',
      },
      {
        place: 'Saint Paul',
        name: 'Something',
        filename: 'example.jpg',
        otherthing: 'test',
      },

      // Hastings
      {
        place: 'Hastings',
        name: 'Something',
        filename: 'Hastings1850-60.jpg',
      },

      // Mendota
      {
        place: 'Mendota',
        name: 'Native people above Mendota',
        filename: 'AV2004-88.jpg',
      },
      {
        place: 'Mendota',
        name: 'Sibley house painting',
        filename: 'SibleyHse1888.jpg',
      },

      // Mounds
      {
        place: 'Mounds Park',
        name: 'Mounds Park painting',
        filename: 'AV1991-85-33.jpg',
      },
    ];

    data.forEach((image) => {
      // Add a slug for each classes and referencing
      image.slug = _.kebabCase(image.name);

      // Add dimension details to the database for better sizing on screen
      const imagepath = process.env.PWD + '/public/images/collection/' + image.filename;
      var dimensions = sizeOf(imagepath);
      image.width = dimensions.width;
      image.height = dimensions.height;

      // Update collection with generated data
      Images.insert(image);
    });
  }
});
