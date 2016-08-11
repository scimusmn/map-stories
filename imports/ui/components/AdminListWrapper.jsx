import React from 'react';
import AdminList from '/imports/ui/components/AdminList';

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
      <div className="admin-page">
        <div className="admin-table">
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

