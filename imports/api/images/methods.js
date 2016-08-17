import { ValidatedMethod } from 'meteor/mdg:validated-method';

const updateImage = new ValidatedMethod({
  name: 'updateImage',
  validate: null,
  run() {
    console.log('Running the method');
  },
});

export default updateImage;
