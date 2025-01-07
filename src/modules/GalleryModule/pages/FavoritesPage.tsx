import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { ThumbnailMedia } from '../../../ui-elments/components';
import { MediaItem } from '../slices/GalerySlice/gallerySlice';
import { userActions } from '../../AuthModule/slices/UserSlice/userSlice';
import { useState } from 'react';
import { PreviewModal } from '../Components';

const FavoritesPage = () => {
    const { myFavoritesMedia } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isOpenPreview, setIsOpenPreview] = useState(false);
    const [mediaPreview, setMediaPreview] = useState<MediaItem | null>(null);

    const handleFavoriteClick = (item: MediaItem) => (isFavorite: boolean) => {
        dispatch(userActions.setFavoritesMedia({ isFavorite, media: item }));
    };

    const handleTogglePreviewModal = (item?: MediaItem) => () => {
        if (isOpenPreview === false && item) {
            setMediaPreview(item);
        } else {
            setMediaPreview(null);
        }
        setIsOpenPreview(!isOpenPreview);
    };

    return (
        <div className="py-8 px-8 sm:px-14 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-50">
            {myFavoritesMedia.map((item) => {
                const { thumbnail, type, id } = item;

                return (
                    <ThumbnailMedia
                        key={id}
                        thumbnail={thumbnail}
                        type={type}
                        onFavoriteClick={handleFavoriteClick(item)}
                        isFavorite
                        onClick={handleTogglePreviewModal(item)}
                    />
                );
            })}
            <PreviewModal
                isOpen={isOpenPreview}
                onClose={handleTogglePreviewModal()}
                title="Preview"
                type={mediaPreview?.type}
                url={mediaPreview?.url}
            />
        </div>
    );
};

export default FavoritesPage;
