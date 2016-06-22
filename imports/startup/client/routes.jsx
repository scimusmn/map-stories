import App from '/imports/ui/App.jsx';
import { Test } from '/imports/ui/Test.jsx';
import React  from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Router path="/" component={ App } />
      <Router path="/map" component={ App } />
      <Router path="/list" component={ App } />
    </Router>,
    document.getElementById('render-target')
  );
});
