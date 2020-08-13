/*
 *
 * Homepage reducer
 *
 */

import { DEFAULT_ACTION, SEARCH_ACTION } from './constants';

const initialState = {
  searchResult : []
};

const homepageReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SEARCH_ACTION:
      return {
        ...state,
        searchResult: action.payload
      };
    case DEFAULT_ACTION:
      return newState;
    default:
      return state;
  }
};

export default homepageReducer;
