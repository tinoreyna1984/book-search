import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';

// invocamos los reducers en el store
export default configureStore({
  reducer: {
    modal : modalReducer,
  }
})