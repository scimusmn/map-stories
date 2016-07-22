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
        name: 'I 35 Bridge Collapse',
        filename: 'I35_Bridge_Collapse_4crop.jpg',
        type: 'historic',
      },
      {
        place: 'Bohemian Flats',
        name: 'Collecting wood',
        filename: 'GT2-52-p17.jpg',
        type: 'historic',
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
        name: 'Fot Snelling',
        filename: 'AV1988-45-18.jpg',
      },
      {
        place: 'Fort Snelling',
        name: 'Fot Snelling Settlers',
        filename: 'FortSnellingHeadofNavigation.jpg',
      },
      {
        place: 'Pike Island',
        name: 'Nothing',
        filename: 'example.jpg',
      },
      {
        place: 'Pike Island',
        name: 'Something',
        filename: 'example.jpg',
        otherthing: 'test',
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
