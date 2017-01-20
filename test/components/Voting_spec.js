import React from 'react';
import ReactDOM from 'react-dom';

//To render a component in a unit test, we can use a helper function called renderIntoDocument, which will be in the React test utilities package
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import {List} from 'immutable';

import Voting from '../../src/components/Voting';
import { expect } from 'chai';

describe('Voting', () => {
	
	it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]} />
    );
	
	//Once the component is rendered, we can use another React helper function called scryRenderedDOMComponentsWithTag to find the button elements we expect there to be. We expect two of them, and we expect their text contents to be the two entries, respectively:
	const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		
	expect(buttons.length).to.equal(2);  //two button components
    expect(buttons[0].textContent).to.equal('Trainspotting'); // button text 'Trainspotting'
    expect(buttons[1].textContent).to.equal('28 Days Later'); // button text '28 days later'
  });
	
	//	When one of those voting buttons is clicked, the component should invoke a callback function. Like the entry pair, the callback function should also be given to the component as a prop.

	it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote}/>
    );
		
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]); //Simulate click of the first button

    expect(votedWith).to.equal('Trainspotting');
  });
	
	it('disables buttons when user has voted', () => {
//  the presence of the hasVoted props should cause the voting buttons to become disabled
		const component = renderIntoDocument(
			<Voting pair={["Trainspotting", "28 Days Later"]}
							hasVoted="Trainspotting" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
	});
	
//	A 'Voted' label should be present on the button whose entry matches the value of hasVoted:
	it('adds label to the voted entry', () => {
		const component = renderIntoDocument(
			<Voting pair={["Trainspotting", "28 Days Later"]}
							hasVoted="Trainspotting" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons[0].textContent).to.contain('Voted');
	});
	
//	When there's a winner, there should be no buttons, but instead an element with the winner ref:
	it('renders just the winner when there is one', () => {
		const component = renderIntoDocument(
			<Voting winner="Trainspotting" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);

		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	});

	//this test will only pass with React.PureComponent (see notes)
	it('renders as a pure component', () => {
		const pair = ['Trainspotting', '28 Days Later'];
		const container = document.createElement('div');
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');

		pair[0] = 'Sunshine';
		component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');
	});
	
	 it('does update DOM when prop changes', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    const newPair = pair.set(0, 'Sunshine');
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Sunshine');
  });
	
});