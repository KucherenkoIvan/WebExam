import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch
} from 'react-router-dom';
import routes from '../pages';

export default function Routing() {
  return (
    <Router>
      <Switch>
        {
          // Развертывание пар route:component из ../pages/index.js
          // в /route -> component
          Object.keys(routes).map(path => (<Route path={path} component={routes[path]} exact/>))
        }
      </Switch>
    </Router>
  )
}
