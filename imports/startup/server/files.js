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
      (err, imageFiles) => {
        /**
         * If the image file is an allowed file type, insert it into the
         * ImageFiles db collection
         */
        _.each(imageFiles, imageFile => {
          const allowedTypes = [
            'image/jpeg',
            'image/png',
          ];
          const filePath = collectionImages + imageFile;
          const mimeType = mime.lookup(filePath);
          if (_.includes(allowedTypes, mimeType)) {
            const imageFileObject = { filename: imageFile };

            // Add dimension details to the database for better sizing on screen
            const dimensions = sizeOf(filePath);
            imageFileObject.width = dimensions.width;
            imageFileObject.height = dimensions.height;

            ImageFiles.insert(imageFileObject);
          } else {
            console.log(mimeType);
          }
        });
      }
    )
  );
});
