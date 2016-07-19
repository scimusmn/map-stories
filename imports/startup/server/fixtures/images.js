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
        imgTitle: 'Dam',
      },
      {
        place: 'Coon Rapids',
        imgTitle: 'Men Lounging',
      },
    ];

    data.forEach((image) => {
      image.slug = _.kebabCase(image.name);
      Images.insert(image);
    });
  }
});
