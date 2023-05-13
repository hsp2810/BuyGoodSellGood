import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  defUser: {
    fName: '',
    lName: '',
    email: '',
    password: '',
  },
};

export const customReducer = createReducer(initialState, {
  changeLogin: (state, action) => {
    if (action.payload === 'false') {
      state.isLogin = true;
    } else if (action.payload === 'true') {
      state.isLogin = false;
    }
  },

  setLoginUserCredentials: (state, action) => {
    state.homeUser = action.payload;
  },
});
