import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer.jsx';

import { App } from '../../ui/layouts/App.jsx';
import { Index } from '../../ui/components/index.jsx';

import { One } from '../../ui/components/one.jsx';
import { Two } from '../../ui/components/two.jsx';
import { Hello } from '../../ui/pages/hello.jsx';
import { NotFound } from '../../ui/components/notFound.jsx';

export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ AppContainer }>
      <IndexRoute component={ Index } />
      <Route path="/one" component={ One } />
      <Route path="/two" component={ Two } />
      <Route path="/hello/:name" component={ Hello } />
    </Route>
    <Route path="*" component={ NotFound } />
  </Router>
);
