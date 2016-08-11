import React from 'react';
import Reactable from 'reactable';

export default class AdminList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageFiles: props.imageFiles,
      images: props.images,
      places: props.places,
    };
  }

  render() {

    /**
     * Hack to allow the content to scroll off screen.
     * TODO: make this part of the routing system
     * When we're on admin (non-kiosk) pages we should change the style
     */
    $('body')
      .css('overflow', 'auto');

    var images = this.props.images;
    var imageFiles = this.props.imageFiles;

    /**
     * Merge image file data with content in database
     *
     * If the filename exists in the database, copy over the
     * relevant data and display in in the table.
     */
    _.each(imageFiles, function (file) {
      let matchedImage = _.filter(images, function (image) {
        if (image.filename == file.filename) {
          return true;
        }
      });

      if (!_.isEmpty(matchedImage)) {
        delete matchedImage[0].filename;
        delete matchedImage[0]._id;
        file = _.assign(file, matchedImage[0]);
      }

    });

    /**
     * Display data table using Reactable component
     */
    var Table = Reactable.Table;
    var sortable = ['filename'];
    return (
      <Table className="admin-table table" data={imageFiles} sortable={sortable} />
    );

  }
}

AdminList.propTypes = {
  places: React.PropTypes.array,
  images: React.PropTypes.array,
  imageFiles: React.PropTypes.array,
};

AdminList.contextTypes = {
  router: React.PropTypes.object,
};

