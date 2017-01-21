import React from 'react';

export default class App extends React.Component {
  render() {
    return this.props.children;
  }
}

// Passing props down to all children use .cloneElement
//const pair = List.of('Trainspotting', '28 Days Later');
//const tally = Map({'Trainspotting': 5, '28 Days Later': 4});
//
//export default class App extends React.Component	{
//  constructor(props) {
//    super(props);
//	
//	}
//	
//	render() {
//		//We use React's cloneElement API to create a clone of the original components
//		// Then we pass down props to all the children
//    return React.cloneElement(this.props.children, 
//		{
//			pair,
//			tally
//		});
//  }
//}