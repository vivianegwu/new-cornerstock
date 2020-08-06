/**
 *
 * Homepage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';
import BrandList from '../../components/BrandList';
import { MDBCol, MDBInput } from "mdbreact";


class Homepage extends React.PureComponent {
  componentDidMount() {
   this.props.fetchBrands();
  }

  render() {
    const { brands } = this.props;

    return (
      <div className='brands-page'>
      <MDBCol md="6">
        <MDBInput 
        hint="Search" 
        type="text"
         containerClass="active-pink active-pink-2 mt-0 mb-3" 
         />
      </MDBCol>
        <BrandList brands={brands} />
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    brands: state.brand.brands
  };
};

export default connect(mapStateToProps, actions)(Homepage);
