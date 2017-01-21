import { List, Map } from 'immutable';


//immutableJS .merge will make a new copy of the state and return it as immutableJS
function setState(state, newState) {
  return state.merge(newState);
}


//use immutableJS .getIn method to get info, use .includes to check if it has entry
// vote: {
//		pair: ['Trainspotting', 'Sunshine']		
//	}


//if vote entry matches an entry in the current pair, set hasVoted prop to that entry
function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}

//if hasVoted already has an entry that matches the current pair, remove hasVoted
function resetVote(state) {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], List());
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

//reducers
export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
	case 'VOTE':
		return vote(state, action.entry);
  }
  return state;
}