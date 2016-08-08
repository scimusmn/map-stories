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
        desc: [
          'The Northern Mississippi Power Company began construction of a dam and hydroelectric power station at Coon Rapids in 1913. Although some local leaders argued that the dam should include locks, the Army Corps of Engineers determined that the river above the dam was not navigable, and the power company did not include a lock.',
          'A crew of more than 1,000 worked day and night to build the dam. They lived in a nearby camp complete with streets, a store, clubhouse, hospital, office buildings, school, dormitories, dance hall, movie theater and billiard parlor.',
          'In 1966 the hydroelectric station closed, and three years later the Hennepin County Park Board purchased the site.',
        ],
        caption: 'The Coon Rapid Dam and hydroelectric power station in 1928.',
        credit: 'Paul W. Hamilton / Minnesota Historical Society / Public domain',
        date: 1928,
      },

      {
        place: 'Coon Rapids',
        name: 'Men Lounging',
        filename: 'HE21r30.jpg',
        type: 'historic',
        desc: [
          'During the mid-1800s, a series of “Red River ox cart trails” connected the Selkirk settlement, near present day Winnipeg, Canada, to the Mississippi River’s head of navigation at Saint Paul. Wooden carts pulled by oxen transported loads of furs south and carried food supplies, ammunition and manufactured goods on the return north.',
          'The trails accelerated the development of Minnesota and North Dakota. Communities grew along the trails, and in some places modern highways follow the routes once taken by the ox carts.',
        ],
        caption: 'Red River ox cart drivers taking a rest along the trail in 1860. ',
        credit: 'Minnesota Historical Society / Public domain',
        date: 1860,
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

      // SAF
      {
        place: 'Saint Anthony Falls',
        name: 'Hennepin at SAF',
        filename: 'Henn@SAF.jpg',
        type: 'historic',
        desc: [
          'Motivated by a search for easy passage to the Pacific Ocean, the quest to control the area’s rich fur resources, and a desire to spread Christianity, small groups of French explorers traveled along parts of the Upper Mississippi River in the 1670s.',
          'Two of those explorers, Father Louis Hennepin and Antoine Auguelle, became the first Europeans to see the falls in 1680. Father Hennepin named them for his patron saint, Anthony of Padua.',
        ],
        caption: 'A depiction of Father Louis Hennepin and Antoine Auguelle at Saint Anthony Falls in 1680.',
        credit: 'J. N. Marchand / Minnesota Historical Society / Public domain',
        date: 1680,
      },
      {
        place: 'Saint Anthony Falls',
        name: 'saf-eastman',
        filename: 'saf-eastman.jpg',
        type: 'historic',
        desc: [
          'In the early 1820s soldiers from Fort Snelling built two small mills on the west side of Saint Anthony Falls. For the first time people harnessed the power of the falls to mill lumber and grain. Before long Saint Anthony Falls became a major milling center leading to the birth of the city of Minneapolis.',
        ],
        caption: 'The Fort Snelling mills are visible on the left side of this illustration.',
        credit: 'Artist: Seth Eastman, Engraver: J.C. McRae / Minnesota Historical Society / Public domain',
        date: '182u',
      },
      {
        place: 'Saint Anthony Falls',
        name: 'franklin-steele',
        filename: 'por-15571-p1.jpg',
        type: 'historic',
        desc: [
          'Franklin Steele, a storekeeper at Fort Snelling and part owner of the Saint Croix Falls Lumber Company, built the first dam and commercial sawmill at Saint Anthony Falls in 1848. Other mills quickly followed and for the next 100 years the falls were a major center of commercial milling.',
        ],
        caption: '',
        credit: 'Minnesota Historical Society / Public domain',
        date: '',
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
