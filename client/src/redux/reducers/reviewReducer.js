import {
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILURE,
  } from '../actions/reviewActions';
  
  const initialState = {
    review: {},
    loading: false,
    error: null,
  };
  
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_REVIEW_REQUEST:
        return { ...state, loading: true };
      case CREATE_REVIEW_SUCCESS:
        return { ...state, loading: false, review: action.payload };
      case CREATE_REVIEW_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default reviewReducer;
  