import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import routes from '../pages';

export default function Routing() {
  const route = useSelector(state => state.route.page);
  return (
    React.createElement(routes[route])
  )
}
