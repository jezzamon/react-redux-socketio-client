import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action.middleware';

import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results';

const socket = io(`${location.protocol}//${location.hostname}:8091`);
//will listen for an event sent from the react-voting-app and pass that info sent 
	//to the action setState
socket.on('state', state =>
  store.dispatch(setState(state))
);

//const store = createStore(reducer);
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// without middleware
//const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



// this is now being handled by action_creator.
//store.dispatch({
//  type: 'SET_STATE',
//  state: {
//    vote: {
//      pair: ['Sunshine', '28 Days Later'],
//      tally: {Sunshine: 2}
//    }
//  }
//});

const routes = (
		<Route component={App}>
			<Route path="/results" component={Results} />
			<Route path="/" component={Voting} />
	 	</Route>
);

//set up store inside Provider, so that components can access state
//pass in your routes
ReactDOM.render(
	<Provider store={store}>
  	<Router history={hashHistory} routes={routes} />
	</Provider>,
  document.getElementById('app')
);