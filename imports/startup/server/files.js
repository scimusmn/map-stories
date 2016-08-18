import { Meteor } from 'meteor/meteor';
import { ImageFiles } from '/imports/api/imageFiles/imageFiles';
import fs from 'fs';
import _ from 'lodash';
import sizeOf from 'image-size';
import mime from 'mime';

// Path to our images folder
const collectionImages = `${process.env.PWD}/public/images/collection/`;

// Read the files in the collections folder and build a collection
Meteor.startup(() => {
  // Clear out the ImageFiles collection before reading from the directory
  ImageFiles.remove({});

  fs.readdir(
    collectionImages,
    // Handle the async file read process inside of Meteor's fiber
    Meteor.bindEnvironment(
      function (err, imageFiles) {

        /**
         * If the image file is an allowed file type, insert it into the
         * ImageFiles db collection
         */
        _.each(imageFiles, function (imageFile) {
          const allowedTypes = [
            'image/jpeg',
            'image/png',
          ];
          const mimeType = mime.lookup(collectionImages + imageFile);
          if (_.includes(allowedTypes, mimeType)) {
            const imageFileObject = { filename: imageFile };
            ImageFiles.insert(imageFileObject);
          } else {
            console.log(mimeType);
          }

        });

      }
    )
  );

});
