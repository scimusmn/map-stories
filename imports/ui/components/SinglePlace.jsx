import React from 'react';
import { Link } from 'react-router';
import { Loading } from '../../ui/components/loading.js';
import { Layer, Rect, Stage, Group } from 'react-konva';

export var SinglePlace = React.createClass({
  getInitialState: function () {
    return { rectWidth: this.props.initialRectWidth };
  },

  handleClick: function (event) {
    const width = event.evt.clientX * 1.56;
    this.setState({ rectWidth: width });
  },

  render: function () {
    const places = this.props.places;
    console.log('this.state: ', this.state);
    return (
      places.length > 0 ? <div className="documents-list">
      {places.map((place) => (
        <div key={ place._id } >
          <h2>{place.name}</h2>
          <Stage width={700} height={700}>
            <Layer>
              <Rect
                onClick={this.handleClick}
                fill="pink"
                x={10} y={10} width={this.state.rectWidth} height={300}/>
            </Layer>
          </Stage>
        </div>
        ))}
      </div> :
      <div>No places yet.</div>
    );
  },

});
