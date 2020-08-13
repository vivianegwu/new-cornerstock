/*
 *
 * Homepage actions
 *
 */

import { DEFAULT_ACTION, SEARCH_ACTION } from './constants';
import {REPLACE_PRODUCTS} from "../Product/constants";
import handleError from '../../utils/error';
import axios from 'axios';

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
};

export const fetchSearch = (query) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/product/search?search=${query}`);
      console.log(response.data);
      dispatch({
        type: SEARCH_ACTION,
        payload: response.data
      });
      dispatch({
        type: REPLACE_PRODUCTS,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
      handleError(error, dispatch);
    }
  };
};
