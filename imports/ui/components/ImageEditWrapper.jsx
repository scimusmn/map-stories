import React from 'react';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/startbootstrap-sb-admin-2/dist/css/sb-admin-2.css';
import ImageEditForm from '/imports/ui/components/ImageEditForm';

const _ = require('lodash');

export default class ImageEditWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: props.imageFiles,
      images: props.images,
      places: props.places,
    };
  }

  selectedImage(props) {
    const routeSlug = props.routeParams.slug;
    const selectedImage = _.find(props.images, { slug: routeSlug });
    return `/images/collection/${selectedImage.filename}`;
  }

  render() {
    return (
      <div id="wrapper">
        <nav
          className="navbar navbar-default navbar-static-top"
          role="navigation"
          style={{ marginBottom: 0 }}
        >
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
            </button>
            <a className="navbar-brand" href="index.html">Edit image content</a>
          </div>

          <div className="navbar-default sidebar" role="navigation">
            <div className="sidebar-nav navbar-collapse">
              <ul className="nav in" id="side-menu">
                <li>
                  <a href="/" className="active">
                    <i className="fa fa-dashboard fa-fw" />
                    Back to application
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div id="page-wrapper">
          <div className="row">
            <div className="col-lg-12">
              <h1>Edit image</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <ImageEditForm />
            </div>
            <div className="col-lg-4">
              <img
                className="img-responsive"
                alt="TODO: fill me in"
                src={this.selectedImage(this.props)}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

ImageEditWrapper.propTypes = {
  places: React.PropTypes.array,
  images: React.PropTypes.array,
  imageFiles: React.PropTypes.array,
};

ImageEditWrapper.contextTypes = {
  router: React.PropTypes.object,
};

