import { Meteor } from 'meteor/meteor';
import sizeOf from 'image-size';
import _ from 'lodash';
import { Images } from '../../../api/images/images.js';

// Start with our existing image data
Meteor.startup(() => {
  if (Images.find().count() === 0) {
    const data = [
      // Coon rapids
      {
        place: 'Coon Rapids',
        name: 'Coon Rapids Dam',
        filename: 'MA6-9-CR-p1.jpg',
        mediaType: 'historic',
        desc: 'The Northern Mississippi Power Company began construction of a ' +
        'dam and hydroelectric power station at Coon Rapids in 1913. Although ' +
        'some local leaders argued that the dam should include locks, the Army ' +
        'Corps of Engineers determined that the river above the dam was not ' +
        'navigable, and the power company did not include a lock.',
        caption: 'The Coon Rapid Dam and hydroelectric power station in 1928.',
        credit: 'Paul W. Hamilton / Minnesota Historical Society / Public domain',
        date: 1928,
        order: 1,
      },

      // Bohemian Flats
      {
        place: 'Bohemian Flats',
        name: 'poorest-residents',
        filename: 'MH5-9-MP1E-p3-original.jpg',
        mediaType: 'historic',
        desc: 'Temp desc.',
        caption: 'Bohemian Flats in 1880.',
        credit: 'Emil Hilgarde / Minnesota Historical Society / Public domain',
        date: 1880,
        order: 1,
      },
      // SAF
      {
        place: 'Saint Anthony Falls',
        name: 'SAF 1786',
        filename: 'saf-1786.jpg',
        mediaType: 'historic',
        desc: 'Temp desc.',
        caption: '',
        credit: 'Jean Alexis Fournier / Minnesota Historical Society / Public domain',
        date: 1680,
        order: 1,
      },

      // Lock and Dam #1
      {
        place: 'Lock and Dam #1',
        name: 'Meeker island',
        filename: 'Meeker.jpg',
        mediaType: 'historic',
        desc: 'Temp desc.',
        caption: '',
        credit: 'Temp credit',
        date: 100,
        order: 1,
      },

      // Lock and Dam #1
      {
        place: 'Lock and Dam #1',
        name: 'Meeker island',
        filename: 'Meeker.jpg',
        mediaType: 'historic',
        desc: 'Temp desc.',
        caption: '',
        credit: 'Temp credit',
        date: 100,
        order: 1,
      },

      // Fort Snelling
      {
        place: 'Fort Snelling',
        name: 'projectile-point',
        filename: 'projectile-point.jpg',
        mediaType: 'historic',
        desc: 'Temp desc.',
        caption: 'Archaeologists found this projectile point at Fort Snelling in ' +
        'the 1970s. It is likely at least 2,500 years old.',
        credit: 'TBD',
        date: '0001',
        order: 1,
      },

      // Saint Paul
      {
        place: 'Saint Paul',
        name: 'saint-paul-example-photo',
        filename: 'MR2-9-SP3-1S-p225.jpg',
        mediaType: 'historic',
        desc: 'Temp desc.',
        caption: 'Temp caption',
        credit: 'Temp credit',
        date: 1880,
        order: 1,
      },

      // Mendota
      {
        place: 'Mendota',
        name: 'mendota-example-photo',
        filename: 'MH5-9-MP1E-p3-original.jpg',
        mediaType: 'historic',
        desc: 'Temp desc.',
        caption: 'Temp caption',
        credit: 'Temp credit',
        date: 1880,
        order: 1,
      },

      // Mounds Park
      {
        place: 'Mounds Park',
        name: 'mounds-example-photo',
        filename: 'MR2-9-SP1C-r43.jpg',
        mediaType: 'historic',
        desc: 'Temp desc.',
        caption: 'Temp caption',
        credit: 'Temp credit',
        date: 1880,
        order: 1,
      },

      // Hastings
      {
        place: 'Hastings',
        name: 'hastings-example-photo',
        filename: 'Hastings1850-60.jpg',
        mediaType: 'historic',
        desc: 'Temp desc.',
        caption: 'Temp caption',
        credit: 'Temp credit',
        date: 1880,
        order: 1,
      },
    ];

    data.forEach((image) => {
      // Add a slug for each classes and referencing
      const mutatedImage = image;
      mutatedImage.slug = _.kebabCase(image.name);

      // Add dimension details to the database for better sizing on screen
      const imagePath = `${process.env.PWD}/public/images/collection/${image.filename}`;
      const dimensions = sizeOf(imagePath);
      mutatedImage.width = dimensions.width;
      mutatedImage.height = dimensions.height;

      // Update collection with generated data
      Images.insert(mutatedImage);
    });
  }
});
