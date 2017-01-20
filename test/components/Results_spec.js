//We expect the component to 
//	1) render a div for each entry, and 
//  2) display both the entry name and the number of votes within that div. 
//  3) For entries that have no votes, a vote count of zero should be shown:

import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import Results from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const tally = Map({'Trainspotting': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Trainspotting');
    expect(train).to.contain('5');
    expect(days).to.contain('28 Days Later');
    expect(days).to.contain('0');
  });
	
//	From the component's point of view, there should just be a callback function in the props. The component should invoke that callback when the "Next" button inside it is clicked.
	it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true; //callback function

    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={Map()}
               next={next}/>
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

	it('renders the winner when there is one', () => {
		const component = renderIntoDocument(
			<Results winner="Trainspotting"
							 pair={["Trainspotting", "28 Days Later"]}
							 tally={Map()} />
		);
		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	});


});
