import React from 'react';
import ReactDOM from 'react-dom';
import d3Chart from '../helpers/chart.js';

/**
 * Chart component
 */
var Chart = React.createClass({
  propTypes: {
    places: React.PropTypes.array,
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
      settings: this.props.settings,
      data: this.props.data,
      domain: this.props.domain,
    };
  },

  componentWillUnmount: function () {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.destroy(el);
  },

  render: function () {
    return (
      <div className="Chart"></div>
    );
  },
});

export default Chart;
