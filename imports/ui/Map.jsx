import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Places } from '../api/places/places.js';

import Place from './Place.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Places.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';

  }

  renderPlaces() {
    let filteredPlaces = this.props.places;
    if (this.state.hideCompleted) {
      filteredPlaces = filteredPlaces.filter(place => !place.checked);
    }

    return filteredPlaces.map((place) => (
      <Place key={place._id} place={place} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>
            <label className="hide-completed">
              <input
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
              />
              Hide Completed Places
            </label>

            <AccountsUIWrapper />

            { this.props.currentUser ?
              <form className="new-place" onSubmit={this.handleSubmit.bind(this)} >
                <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new places"
                  />
              </form> : ''
            }
        </header>

        <ul>
          {this.renderPlaces()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  places: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => ({
  places: Places.find({}, { sort: { createdAt: -1 } }).fetch(),
  incompleteCount: Places.find({ checked: { $ne: true } }).count(),
  currentUser: Meteor.user(),
}), App);
