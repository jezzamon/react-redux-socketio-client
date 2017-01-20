import React from 'react';
import {	List, Map	} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later');
const tally = Map({'Trainspotting': 5, '28 Days Later': 4});

export default class App extends React.Component	{
  constructor(props) {
    super(props);
	
	}
	
	render() {
		//We use React's cloneElement API to create a clone of the original components
		// Then we pass down props to all the children
    return React.cloneElement(this.props.children, 
		{
			pair,
			tally
		});
  }
}