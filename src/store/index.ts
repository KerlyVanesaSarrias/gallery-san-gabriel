import { configureStore } from '@reduxjs/toolkit';
import { galleryReducer } from '../modules/GalleryModule/slices/GalerySlice/gallerySlice';
import { userReducer } from '../modules/AuthModule/slices/UserSlice/UserSlice';

const store = configureStore({
    reducer: {
        gallery: galleryReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
