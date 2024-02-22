import axios from 'axios';
import { imageUpload } from '../../utils/imageUpload'
import { GLOBALTYPES } from './globalTypes';
import { URL } from '../../utils/Url';
export const SEARCH_BOOKS_REQUEST = 'SEARCH_BOOKS_REQUEST';
export const SEARCH_BOOKS_SUCCESS = 'SEARCH_BOOKS_SUCCESS';
export const SEARCH_BOOKS_FAILURE = 'SEARCH_BOOKS_FAILURE';
export const addBook = (bookData) => async (dispatch) => {
  try {
    const res2 = await fetch(bookData.coverImage);
    const blob = await res2.blob();
    const resimage= await imageUpload (blob);
    bookData.coverImage = resimage[0].url;
    const response = await axios.post(`${URL}/api/books`, bookData);
    dispatch({type: GLOBALTYPES.ALERT, payload: {success:  response.data.msg}})
  } catch (error) {
    dispatch({type: GLOBALTYPES.ALERT, payload: {error: error.response.data.msg}})
  }
}
export const searchBooks = (params,auth) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_BOOKS_REQUEST });
   
    const response = await axios.get(`${URL}/api/books/search/${params}`);

    const resrating = await axios.get(`${URL}/api/books/rating/${response.data[0]._id}/${auth.user._id}`,      {
      headers: { Authorization: auth.token },
    });
    if(!resrating)
    {
      resrating = ""
    }
    dispatch({ type: SEARCH_BOOKS_SUCCESS, payload: response.data, rating: resrating.rating });
  } catch (error) {
    
    const errorMessage = error.response.data.msg;
    dispatch({ type: SEARCH_BOOKS_FAILURE, payload: errorMessage });
  }
};
export const getBook = (params) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_BOOKS_REQUEST });
    const response = await axios.get(`${URL}/api/books/search/${params}`);
    dispatch({ type: SEARCH_BOOKS_SUCCESS, payload: [response.data] });
  } catch (error) {
    
    const errorMessage = error.response.data.msg;
    dispatch({ type: SEARCH_BOOKS_FAILURE, payload: errorMessage });
  }
}
export const getaBook = (params) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_BOOKS_REQUEST });
    const response = await axios.get(`${URL}/api/books/${params}`);
    dispatch({ type: SEARCH_BOOKS_SUCCESS, payload: [response.data] });
  } catch (error) {
    
    const errorMessage = error.response.data.msg;
    dispatch({ type: SEARCH_BOOKS_FAILURE, payload: errorMessage });
  }
};