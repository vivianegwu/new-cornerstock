/*
 *
 * Cart
 *
 */

import React from "react";
import { connect } from "react-redux";

import actions from "../../actions";

import CartList from "../../components/CartList";
import CartSummary from "../../components/CartSummary";
import Checkout from "../../components/Checkout";
import { BagIcon, CloseIcon } from "../../components/Icon";
import Button from "../../components/Button";
import { PAYMENT_METHODS } from "../../constants";

class Cart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handlePaymentMethodChange = this.handlePaymentMethodChange.bind(this);
  }

  handlePaymentMethodChange(e) {
    changePaymentMethod(e.target.value);
  }

  payWithWallet(placeOrder, user, cartTotal) {
    return function () {
      Joovlin.popup({
        publicKey: "kjkdfjjadafkjdfa;;kdkjfdkj",
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        amount: cartTotal,
        currency: "GHS",
        reference: "454-0yusjkfo4889393",
        meta: [],
        callback: function (response) {
          console.log("success", response);
          placeOrder();
        },
        onClose: function (response) {
          console.log("closed", response);
        },
      });
    };
  }

  pickPayment(paymentMethod, placeOrder, user, cartTotal) {
    switch (paymentMethod) {
      case PAYMENT_METHODS.wallet:
        return this.payWithWallet(placeOrder, user, cartTotal);
        break;

      default:
        break;
    }
  }

  render() {
    const {
      isCartOpen,
      user,
      cartItems,
      cartTotal,
      toggleCart,
      handleShopping,
      handleCheckout,
      handleRemoveFromCart,
      placeOrder,
      changePaymentMethod,
      authenticated,
      paymentMethod,
    } = this.props;

    const proceedToOrder =
      paymentMethod == PAYMENT_METHODS.cash
        ? placeOrder
        : this.pickPayment(paymentMethod, placeOrder, user, cartTotal);

    return (
      <div className="cart">
        <div className="cart-header">
          {isCartOpen && (
            <Button
              className="btn-no-styles"
              ariaLabel="close the cart"
              icon={<CloseIcon />}
              onClick={toggleCart}
            />
          )}
        </div>
        {cartItems.length > 0 ? (
          <div className="cart-body">
            <CartList
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </div>
        ) : (
          <div className="empty-cart">
            <BagIcon />
            <p>Your shopping cart is empty</p>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="cart-checkout">
            <CartSummary cartTotal={cartTotal} />
            <div className="my-4 mx-4">
              <div className="form-check py-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod1"
                  value={PAYMENT_METHODS.wallet}
                  onChange={(e) => changePaymentMethod(e.target.value)}
                  checked={
                    paymentMethod === PAYMENT_METHODS.wallet ? true : false
                  }
                />
                <label className="form-check-label" htmlFor="paymentMethod1">
                  Pay with Mobile Wallet
                </label>
              </div>
              <div className="form-check py-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod2"
                  value={PAYMENT_METHODS.cash}
                  onChange={(e) => changePaymentMethod(e.target.value)}
                  checked={
                    paymentMethod === PAYMENT_METHODS.cash ? true : false
                  }
                />
                <label className="form-check-label" htmlFor="paymentMethod2">
                  Cash on delivery
                </label>
              </div>
            </div>
            <Checkout
              handleShopping={handleShopping}
              handleCheckout={handleCheckout}
              placeOrder={proceedToOrder}
              authenticated={authenticated}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isCartOpen: state.navigation.isCartOpen,
    user: state.account.user,
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal,
    paymentMethod: state.cart.paymentMethod,
    authenticated: state.authentication.authenticated,
  };
};

export default connect(mapStateToProps, actions)(Cart);
