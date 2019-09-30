import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, PageHeader, Form, FormGroup, Label, Grid, Row} from 'react-bootstrap'; // eslint-disable-line

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
    administratorView: callback to show admin view
    ballotView: callback to show ballot view
*/

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
	}

  render() {
  return (
    <div>
	  <div id="mysection">
	  	<p>hello</p>
	  </div>
    <div align="center">{this.props.errorMessage}</div>
    </div>
  );
	}

}

Homepage.propTypes = {
  authToken: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Homepage;
