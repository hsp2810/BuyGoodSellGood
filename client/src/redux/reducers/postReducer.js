import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  post: undefined,
};

const postReducer = createReducer(initialState, {
  fetchedPost: (state, action) => {
    state.post = action.payload;
  },
});

export default postReducer;
