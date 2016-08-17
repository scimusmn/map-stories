import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const _ = require('lodash');

export default class ImageEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: props.places,
      selectedImage: props.selectedImage,
    };

    // If an image's place is already assigned, set it in the select list
    const defaultPlace = _.find(props.places, place => place.name === props.selectedImage.place);
    if (!_.isUndefined(defaultPlace)) {
      this.state.selectValue = defaultPlace.slug;
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }

  getPlaces(props) {
    const options = [];
    _.each(props.places, place => {
      options.push({
        value: place.slug,
        label: place.name,
      });
    });

    return options;
  }

  handleChange(event) {
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleDefault(key) {
    if (!_.has(this.props.selectedImage, key)) {
      return '';
    }

    if (key === 'desc') {
      return this.props.selectedImage[key].join('\n\n');
    }
    return this.props.selectedImage[key];
  }

  selectChange(val) {
    this.setState({
      selectValue: val,
    });
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

            <Select
              name="form-field-name"
              options={this.getPlaces(this.props)}
              value={this.state.selectValue}
              onChange={this.selectChange}
            />

            <p className="help-block">
              Select the place where this image will appear on the map.
            </p>
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
  selectedImage: React.PropTypes.object,
};

ImageEditForm.contextTypes = {
  router: React.PropTypes.object,
};
