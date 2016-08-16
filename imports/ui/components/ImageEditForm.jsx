import React from 'react';

export default class ImageEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: props.imageFiles,
      images: props.images,
      places: props.places,
      selectedImage: props.selectedImage,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleDefault(key) {
    if (key === 'desc') {
      return this.props.selectedImage[key].join('\n\n');
    }
    return this.props.selectedImage[key];
  }

  render() {
    return (
      <form className="form-horizontal edit-image" onSubmit={this.handleSubmit} >

        <div className="form-group">
          <label htmlFor="editImageName" className="control-label col-md-2">Image name</label>
          <div className="col-md-10">
            <input
              id="editImageName"
              type="text"
              ref={ref => { this.nameInput = ref; }}
              className="form-control col-md-10"
              defaultValue={this.handleDefault('name')}
              onChange={this.handleChange}
            />
            <p className="help-block">
              Internal description for reference. Not displayed to the visitor.
            </p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="editImagePlace" className="control-label col-md-2">Image place</label>
          <div className="col-md-10">
            <input
              id="editImagePlace"
              type="text"
              ref={ref => { this.placeInput = ref; }}
              className="form-control col-md-10"
              defaultValue={this.handleDefault('place')}
            />
            <p className="help-block">
              Place name.
              This links the image up with the place.
              It must match the name on the homepage exactly.
            </p>
            <p className="help-block">TODO: Make this a drop-down list.</p>
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="editImagePlace"
            className="control-label col-md-2"
          >
            Image description
          </label>
          <div className="col-md-10">
            <textarea
              id="editImageDescription"
              ref={ref => { this.descTextArea = ref; }}
              className="form-control col-md-10"
              rows="15"
              defaultValue={this.handleDefault('desc')}
            />
            <p className="help-block">Primary description of the image.</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="editImagePlace" className="control-label col-md-2">Image caption</label>
          <div className="col-md-10">
            <input
              id="editImageCaption"
              type="text"
              ref={ref => { this.captionInput = ref; }}
              className="form-control col-md-10"
              defaultValue={this.handleDefault('caption')}
            />
            <p className="help-block">Optional caption to display below the image</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="editImagePlace" className="control-label col-md-2">Image credit</label>
          <div className="col-md-10">
            <input
              id="editImageCredit"
              type="text"
              ref={ref => { this.creditInput = ref; }}
              className="form-control col-md-10"
              defaultValue={this.handleDefault('credit')}
            />
            <p className="help-block">Optional caption to display below the image</p>
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
  selectedImage: React.PropTypes.object,
};

ImageEditForm.contextTypes = {
  router: React.PropTypes.object,
};
