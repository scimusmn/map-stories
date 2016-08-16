import React from 'react';

export default class SingleImageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
    };
  }

  render() {
    return (
      <div>Single image edit</div>
    )
  }
}

SingleImageEdit.propTypes = {
  images: React.PropTypes.array,
};

SingleImageEdit.contextTypes = {
  router: React.PropTypes.object,
};
