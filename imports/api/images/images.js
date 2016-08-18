import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Images = new Mongo.Collection('Images');

Images.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

// Images.schema = new SimpleSchema({
//   place: {
//     type: String,
//     label: 'Reference to the places database. Which place does this image belong to?',
//   },
//   name: {
//     type: String,
//     label: 'Optional name for the image. Not displayed to the user anywhere',
//   },
//   filename: {
//     type: String,
//     label: 'Filename of the image file, without any path',
//   },
//   mediaType: {
//     type: String,
//     label: 'Media type',
//     optional: true,
//   },
//   caption: {
//     type: String,
//     label: 'Filename of the image file, without any path',
//     optional: true,
//   },
//   credit: {
//     type: String,
//     label: 'Image credit.',
//     optional: true,
//   },
//   date: {
//     type: String,
//     label: 'Image credit.',
//     optional: true,
//   },
//   desc: {
//     type: [String],
//     label: 'Prose image description',
//   },
//   order: {
//     type: Number,
//     label: 'Order',
//   },
//   slug: {
//     type: String,
//     label: 'Slug',
//   },
//   width: {
//     type: Number,
//     label: 'Image width',
//   },
//   height: {
//     type: Number,
//     label: 'Image height',
//   },
// });
//
// Images.attachSchema(Images.schema);
