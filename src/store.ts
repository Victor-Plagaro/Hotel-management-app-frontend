import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/Slices/userSlice';
import hotelReducer from './components/Slices/hotelSlice';
import imageReducer from './components/Slices/imageSlice';
import themeReducer from './components/Slices/themeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
    image: imageReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
