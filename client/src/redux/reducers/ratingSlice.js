import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { postDataAPI } from '../../utils/fetchData';
import { updateAveragerating } from './booksSlice';
import { PROFILE_TYPES, getProfileUsers } from '../actions/profileAction';

export const submitRating = createAsyncThunk(
  'ratings/submitRating',
  async ({ bookId, rating, auth }, { rejectWithValue, dispatch }) => {
    try {
       const response = await postDataAPI(`books/rating/${bookId}`, { rating }, auth.token);
       dispatch(updateAveragerating({ bookId, newRating: rating }));
       dispatch({type:PROFILE_TYPES.GET_POSTS, payload:response.data })
       dispatch(getProfileUsers({id: auth.user._id,auth: auth}))
       return {bookId,rating};
    } catch (err) {
    
      return rejectWithValue(err.response.data);
    }
  }
);
export const getRatings = createAsyncThunk()


const ratingSlice = createSlice({
  name: 'ratings',
  initialState: { rating: null, status: 'idle', error: null, isLoading:false , booksid:[]},
  reducers: {},
  extraReducers: {
    [submitRating.pending]: (state) => {
      state.isLoading = true;
    },
    [submitRating.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.rating = action.payload.rating;

      state.booksid.push(action.payload.bookId)
      state.isLoading = false;
    },
    [submitRating.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default ratingSlice.reducer;
