/* Menu.js
  wrapper for the overall interface
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button, Modal, Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import Sortable from 'react-sortablejs';

import Ballot from './Ballot';
import CurrentCommittees from './CurrentCommittees';
import CreateBallot from './CreateBallot';
import ElectionResults from './ElectionResults';

function MenuSections(props) {
  // Determine whether user is admin or voter
  const {
    user, setSection, setShowPref, onLogout, name,
  } = props;

  let menuArray;
  if (!user.admin) {
    menuArray = ['Current Committees', 'Ballot'];
  } else {
    menuArray = ['Current Committees', 'Ballot', 'Create Ballot', 'Election Results'];
  }

  const menuItems = menuArray.map(section => (
    <NavItem
      key={section}
      onClick={() => { setSection(section); }}
    >
      {section}
    </NavItem>
  ));

  return (
    // <StyledUL> {menuItems} </StyledUL>
    <Navbar inverse collapseOnSelect>
      <Navbar.Collapse>
        <Nav>
          {menuItems}
        </Nav>
        <Nav pullRight>
          <NavDropdown eventKey={3} title={name} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} onClick={() => { setShowPref(true); }}>Preferences</MenuItem>
            <MenuItem eventKey={3.2} onClick={() => { onLogout(); }}>Sign Out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function setPreferred(pref) {
  let prefString = pref;
  const preferences = [];

  if (prefString === undefined) {
    prefString = '0000000';
  }

  const committeesKey = {
    'Promotions Committee': 0,
    'Reappointments Committee': 1,
    'Faculty Council': 2,
    'Educational Affairs Committee': 3,
    'Strategy Committee': 4,
    'Resources Committee': 5,
    'Appeals Council': 6,
  };

  for (let i = 0; i < prefString.length; i += 1) {
    const prefNumber = prefString.charAt(i);
    if (prefNumber !== '0') {
      const committee = Object.keys(committeesKey).find(key => committeesKey[key] === i);
      preferences[prefNumber - 1] = committee;
    }
  }

  return preferences;
}

function setNoPreference(pref) {
  let prefString = pref;
  const noPreference = [];

  if (prefString === undefined) {
    prefString = '0000000';
  }

  const committeesKey = {
    'Promotions Committee': 0,
    'Reappointments Committee': 1,
    'Faculty Council': 2,
    'Educational Affairs Committee': 3,
    'Strategy Committee': 4,
    'Resources Committee': 5,
    'Appeals Council': 6,
  };

  for (let i = 0; i < prefString.length; i += 1) {
    const prefNumber = prefString.charAt(i);
    if (prefNumber === '0') {
      const committee = Object.keys(committeesKey).find(key => committeesKey[key] === i);
      noPreference.push(committee);
    }
  }
  return noPreference;
}


class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      currentItem: 'Current Committees',
      showPref: false,
      preferred: setPreferred(this.props.user.preferences),
      noPreference: setNoPreference(this.props.user.preferences),
    };
  }

  handleClose() {
    this.setState({ showPref: false });
  }

  handleSave() {
    const committeesKey = {
      'Promotions Committee': 0,
      'Reappointments Committee': 1,
      'Faculty Council': 2,
      'Educational Affairs Committee': 3,
      'Strategy Committee': 4,
      'Resources Committee': 5,
      'Appeals Council': 6,
    };

    let prefs = this.props.user.preferences;
    let prefCount = 1;

    this.state.preferred.forEach((committeeName) => {
      const id = committeesKey[committeeName];
      prefs = prefs.substring(0, id) + prefCount + prefs.substring(id + 1);
      prefCount += 1;
    });

    fetch(`/candidate/preferences/${this.props.user._id}`, { // eslint-disable-line no-underscore-dangle
      method: 'PUT',
      headers: new Headers({ 'Content-type': 'application/json' }),
      body: JSON.stringify({ prefs }),
    }).then((response) => {
      if (response.ok) {
        this.props.fetchCallback();
        return response.json();
      }
      throw new Error(response.status_text);
    }).catch((error) => {
      console.log('error', error); // eslint-disable-line no-console
    });
    this.setState({ showPref: false });
  }

  render() {
    const sections = (<MenuSections
      user={this.props.user}
      setSection={section =>
        this.setState({ currentItem: section })
      }
      name={this.props.user.first_name}
      setShowPref={bool =>
        this.setState({ showPref: bool })
      }
      onLogout={this.props.onLogout}
    />);

    const groupLeft = this.state.preferred.map(val => (
      <div key={val} data-id={val}>{val}</div>
    ));
    const groupRight = this.state.noPreference.map(val => (
      <div key={val} data-id={val}>{val}</div>
    ));
    const prefs = (
      <div>
        <Modal show={this.state.showPref} onHide={this.handleClose} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Committee Preferences</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-6">
                <h3>Your Preferences (in order)</h3>
                <Sortable
                  options={{
                            animation: 150,
                            group: {
                                name: 'shared',
                                pull: true,
                                put: true,
                            },
                        }}
                  className="block-list"
                  ref="group-left" // eslint-disable-line react/no-string-refs
                  onChange={(items) => {
                            this.setState({ preferred: items });
                        }}
                >
                  {groupLeft}
                </Sortable>
              </div>
              <div className="col-sm-6">
                <h3>Committees</h3>
                <Sortable
                  options={{
                            animation: 150,
                            group: {
                                name: 'shared',
                                pull: true,
                                put: true,
                            },
                        }}
                  className="block-list"
                  onChange={(items) => {
                            this.setState({ noPreference: items });
                        }}
                  ref="group-right"// eslint-disable-line react/no-string-refs
                >
                  {groupRight}
                </Sortable>
              </div>
            </div>
            <div>
              <h4>Your Current Preferences:</h4>
              {this.state.preferred.map(val => (
                <div key={val}>{this.state.preferred.indexOf(val) + 1}: {val}</div>))}
            </div>
            <div>
              <h4>No Preference:</h4>
              {this.state.noPreference.map(val => (
                <div key={val}>{val}</div>))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button onClick={this.handleSave} bsStyle="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );

    let view;
    if (this.state.currentItem === 'Ballot') {
      view = (<Ballot
        user={this.props.user}
        candidates={this.props.candidates}
        authToken={() => this.props.authToken()}
        currentCommittee={this.props.currentCommittee}
      />);
    } else if (this.state.currentItem === 'Current Committees') {
      view = <CurrentCommittees user={this.props.user} authToken={() => this.props.authToken()} />;
    } else if (this.state.currentItem === 'Create Ballot') {
      view = (<CreateBallot
        fetchCallback={() => this.props.fetchCallback()}
        authToken={() => this.props.authToken()}
      />);
    } else if (this.state.currentItem === 'Election Results') {
      view = (<ElectionResults
        candidates={this.props.candidates}
        currentCommittee={this.props.currentCommittee}
        authToken={() => this.props.authToken()}
      />);
    }


    return (
      <div>
        {sections}
        {view}
        {prefs}
      </div>
    );
  }
}

MenuSections.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    faculty_id: PropTypes.number,
    year_hired: PropTypes.number,
    dept_id: PropTypes.number,
    division_id: PropTypes.number,
    chair: PropTypes.number,
    program: PropTypes.string,
    director: PropTypes.string,
    on_leave: PropTypes.number,
    amnesty: PropTypes.number,
    rank_id: PropTypes.number,
    tt: PropTypes.number,
    term: PropTypes.number,
    username: PropTypes.string,
    preferences: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  setSection: PropTypes.func.isRequired,
  setShowPref: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

Menu.propTypes = {
  candidates: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onLogout: PropTypes.func.isRequired,
  authToken: PropTypes.func.isRequired,
  currentCommittee: PropTypes.string.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    faculty_id: PropTypes.number,
    year_hired: PropTypes.number,
    dept_id: PropTypes.number,
    division_id: PropTypes.number,
    chair: PropTypes.number,
    program: PropTypes.string,
    director: PropTypes.string,
    on_leave: PropTypes.number,
    amnesty: PropTypes.number,
    rank_id: PropTypes.number,
    tt: PropTypes.number,
    term: PropTypes.number,
    username: PropTypes.string,
    preferences: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  fetchCallback: PropTypes.func.isRequired,
};

export default Menu;
