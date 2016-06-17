import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Blaze to render the log in buttons
    this.view = Blaze.render(Template.loginButtons,
    ReactDOM.findDOMNode(this.refs.container));
  }

  componentWillUnmount() {
    // Clean up the Blaze view
    Blaze.remove(this.view);
  }

  render() {
    return <span ref="container" />;
  }

}
