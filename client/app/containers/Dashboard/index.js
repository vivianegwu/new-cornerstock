/**
 *
 * Dashboard
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import Admin from '../Admin';
import Customer from '../Customer';
import Merchant from '../Merchant'

class Dashboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    const { user } = this.props;

    if (user.role === 'ROLE_MERCHANT') {
      return <Admin />;
    } else {
      return <Customer />;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
