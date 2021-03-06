import React from 'react';
import ReactDOM from 'react-dom';
import d3Chart from '../helpers/chart.js';

/**
 * Chart component
 */
var Chart = React.createClass({
  propTypes: {
    places: React.PropTypes.array,
    images: React.PropTypes.array,
    thenNow: React.PropTypes.array,
    dakota: React.PropTypes.array,
    settings: React.PropTypes.object,
    data: React.PropTypes.array,
    domain: React.PropTypes.object,
  },

  componentDidMount: function () {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.create(el, {
      width: '1920px',
      height: '1080px',
    }, this.getChartState());
  },

  componentDidUpdate: function () {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.update(el, this.getChartState());
  },

  getChartState: function () {
    return {
      places: this.props.places,
      images: this.props.images,
      thenNow: this.props.thenNow,
      dakota: this.props.dakota,
      settings: this.props.settings,
      data: this.props.data,
      domain: this.props.domain,
    };
  },

  componentWillUnmount: function () {
    // Disabled, since we're not using it.
  },

  render: function () {
    return (
      <div className="Chart"></div>
    );
  },
});

export default Chart;
