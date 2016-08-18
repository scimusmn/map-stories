import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { submitImage, updateImage } from '../../api/images/methods';


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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectPlaceChange = this.handleSelectPlaceChange.bind(this);
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

    // Update the selected image object with the changed value for the right
    // form element
    const selectedImage = this.state.selectedImage;
    selectedImage[event.target.name] = event.target.value;

    // Update state
    this.setState({ selectedImage });
  }

  handleSubmit(event) {
    event.preventDefault();
    const updatedImage = this.state.selectedImage;
    if (_.has(updatedImage, '_id')) {
      const _id = updatedImage._id;
      delete updatedImage._id;
      updateImage.call({ _id, updatedImage });
    } else {
      submitImage.call({ updatedImage });
    }
    this.context.router.push('/admin');
  }

  handleDefault(key) {
    if (!_.has(this.props.selectedImage, key)) {
      return '';
    }

    return this.props.selectedImage[key];
  }

  /**
   * The react-select module doesn't pass along an event object
   * This prevents us from getting the name of the select item, so we
   * just have to create a function that's specific to each select.
   * @param val
   */
  handleSelectPlaceChange(val) {
    // Update the selected image object with the changed value for the right
    // form element
    const selectedImage = this.state.selectedImage;

    // Tie this specifically to the place item
    selectedImage.place = val.label;

    // Update state
    this.setState({
      selectedImage,
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
              name="name"
              type="text"
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
              name="place"
              options={this.getPlaces(this.props)}
              value={this.state.selectValue}
              onChange={this.handleSelectPlaceChange}
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
              name="desc"
              className="form-control col-md-10"
              rows="15"
              defaultValue={this.handleDefault('desc')}
              onChange={this.handleChange}
            />
            <p className="help-block">Primary description of the image.</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="editImagePlace" className="control-label col-md-2">Image caption</label>
          <div className="col-md-10">
            <input
              id="editImageCaption"
              name="caption"
              type="text"
              className="form-control col-md-10"
              defaultValue={this.handleDefault('caption')}
              onChange={this.handleChange}
            />
            <p className="help-block">Optional caption to display below the image</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="editImagePlace" className="control-label col-md-2">Image credit</label>
          <div className="col-md-10">
            <input
              id="editImageCredit"
              name="credit"
              type="text"
              className="form-control col-md-10"
              defaultValue={this.handleDefault('credit')}
              onChange={this.handleChange}
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
