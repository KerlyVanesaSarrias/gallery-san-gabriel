import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { memo, useEffect } from 'react';
import { fetchGallery } from '../slices/gallerySlice';
import { ThumbnailMedia } from '../../../ui-elments/components';
import { Loader } from '../../../assets/images/Loader';

interface GalleryPageProps {
    category?: 'all' | 'animals';
}

const GalleryPage = ({ category = 'all' }: GalleryPageProps) => {
    const { error, isLoading, media } = useSelector(
        (state: RootState) => state.gallery
    );
    const dispatch = useDispatch<AppDispatch>();

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
        <div>
            {media.map((item) => {
                const { thumbnail } = item;
                return <ThumbnailMedia thumbnail={thumbnail} />;
            })}
        </div>
    );
};

export default memo(GalleryPage);
