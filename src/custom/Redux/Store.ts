import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './Reducers/Album/AlbumSlice';
// import textCounterReducer from "../features/textCounter/textCounterSlice";

export default configureStore({
  reducer: {
    music: musicReducer,
    // textCounter: textCounterReducer
  },
});