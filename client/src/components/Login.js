import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, PageHeader, Form, FormGroup, Label} from 'react-bootstrap'; // eslint-disable-line


const StyledButton = styled(Button)`
  width: 200px;
  margin: 0 auto 10px;
  list-style-type: none;
  overflow: hidden;
`;

const StyledPageHeader = styled(PageHeader)`
  text-align: center;
`;

/* props:
 * signIn: callback to login API
 * errorMessage: callback to error message string
*/

class LoginPage extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  username: "",
	  password: ""
	};
  }

  render() {
	return (
	  <div align="center">
		<StyledPageHeader>Please Login</StyledPageHeader>
		<Form onSubmit={ () => this.props.signIn(this.state)}>
		  <FormGroup>
			<div>Email address</div>
			<input type="username" id='username' placeholder="Username" 
			  onChange={ (e) => this.setState({username: e.target.value})}/>
			</FormGroup>
		  <FormGroup>
			<div>Password</div>
			<input type="password" id='password' placeholder="Password"
			  onChange={ (e) => this.setState({password: e.target.value})}/>
			</FormGroup>
		  <StyledButton id="login_button" type="submit">Submit</StyledButton>
		</Form>
	  </div>
	);
  }
}

LoginPage.propTypes = {
  signIn: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  errorMessage: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default LoginPage;
