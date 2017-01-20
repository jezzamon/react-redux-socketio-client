import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results';



const routes = (
	<Router history={hashHistory}>
		<Route component={App}>
			<Route path="/results" component={Results} />
			<Route path="/" component={Voting} />
	 	</Route>
	</Router>
);
	
ReactDOM.render(
  routes,
  document.getElementById('app')
);