import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import ListPlacesContainer from '../../ui/containers/ListPlacesContainer.jsx';
import PlaceContainer from '../../ui/containers/PlaceContainer.jsx';
import AdminContainer from '../../ui/containers/AdminContainer';

import { App } from '../../ui/layouts/App.jsx';
import { Index } from '../../ui/components/index.jsx';

import { NotFound } from '../../ui/components/notFound.jsx';

export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ AppContainer }>
      <IndexRoute component={ ListPlacesContainer } />
      <Route path="/place/:slug" component={ PlaceContainer } />
      <Route path="/admin" component={ AdminContainer } />
    </Route>
    <Route path="*" component={ NotFound } />
  </Router>
);
