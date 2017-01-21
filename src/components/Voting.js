import React from 'react';
import { connect } from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

// PureRenderMixin has been deprecated and now you can use React.PureComponent
class Voting extends React.PureComponent{
  constructor(props) {
		super(props);
	}
	render() {
    return (
			<div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />} 
        
    	</div>
		);
  }
}

function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
		hasVoted: state.get('hasVoted'),
		winner: state.get('winner')
	};
}

// regarding actionCreators
//A vote prop will be given to Voting. That prop is a function that creates an action using the vote action creator, and also dispatches that action to the Redux Store. Thus, clicking a vote button now dispatches an action! You should be able to see the effects in the browser immediately: When you vote on something, the buttons will become disabled.

// this.props.vote() callback is connected from actionCreators (pass up the vote choice info to state)

// these props are being passed down from mapStateToProps (pass down, which is getting from redux-store)
// this.props.pair
// this.props.hasVoted
// this.props.winner 

export default connect(mapStateToProps, actionCreators)(Voting);