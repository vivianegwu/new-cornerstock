/**
 *
 * Homepage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';
import ProductList from '../../components/ProductList';
import { MDBCol, MDBInput } from "mdbreact";
import hcbgImage from "../../../public/images/shop2.jpg";

import SearchBar from '@opuscapita/react-searchbar';



class Homepage extends React.PureComponent {
  componentDidMount() {
   this.props.fetchProducts();
}

  render() {
    const { products, searchResult } = this.props;
    const handleSearch = data => {
      console.log(data);
      if(data.length > 1) {
        this.props.fetchSearch(data);
      } else {
        this.props.fetchProducts();
      }
    };
    return (
      <div className='products-page'>
      {/* <MDBCol md="6">
        <MDBInput 
        hint="Search for products..." 
        type="text"
         containerClass="active-pink active-pink-2 mt-0 mb-3" 
         />
      </MDBCol> */}

      <SearchBar
        onSearch={handleSearch}
      />

      <div
        class="bg_image"
        style={{
          backgroundImage: 'url('+hcbgImage+')',
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5"
        }}
      />
        <ProductList products={products} />
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    searchResult: state.homepage.searchResult
  };
};

export default connect(mapStateToProps, actions)(Homepage);
