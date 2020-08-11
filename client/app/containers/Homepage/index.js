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
import hcbgImage from "../../../public/images/shop-owner.jpg";


class Homepage extends React.PureComponent {
  componentDidMount() {
   this.props.fetchBrands();
   
}

  render() {
    const { brands } = this.props;
    
    return (
      <div className='brands-page'>
      {/* <MDBCol md="6">
        <MDBInput 
        hint="Search" 
        type="text"
         containerClass="active-pink active-pink-2 mt-0 mb-3" 
         />
      </MDBCol> */}
      <div
        class="bg_image"
        style={{
          backgroundImage: 'url('+hcbgImage+')',
          backgroundSize: "cover",
          height: "45vh",
          color: "#f5f5f5"
        }}
      />
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
