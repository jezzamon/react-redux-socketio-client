import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({Trainspotting: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);
		
		// reminder: .fromJS will turn obj/arr into an immutable.js structure
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }));
  });
	
	// The reducers should be able to receive plain JavaScript data structure, as opposed to an Immutable data structure, since that's what actually get from the socket. It should still be turned into an immutable data structure by the time it is returned as the next value:
	
	it('handles SET_STATE with plain JS payload', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {Trainspotting: 1}
				}
			}
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		}));
	});

// As part of the reducer contract, an undefined initial state should also be correctly initialized into an Immutable data structure by the reducer:
	
	it('handles SET_STATE without initial state', () => {
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {Trainspotting: 1}
				}
			}
		};
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		}));
	});
	
	it('handles VOTE by setting hasVoted', () => {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		});
		const action = {type: 'VOTE', entry: 'Trainspotting'};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			},
			hasVoted: 'Trainspotting'
		}));
	});

	it('does not set hasVoted for VOTE on invalid entry', () => {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		});
		const action = {type: 'VOTE', entry: 'Sunshine'};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		}));
	});
	
	it('removes hasVoted on SET_STATE if pair changes', () => {
		const initialState = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			},
			hasVoted: 'Trainspotting'
		});
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Sunshine', 'Slumdog Millionaire']
				}
			}
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Sunshine', 'Slumdog Millionaire']
			}
		}));
	});
});