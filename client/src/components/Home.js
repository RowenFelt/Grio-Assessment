/* Home.js
 * The homepage component, shows counter and increment button.
 * Also manages view of modal cancel/confirm window.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import "./Home.css";

const CenteredHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FancyButton = styled.button`
  background-color: #33a1d4;
  color: white;
  padding: 4px 5px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
`;


// modal window example taken from https://github.com/reactjs/react-modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

/*
 * props: { authToken: a string authentication token }
 */

class Homepage extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  count: 0,
	  tempCount: 0,
	  confirmationView: false
	};
	this.increment = this.increment.bind(this);
	this.cancelIncrement = this.cancelIncrement.bind(this);
	this.confirmIncrement = this.confirmIncrement.bind(this);
	this.fetchIncrement = this.fetchIncrement.bind(this);
  }

  componentDidMount() {
	ReactModal.setAppElement('body');
  }

  onIncrementResponse(response) {
	const status = response.status; //eslint-disable-line
	response.json().then((data) => {
	  if (status === 200) {
		this.setState({ tempCount: data }); //eslint-disable-line
		return;
	  } else {
		console.log("Incrementing unsuccessful");
	  }
	}); 
  }

  fetchIncrement() {
	fetch('/incrementCounter', {
	  method: 'POST',
	  headers: new Headers({ 'Content-type': 'application/json' }),
	  body: JSON.stringify({ counter: this.state.count, token: this.props.authToken }),
	}).then((response) => {
	  this.onIncrementResponse(response);
	}).catch((error) => {
	  console.log('error', error); // eslint-disable-line no-console
	});
  }

  increment() {
	this.fetchIncrement()
	this.setState({ confirmationView: true });
  };

  cancelIncrement() {
	this.setState({ confirmationView: false });
  };

  confirmIncrement() {
	this.setState({ count: this.state.tempCount });
	this.cancelIncrement();
  };


  render() {
	return (
	  <div>
		<CenteredHeader>
		  <h3 className="shift-right">Count: {this.state.count}</h3>
		  <FancyButton 
			id="FancyButton"
			className="shift-right-more" 
			onClick={ () => this.increment()}>
			  Increment
		  </FancyButton>
		  <ReactModal
			isOpen={this.state.confirmationView}
			style={customStyles}
			contentLabel="Increment confirmation modal window">
			  <h3>Current count: {this.state.count}</h3> 
			  <h3>Next count: {this.state.tempCount}</h3>
			  <button 
				id="CancelButton"
				onClick={ () => this.cancelIncrement()}>Cancel</button>
			  <button 
				id="ConfirmButton"
				onClick={ () => this.confirmIncrement()}>Confirm</button>
		  </ReactModal>
		</CenteredHeader>
	  </div>
	);
  }
}

Homepage.propTypes = {
  authToken: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Homepage;
