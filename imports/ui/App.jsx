import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Locations } from '../api/locations.js';

import Location from './Location.jsx';
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

    Locations.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';

  }

  renderLocations() {
    let filteredLocations = this.props.locations;
    if (this.state.hideCompleted) {
      filteredLocations = filteredLocations.filter(location => !location.checked);
    }

    return filteredLocations.map((location) => (
      <Location key={location._id} location={location} />
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
              Hide Completed Locations
            </label>

            <AccountsUIWrapper />

            { this.props.currentUser ?
              <form className="new-location" onSubmit={this.handleSubmit.bind(this)} >
                <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new locations"
                  />
              </form> : ''
            }
        </header>

        <ul>
          {this.renderLocations()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  locations: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => ({
  locations: Locations.find({}, { sort: { createdAt: -1 } }).fetch(),
  incompleteCount: Locations.find({ checked: { $ne: true } }).count(),
  currentUser: Meteor.user(),
}), App);
