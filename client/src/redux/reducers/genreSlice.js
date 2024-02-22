import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDataAPI, postDataAPI } from '../../utils/fetchData';

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
      state.error =null;
    },
    reviewAdded: (state, action) => {
        state.isLoading = false;
      state.reviews.push(action.payload);
    },
  },
});

// Action creators
export const { startLoading, loadingFailed, reviewsReceived, reviewAdded } = reviewSlice.actions;

// Async function to fetch data from API
export const fetchReviews = (bookId) => async dispatch => {
  dispatch(startLoading());
  try {
    const response = await getDataAPI(`books/reviews/${bookId}`);
    dispatch(reviewsReceived(response.data));
  } catch (error) {
    dispatch(loadingFailed(error.message));
  }
};

export const addReview = ({userId,bookId,reviewText,rating}) => async dispatch => {
    dispatch(startLoading());
  try {
    const response = await postDataAPI(`books/review/${userId}/${bookId}`,{reviewText: reviewText, rating: rating});
    dispatch(reviewAdded(response.data));
  } catch (error) {
    console.error(error);
  }
};

// Selectors
export const selectReviews = state => state.review.reviews;
export const selectLoading = state => state.review.isLoading;
export const selectError = state => state.review.error;

export default reviewSlice.reducer;
