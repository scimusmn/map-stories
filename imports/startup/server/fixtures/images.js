import { Meteor } from 'meteor/meteor';
import { Images } from '../../../api/images/images.js';
import _ from 'lodash';
import sizeOf from 'image-size';

// If the database is empty on server start, create some sample data.

Meteor.startup(() => {
  Images.remove({});
  if (Images.find().count() === 0) {

    const data = [
      {
        place: 'Coon Rapids',
        name: 'Coon Rapids Dam',
        filename: 'CoonRdsDam1928.jpg',
      },
      {
        place: 'Saint Anthony Falls',
        name: 'Saint Anthony Falls Dam',
        filename: 'example.jpg',
      },
      {
        place: 'Fort Snelling',
        name: 'Fort Snelling Dam',
        filename: 'example.jpg',
      },
      {
        place: 'Coon Rapids',
        name: 'Men Lounging',
        filename: 'HE2 1 r30.jpg',
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
