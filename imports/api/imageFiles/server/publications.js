import { Meteor } from 'meteor/meteor';
import { ImageFiles } from '../imageFiles';

Meteor.publish('imageFiles', () => ImageFiles.find());
