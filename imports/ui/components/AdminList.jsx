import React from 'react';
import { Table } from 'react-bootstrap';

export default class AdminList extends React.Component {
  handleChange(event) {
    //  Handle events
  }

  constructor(props) {
    super(props);
    this.state = {
      imageFiles: props.imageFiles,
      images: props.images,
      places: props.places,
    };
  }

  render() {
    var images = this.props.images;
    var imageFiles = this.props.imageFiles;
    console.log(imageFiles);
    console.log('----^ ^ ^ ^ ^ imageFiles ^ ^ ^ ^ ^----');
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Image file</th>
            <th>Image name</th>
            <th>Image SRC</th>
          </tr>
        </thead>
        <tbody>
          {
            images.map(function(image) {
              return (
                <tr key={image._id}>
                  <td>{image.name}</td>
                  <td>{image.filename}</td>
                </tr>
                );
            })
          }
        </tbody>
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

Image = React.createClass({
  render() {
    return (
      <tr>
        <td className="text-center">
          <img style={{width: '50px'}} className="img-circle" src={this.props.image.src} />
        </td>
        <td>{this.props.image.name}</td>
      </tr>
    );
  }
});
