import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaItem } from '../../../GalleryModule/slices/GalerySlice/gallerySlice';
import { USER } from '../../../GalleryModule/constants';

interface User {
    email: string;
    name: string;
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    myFavoritesMedia: MediaItem[];
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    myFavoritesMedia: [],
};

interface LoginResponse {
    succes: boolean;
    user: User | null;
}

interface LoginPayload {
    email: string;
    password: string;
}

export const fetchLogin = createAsyncThunk<LoginResponse, LoginPayload>(
    'user/fetchLogin',
    async ({ email, password }) => {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                if (email === USER.email && password === USER.password) {
                    resolve({
                        succes: true,
                        user: { name: USER.name, email: USER.email },
                    });
                } else {
                    reject({ succes: false, user: null });
                }
                clearTimeout(timer);
            }, 800);
        });
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(
                fetchLogin.fulfilled,
                (state, action: PayloadAction<LoginResponse>) => {
                    state.isLoading = false;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.error = null;
                }
            )
            .addCase(fetchLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.error.message || 'Invalid credentials';
            });
    },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
