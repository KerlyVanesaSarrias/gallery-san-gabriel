import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { memo, useEffect } from 'react';
import {
    fetchGallery,
    GalleryCategories,
    MediaItem,
} from '../slices/GalerySlice/gallerySlice';
import { ThumbnailMedia } from '../../../ui-elments/components';
import { Loader } from '../../../assets/images/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userActions } from '../../AuthModule/slices/UserSlice/userSlice';

interface GalleryPageProps {
    category?: GalleryCategories;
}

const GalleryPage = ({ category = 'all' }: GalleryPageProps) => {
    const { error, isLoading, media } = useSelector(
        (state: RootState) => state.gallery
    );
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleFavoriteClick = (item: MediaItem) => (isFavorite: boolean) => {
        if (!user.isAuthenticated) {
            toast.warning('You must be login to add to favorites');
            navigate('/login');
            return;
        }
        dispatch(userActions.setFavoritesMedia({ isFavorite, media: item }));
    };

    useEffect(() => {
        dispatch(fetchGallery(category));
    }, [category, dispatch]);

    if (isLoading) {
        return (
            <div className="w-full flex item-center justify-center pt-24">
                <div className="w-28 h-20 relative">
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <div className="py-8 px-8 sm:px-14 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-50">
            {media.map((item) => {
                const { thumbnail, type, id } = item;
                const isFavorite = user.myFavoritesMedia.some(
                    (item) => item.id === id
                );

                return (
                    <ThumbnailMedia
                        key={id}
                        thumbnail={thumbnail}
                        type={type}
                        onFavoriteClick={handleFavoriteClick(item)}
                        isFavorite={isFavorite}
                    />
                );
            })}
        </div>
    );
};

export default memo(GalleryPage);
