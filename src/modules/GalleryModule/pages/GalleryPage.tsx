import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { memo, useEffect } from 'react';
import { fetchGallery } from '../slices/GalerySlice/gallerySlice';
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
        <div className="py-8 px-8 sm:px-14 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-50">
            {media.map((item) => {
                const { thumbnail, type, id } = item;
                return (
                    <ThumbnailMedia
                        key={id}
                        thumbnail={thumbnail}
                        type={type}
                    />
                );
            })}
        </div>
    );
};

export default memo(GalleryPage);
