import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { ThunkMiddleware } from 'redux-thunk';
import userReducer from '../features/userSlice';
import articleReducer from '../features/articleReducer';



export const store = configureStore({
  reducer: {
    user: userReducer,
    postState: articleReducer,
  },
});
