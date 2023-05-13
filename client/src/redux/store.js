import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import postReducer from './reducers/postReducer';

// configuring the store and passing all the reduxers to the store
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
