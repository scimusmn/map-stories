import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Images } from './images';

export const updateImage = new ValidatedMethod({
  name: 'updateImage',
  validate: null,
  run({ _id, updatedImage }) {
    Images.update(_id, {
      $set: updatedImage,
    });
  },

});

export const submitImage = new ValidatedMethod({
  name: 'submitImage',
  validate: null,
  run({ updatedImage }) {
    Images.insert(updatedImage);
  },
});
