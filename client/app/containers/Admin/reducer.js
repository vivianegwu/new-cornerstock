/*
 *
 * Admin reducer
 *
 */

import { TOGGLE_ADMIN_MENU } from './constants';

const initialState = {
  isMenuOpen: false,
  adminLinks: [
    { to: '', name: 'account details' },
    { to: '/products', name: 'products' },
    { to: '/categories', name: 'categories' },
    { to: '/brands', name: 'brands' },
    { to: '/users', name: 'Users' },
    { to: '/merchants', name: 'Merchants/Vendors' },
    { to: '/orders', name: 'Orders' }
  ]
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADMIN_MENU:
      return { ...state, isMenuOpen: !state.isMenuOpen };
    default:
      return state;
  }
};

export default adminReducer;
