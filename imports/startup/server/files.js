import fs from 'fs';
import _ from 'lodash';
import mime from 'mime';

// Path to our images folder
const collectionImages = process.env.PWD + '/public/images/collection/';

// Read the files in the collections folder and build a
fs.readdir(collectionImages, function (err, images) {
  _.each(images, function(image) {

    const mimeType = mime.lookup(collectionImages + image);
    if (mimeType != 'image/jpeg') {
      console.log('Found a non-JPG file');
      console.log(image);
    }

  });

});

