import { createSlice } from '@reduxjs/toolkit';

export const discussionSlice = createSlice({
  name: 'discussions',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = discussionSlice.actions;

export const selectMessages = (state) => state.discussions.messages;

export default discussionSlice.reducer;
