import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  notLoginUser: {
    fName: '',
    lName: '',
    email: '',
    password: '',
  },
};

export const authReducer = createReducer(initialState, {
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
