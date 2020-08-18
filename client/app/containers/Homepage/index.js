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
      if (data.length > 1) {
        this.props.fetchSearch(data);
      } else {
        this.props.fetchProducts();
      }
    };
    return (
      <React.Fragment>

        {/* <MDBCol md="6">
        <MDBInput 
        hint="Search for products..." 
        type="text"
        containerClass="active-pink active-pink-2 mt-0 mb-3" 
        />
      </MDBCol> */}


        <section className="container-fluid hero" style={{ backgroundImage: 'url(' + hcbgImage + ')' }}>
          <div className="overlay" />
          <h1 className="companyName">Conerstock</h1>
          <h6 className="slogan">Your favorite store is in stock</h6>
          <SearchBar className="searchbar" onSearch={handleSearch} />
        </section>

        {/* ======== render the products component here ========== */}
        <div className='products-page'>
          <ProductList products={products} />
        </div>
        {/* ======== render the products component here ========== */}

      </React.Fragment>
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
