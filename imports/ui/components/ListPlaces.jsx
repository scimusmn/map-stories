import React from 'react';
import { Link } from 'react-router';
import d3Chart from '../helpers/chart.js';
import Chart from './Chart.jsx';
import { debounce } from 'throttle-debounce';
import _ from 'lodash';

/**
 * List of places component
 */
export default class ListPlaces extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      places: props.places,
      thenNow: props.thenNow,
      dakota: props.dakota,
      data: [
        { id: '5fbmzmtc', x: 13, y: 30, z: 6 },
        { id: 's4f8phwm', x: 14.2, y: 30, z: 9 },
      ],
      domain: { x: [0, 30], y: [0, 100] },
      settings: {
        mapScale: 69200,
        mapX: -93.285,
        mapY: 45.1215,
      },
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    event.persist();
    const inputItem = event.target.getAttribute('data-tag');
    let settings = this.state.settings;
    settings[inputItem] = _.toNumber(event.target.value);
    debounce(1000, () => {
      this.setState({ settings: settings });
    })();
  }

  render() {
    const { places, images } = this.props;
    return (
      <div className="container-map map-base">
        <Chart
          places={this.state.places}
          images={this.state.images}
          thenNow={this.state.thenNow}
          dakota={this.state.dakota}
          settings={this.state.settings}
          data={this.state.data}
          domain={this.state.domain} />
        <div id="dakota-place-names"></div>
        <div id="then-now"></div>
        <div id="map-sidebar-background" className="map-sidebar-home"></div>
        <div id="map-sidebar" className="map-sidebar-home">
          <h3 id="default-heading">
            Select a spot<br/>
            to explore<br/>
            the history<br/>
            along the<br/>
            Mississippi River
          </h3>
          <div id="sidebar-content">
            <div id="location-content">
              <h3 id="place-heading"></h3>
              <div id="image-content">
                <div id="highlighted-image">
                  <div id="caption-content" className="image-caption"></div>
                </div>
                <div id="credit-content" className="image-credit"></div>
              </div>
              <div id="text-content"></div>
            </div>
          </div>
          <div id="dock"></div>
        </div>
        <div className="dev-map-details">
          <form className="dev-map-details-form">
            <h4>Change map details</h4>
            Zoom: <input type="text" data-tag="mapScale" ref="mapScale"
                         onChange={this.handleChange}
                         defaultValue={this.state.settings.mapScale}/><br/>
            X: <input type="text" data-tag="mapX" ref="mapX"
                      onChange={this.handleChange}
                      defaultValue={this.state.settings.mapX}/><br/>
            Y: <input type="text" data-tag="mapY" ref="mapY"
                      onChange={this.handleChange}
                      defaultValue={this.state.settings.mapY}/><br/>
          </form>
        </div>
      </div>
    );
  }

}

ListPlaces.propTypes = {
  places: React.PropTypes.array,
  images: React.PropTypes.array,
  thenNow: React.PropTypes.array,
};

ListPlaces.contextTypes = {
  router: React.PropTypes.object,
};
