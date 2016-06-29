import React from 'react';
import ReactDOM from 'react-dom';
import d3Chart from '../helpers/chart.js';

/**
 * Chart component
 */
var Chart = React.createClass({
  propTypes: {
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
    console.log('this: ', this);
    var el = ReactDOM.findDOMNode(this);
    d3Chart.update(el, this.getChartState());
  },

  getChartState: function () {
    return {
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
