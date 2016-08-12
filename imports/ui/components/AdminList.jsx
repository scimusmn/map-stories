import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import '/node_modules/react-bootstrap-table/css/react-bootstrap-table.min.css';

class AdminList extends React.Component {

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

    const images = this.props.images;
    let imageFiles = this.props.imageFiles;

    /**
     * Merge image file data with content in database
     *
     * If the filename exists in the database, copy over the
     * relevant data and display in in the table.
     */
    _.each(imageFiles, file => {
      const matchedImage = _.filter(images, image => {
        return image.filename === file.filename;
      });

      if (!_.isEmpty(matchedImage)) {
        delete matchedImage[0].filename;
        delete matchedImage[0]._id;
        file = _.assign(file, matchedImage[0]);
      }
    });

    // Add mutated object back to state
    this.state.imageFiles = imageFiles;

    //A rowGetter function is required by the grid to retrieve a row for a given index
    var rowGetter = function (i) {
      return imageFiles[i];
    };

    var columns = [
      {
        key: 'title',
        name: 'Title',
      },
      {
        key: 'count',
        name: 'Count',
      },
    ];

    console.log(this.props);
    console.log('----^ ^ ^ ^ ^ this.props ^ ^ ^ ^ ^----');

    /**
     * Display data table using Fixed Data Table component
     */
    return (
      <BootstrapTable data={imageFiles} striped={true} hover={true}>
        <TableHeaderColumn isKey={true} dataSort={true} dataField="filename">Filename</TableHeaderColumn>
        <TableHeaderColumn dataSort={true} dataField="place">Place</TableHeaderColumn>
        <TableHeaderColumn dataSort={true} dataField="width">Width</TableHeaderColumn>
        <TableHeaderColumn dataSort={true} dataField="height">Height</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

AdminList.propTypes = {
  places: React.PropTypes.array,
  images: React.PropTypes.array,
  imageFiles: React.PropTypes.array,
};

export default AdminList;
