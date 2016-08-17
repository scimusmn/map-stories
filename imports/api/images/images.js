import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Images = new Mongo.Collection('Images');

Images.schema = new SimpleSchema({
  place: {
    type: String,
    label: 'Reference to the places database. Which place does this image belong to?',
  },
  name: {
    type: String,
    label: 'Optional name for the image. Not displayed to the user anywhere',
  },
  filename: {
    type: String,
    label: 'Filename of the image file, without any path',
  },
  type: {
    type: String,
    label: 'Not in use right now. All are "historic". Eventually could be used to diff. video',
  },
  caption: {
    type: String,
    label: 'Filename of the image file, without any path',
    optional: true,
  },
  credit: {
    type: String,
    label: 'Image credit.',
  },
  date: {
    type: String,
    label: 'Image credit.',
  },
  desc: {
    type: Object,
    label: 'Prose image description',
  },
});

Images.attachSchema(Images.schema);
