import React from 'react';
import AdminList from '/imports/ui/components/AdminList';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import '/node_modules/startbootstrap-sb-admin-2/dist/css/sb-admin-2.css'


export default class AdminListWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: props.imageFiles,
      images: props.images,
      places: props.places,
    };
  }

  render() {
    return (
      <div id="wrapper">
        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="index.html">Edit image content</a>
          </div>

          <div className="navbar-default sidebar" role="navigation">
            <div className="sidebar-nav navbar-collapse">
              <ul className="nav in" id="side-menu">
                <li>
                  <a href="/" className="active">
                    <i className="fa fa-dashboard fa-fw"></i>
                    Back to application
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div id="page-wrapper">
          <div className="admin-table-header">Header content for the table</div>
          <div className="admin-table-content">
            <AdminList
              imageFiles={this.props.imageFiles}
              images={this.props.images}
              places={this.props.places}
            />
          </div>
        </div>

      </div>
    );
  }
}

AdminListWrapper.propTypes = {
  places: React.PropTypes.array,
  images: React.PropTypes.array,
  imageFiles: React.PropTypes.array,
};

AdminListWrapper.contextTypes = {
  router: React.PropTypes.object,
};

