import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from '../constants';

interface MediaItem {
    id: string | number;
    type: 'image' | 'video';
    thumbnail: string;
    url: string;
}

interface GalleryState {
    media: MediaItem[];
    isLoading: boolean;
    error: string | null;
}

const initialState: GalleryState = {
    media: [],
    isLoading: false,
    error: null,
};

type DataResponseItem = {
    id: string | number;
    webformatURL: string;
    largeImageURL: string;
};

type DataResponseVideo = {
    id: string | number;
    videos: {
        large: { url: string; thumbnail: string };
    };
};

const getImages = async (category: string) => {
    const categoryQuery = category === 'all' ? '' : `&category=${category}`;

    const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&orientation=horizontal${categoryQuery}&per_page=10`
    );

    return response.data.hits.map(
        (item: DataResponseItem) =>
            ({
                id: item.id,
                type: 'image',
                thumbnail: item.webformatURL,
                url: item.largeImageURL,
            }) as MediaItem
    );
};

const getVideos = async (category: string) => {
    const categoryQuery = category === 'all' ? '' : `&category=${category}`;

    const response = await axios.get(
        `https://pixabay.com/api/videos?key=${API_KEY}&orientation=horizontal${categoryQuery}&per_page=10`
    );

    return response.data.hits.map(
        (item: DataResponseVideo) =>
            ({
                id: item.id,
                type: 'video',
                thumbnail: item.videos.large.thumbnail,
                url: item.videos.large.url,
            }) as MediaItem
    );
};

export const fetchGallery = createAsyncThunk<MediaItem[], string | undefined>(
    'gallery/fetchGallery',
    async (category: string = 'all') => {
        const [images, videos] = await Promise.all([
            getImages(category),
            getVideos(category),
        ]);
        const combined = [...images, ...videos];

        for (let i = combined.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combined[i], combined[j]] = [combined[j], combined[i]];
        }

        return combined;
    }
);

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGallery.pending, (state) => {
                state.media = [];
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                fetchGallery.fulfilled,
                (state, action: PayloadAction<MediaItem[]>) => {
                    state.isLoading = false;
                    state.media = action.payload;
                    state.error = null;
                }
            )
            .addCase(fetchGallery.rejected, (state, action) => {
                state.isLoading = false;
                state.media = [];
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const galleryActions = gallerySlice.actions;
export const galleryReducer = gallerySlice.reducer;
