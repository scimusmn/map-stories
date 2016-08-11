import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Column, Cell } from 'fixed-data-table';
import '/node_modules/fixed-data-table/dist/fixed-data-table-base.min.css';

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

    // Add mutated object back to state
    this.state.imageFiles = imageFiles;

    /**
     * Display data table using Fixed Data Table component
     */
    return (
      <Table
        rowsCount={this.state.myTableData.length}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={500}>
        <Column
          header={<Cell>Name</Cell>}
          cell={props => (
            <Cell {...props}>
              {this.state.imageFiles[props.rowIndex].filename}
            </Cell>
          )}
          width={200}
        />
      </Table>
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

