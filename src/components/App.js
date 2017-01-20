import React from 'react';
import {	List	} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later');

export default class App extends React.Component	{
  render() {
		/*We use React's cloneElement API to create a clone of the original components with our custom pair prop attached.*/
    return React.cloneElement(this.props.children, {pair: pair});
  }
}