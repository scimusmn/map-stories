import { Meteor } from 'meteor/meteor';
import { Images } from '../../../api/images/images.js';
import _ from 'lodash';

// If the database is empty on server start, create some sample data.

Meteor.startup(() => {
  Images.remove({});
  if (Images.find().count() === 0) {

    const data = [
      {
        place: 'Coon Rapids',
        name: 'Dam',
        filename: 'CoonRdsDam1928.jpg',
      },
      {
        place: 'Coon Rapids',
        name: 'Men Lounging',
        filename: 'HE2 1 r30.jpg',
      },
      {
        place: 'Pike Island',
        name: 'Nothing',
        filename: 'nothing.jpg',
      },
      {
        place: 'Pike Island',
        name: 'Something',
        filename: 'something.jpg',
      },
    ];

    data.forEach((image) => {
      image.slug = _.kebabCase(image.name);
      Images.insert(image);
    });
  }
});
