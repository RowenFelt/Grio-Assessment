/* Content Area
controls authentication and resulting interface
*/
import React, { Component } from 'react';
import { Button, PageHeader } from 'react-bootstrap'; // eslint-disable-line
import LoginPage from './Login';
import Homepage from './Home';

class ContentArea extends Component {
  constructor() {
    super();
    this.state = {
      view: 'login',
      errorMessage: '',
      authToken: null,
    };
  }

  signIn(data) {
	 this.setState({view: "authenticating"});
	 fetch('/authenticate', {
 	  	 method: 'POST',
		 headers: new Headers({ 'Content-type': 'application/json' }), 
		 body: JSON.stringify({ username: data.username, password: data.password }),
	   }).then((response) => {
	     this.onServerLogin(response);
	   }).catch((error) => {
	     console.log('error', error); // eslint-disable-line no-console
	   }); 
  }

  onServerLogin(response) {
    const status = response.status; //eslint-disable-line
    response.json().then((data) => {
      if (status === 200) {
		  console.log("token is", data);
        this.setState({ view: 'verified', authToken: data, errorMessage: '' }); //eslint-disable-line
        return;
      }
      this.setState({ view: 'login', errorMessage: data.errorMessage || '' });
    });
  }

  render() {
    if (this.state.view === 'login') {
      return (
        <LoginPage
          signIn={(data) => this.signIn(data)}
          errorMessage={this.state.errorMessage}
        />
      );
    }
    if (this.state.view === 'authenticating') {
      return (
        <div>
          <p>Authenticating...</p>
        </div>
      );
    }
	if (this.state.view === 'verified') {
	  return (
		<div>
		  <Homepage
		  	authToken={this.state.authToken}
		  />
		</div>
	  );
	}
  }
}


export default ContentArea;
