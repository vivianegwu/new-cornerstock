/**
 *
 * ProductPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { BagIcon } from '../../components/Icon';
import NotFound from '../../components/NotFound';
import LoadingIndicator from '../../components/LoadingIndicator';

import { FaMap, FaPhone, FaWhatsapp, FaMapMarker } from 'react-icons/fa'


class ProductPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchProduct(slug);
    document.body.classList.add('product-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchProduct(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('product-page');
  }

  render() {
    const {
      isLoading,
      product,
      productShopData,
      shopFormErrors,
      itemsInCart,
      productShopChange,
      handleAddToCart,
      handleRemoveFromCart
    } = this.props;

    return (
      <div className='product-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <Row>
            <Col xs='12' md='5' lg='5' className='mb-3'>
              <div className='item-image'>
                {/* <img src= {'/images/product-placeholder.jpg'} /> */}
                <img src= {`/images/products/${product.slug}.jpg`} />
                {product.quantity < 0 && !shopFormErrors['quantity'] ? (
                  <p className='stock out-of-stock'>Out of stock</p>
                ) : (
                    <p className='stock in-stock'>In stock</p>
                  )}
              </div>
            </Col>
            <Col xs='12' md='7' lg='7' className='mb-3'>
              <div className='product-container'>
                <div className='item-box'>
                  <div className='item-details'>
                    <h1 className='item-name'>{product.name}</h1>
                    {/* <p className='whatsapp'><FaWhatsapp size={25} style={{ fill: 'green' }}/> {product.whatsapp}</p> */}
                    {/* <p className="address"><FaMapMarker size={25} style={{ fill: 'red' }}/>{product.address}</p> */}

                    <a href= "https://api.whatsapp.com/send?text=Hi, I'm inquiring about this item listed on cornerstock." 
                        target="_blank" 
                        className="btn">
                        <FaWhatsapp 
                        size={25} 
                        style={{ fill: 'green' }}/>{product.whatsapp}
                    </a>

                    <br/>

                    <a href= 'http://www.google.com/maps/' 
                        target="_blank" 
                        className="btn">
                        <FaMapMarker 
                        size={25} 
                        style={{ fill: 'red' }}/>{product.address}
                    </a>

                    <hr />
                    {product.brand && (
                      <p className='by'>
                        see more products from{' '}
                        <Link to={`/shop/brand/${product.brand.merchant}`} className='brand-link'>
                          {product.brand.name}
                        </Link>
                      </p>
                    )}

                    <p className='item-desc'>{product.description}</p>
                    <p className='price'>GH₵{product.price}</p>
                  </div>
                  
                  <div className='item-customize'>
                    <Input
                      type={'number'}
                      error={shopFormErrors['quantity']}
                      label={'Quantity'}
                      name={'quantity'}
                      min={1}
                      placeholder={'Product Quantity'}
                      disabled={
                        product.quantity <= 0 && !shopFormErrors['quantity']
                      }
                      value={productShopData.quantity}
                      onInputChange={(name, value) => {
                        productShopChange(name, value);
                      }}
                    />
                  </div>
                  <div className='item-actions'>
                    {itemsInCart.includes(product._id) ? (
                      <Button
                        disabled={
                          product.quantity <= 0 && !shopFormErrors['quantity']
                        }
                        text='Remove From Bag'
                        className='bag-btn'
                        icon={<BagIcon />}
                        onClick={() => handleRemoveFromCart(product)}
                      />
                    ) : (
                        <Button
                          disabled={
                            product.quantity <= 0 && !shopFormErrors['quantity']
                          }
                          text='Add To Cart'
                          className='bag-btn' 
                          icon={<BagIcon />}
                          onClick={() => handleAddToCart(product)}
                        />
                      )}
                      <div>
                      <a href= 'http://www.google.com/maps' target="_blank" className="btn"> <FaMap size={25} style={{ fill: 'blue' }}/></a>

                      <a href="tel:5551234567" className="btn"> <FaPhone size={25} style={{ fill: 'red' }}/></a>

                      <a href= "https://api.whatsapp.com/send?text=Hi, I'm inquiring about this item listed on cornerstock."
                      class="social-icon whatsapp" 
                      target="_blank" 
                      className="btn"> 
                      <FaWhatsapp 
                      size={25} 
                      style={{ 
                        fill: 'green' 
                        }}
                        
                        />
                        </a>
                  </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
              <NotFound message='no product found.' />
            )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.product,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    itemsInCart: state.cart.itemsInCart,
    isLoading: state.product.isLoading
  };
};

export default connect(mapStateToProps, actions)(ProductPage);
