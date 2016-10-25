import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import '/node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import $ from 'jquery';
import { Link } from 'react-router';

const s = require('underscore.string');

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
    let mergedImageFiles = {};
    _.each(imageFiles, file => {
      const matchedImage = _.filter(images, image => image.filename === file.filename);

      if (!_.isEmpty(matchedImage)) {
        delete matchedImage[0].filename;
        delete matchedImage[0]._id;
        mergedImageFiles = _.assign(file, matchedImage[0]);
      }
    });

    // Add mutated object back to state
    this.state.imageFiles = mergedImageFiles;

    function warnEmpty(cell) {
      if (cell == null) {
        return '<div class="cell-error">-</div>';
      }
      return cell;
    }

    /**
     * Shorten long description text
     * @param cell
     * @returns {*}
     */
    function previewText(cell) {
      let mutatedCell = warnEmpty(cell);
      return s.truncate(mutatedCell, 15);
    }

    function dimensionFormatter(cell) {
      if (cell <= 300) {
        return `<div class="cell-warning">${cell}<br/>Image too small</div>`;
      }
      return warnEmpty(cell);
    }

    function imageFormatter(cell) {
      return `<img width="280" src="/images/collection/${cell}" />`;
    }

    function editLink(cell, row) {
      let slug = '';
      let query = {};
      if (cell == null) {
        slug = s.slugify(s.dasherize(s.strLeftBack(row.filename, '.')));
        query = { filename: row.filename };
      } else {
        slug = cell;
      }
      const url = `/image/${slug}/edit`;

      return <Link className="btn btn-default btn-lg" to={{ pathname: url, query }}>Edit</Link>;
    }

    /**
     * Display data table using Fixed Data Table component
     */
    const tableOptions = {
      defaultSortName: 'place',
      defaultSortOrder: 'desc',
    };

    return (
      <BootstrapTable data={imageFiles} striped hover options={tableOptions}>
        <TableHeaderColumn isKey dataSort dataField="filename">Filename</TableHeaderColumn>
        <TableHeaderColumn
          dataSort dataField="place"
          dataFormat={warnEmpty}
        >Place</TableHeaderColumn>
        <TableHeaderColumn
          dataSort dataField="width" dataFormat={dimensionFormatter}
        >Width</TableHeaderColumn>
        <TableHeaderColumn
          dataSort dataField="height" dataFormat={dimensionFormatter}
        >Height</TableHeaderColumn>
        <TableHeaderColumn dataSort dataField="filename">Filename</TableHeaderColumn>
        <TableHeaderColumn
          dataSort dataField="desc"
        >Description</TableHeaderColumn>
        <TableHeaderColumn
          dataSort dataField="caption"
        >Caption</TableHeaderColumn>
        <TableHeaderColumn
          dataSort dataField="credit" dataFormat={previewText}
        >Credit</TableHeaderColumn>
        <TableHeaderColumn
          dataField="filename" width="300"
          dataFormat={imageFormatter}
        >Image</TableHeaderColumn>
        <TableHeaderColumn
          dataField="slug" dataFormat={editLink}
        >Actions</TableHeaderColumn>
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
