import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDataAPI, postDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../actions/globalTypes';

export const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    loadingFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    reviewsReceived: (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload;
      state.error = null;
    },
    reviewAdded: (state, action) => {
      state.isLoading = false;
      state.reviews.push(action.payload);
      state.error = null;
    },
    reviewLiked: (state, action) => {
      const review = state.reviews.find(review => review._id === action.payload.reviewId);
      if (review) {
        review.likes = action.payload.likes;
      }
    },
    reviewCommented: (state, action) => {
      const reviewId = action.payload.reviewId;
      const reviewIndex = state.reviews.findIndex(review => review._id === reviewId);
      if (reviewIndex !== -1) {
        state.reviews[reviewIndex].comments.push(action.payload);
      }
    },
  },
});

// Action creators
export const { startLoading, loadingFailed, reviewsReceived, reviewAdded, reviewLiked, reviewCommented } = reviewSlice.actions;

// Async function to fetch data from API
export const fetchReviews = (bookId) => async dispatch => {
  dispatch(startLoading());
  try {
    const response = await getDataAPI(`books/reviews/${bookId}`);
    dispatch(reviewsReceived(response.data));
  } catch (error) {
    dispatch(loadingFailed(error.response.data.message));
  }
};

export const addReview = ({ userId, bookId, reviewText ,rating }) => async dispatch => {
  dispatch(startLoading());
  try {
    const response = await postDataAPI(`books/review/${userId}/${bookId}`, { reviewText: reviewText,rating });
    dispatch(reviewAdded(response.data));
    
  } catch (error) {
        dispatch(loadingFailed());
        dispatch({type:GLOBALTYPES.ALERT, payload: {error:error.response.data.message} })
    console.error(error);
  }
};

export const likeReview = ({ userId, reviewId }) => async dispatch => {
  try {
    const response = await axios.put(`${URL}/api/books/review/like/${userId}/${reviewId}`);
    dispatch(reviewLiked(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const commentReview = ({ userId, reviewId, content }) => async dispatch => {
  try {
    const response = await postDataAPI(`/books/review/comment/${userId}/${reviewId}`, { content });
    dispatch(reviewCommented({ ...response.data, reviewId }));
  } catch (error) {
    console.error(error);
  }
};

// Selectors
export const selectReviews = state => state.review.reviews;
export const selectLoading = state => state.review.isLoading;
export const selectError = state => state.review.error;

export default reviewSlice.reducer;
