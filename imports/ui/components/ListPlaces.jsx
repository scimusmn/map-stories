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

  // Future handler for click events
  clickPlace(event, place) {
    console.log('event: ', event);
  }

  render() {
    const { places, images } = this.props;
    return (
      <div className="container container-map map-base">
        <div className="map-info-background"></div>
        <div className="map-info">
          <h3>Mississippi River</h3>
          <p>Tintallë tier ve sí amortala ar lóriendessë cirya fairi ómaryo man eleni ahosta elyë tiruva nurrua enquantuva ondolissë laurië, light loicolícuma man. Ambonnar ondolissë winga oialë. light valimar nainië i cenuva nu valimar anar. Andúnë i undumë rúma ëar mornië fifírula man ve rávëa súmaryassë untúpa lírinen., light hlápula cenuva, lassi rámar yulma nu ringa vardo yulma sí ar elentári mindonnar. Métim' elenillor maiw</p>
        </div>
        <div className="map-details">
          <form className="map-details-form">
            <h4>Change map details</h4>
            Zoom: <input type="text" data-tag="mapScale" ref="mapScale"
              onChange={this.handleChange.bind(this)}
              defaultValue={this.state.settings.mapScale}/><br/>
            X: <input type="text" data-tag="mapX" ref="mapX"
              onChange={this.handleChange.bind(this)}
              defaultValue={this.state.settings.mapX}/><br/>
            Y: <input type="text" data-tag="mapY" ref="mapY"
              onChange={this.handleChange.bind(this)}
              defaultValue={this.state.settings.mapY}/><br/>
          </form>
        </div>
        <Chart
          places={this.state.places}
          images={this.state.images}
          settings={this.state.settings}
          data={this.state.data}
          domain={this.state.domain} />
      </div>
    );
  }

}

ListPlaces.propTypes = {
  places: React.PropTypes.array,
  images: React.PropTypes.array,
};

ListPlaces.contextTypes = {
  router: React.PropTypes.object,
};
