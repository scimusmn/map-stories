import React from 'react';
import ReactDOM from 'react-dom';

export default class ImageEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: props.imageFiles,
      images: props.images,
      places: props.places,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const place = ReactDOM.findDOMNode(this.refs.placeInput).value.trim();
    console.log(name);
    console.log('----^ ^ ^ ^ ^ name ^ ^ ^ ^ ^----');
    console.log(place);
    console.log('----^ ^ ^ ^ ^ place ^ ^ ^ ^ ^----');
  }

  render() {
    return (
      <form className="form-horizontal edit-image" onSubmit={this.handleSubmit.bind(this)} >

        <div className="form-group">
          <label htmlFor="editImageName" className="control-label col-md-2">Image name</label>
          <div className="col-md-10">
            <input
              id="editImageName"
              type="text"
              ref="nameInput"
              className="form-control col-md-10"
              placeholder="Image name"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="editImagePlace" className="control-label col-md-2">Image place</label>
          <div className="col-md-10">
            <input
              id="editImagePlace"
              type="text"
              ref="placeInput"
              className="form-control col-md-10"
              placeholder="Place name"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}

ImageEditForm.propTypes = {
  places: React.PropTypes.array,
  images: React.PropTypes.array,
  imageFiles: React.PropTypes.array,
};

ImageEditForm.contextTypes = {
  router: React.PropTypes.object,
};
