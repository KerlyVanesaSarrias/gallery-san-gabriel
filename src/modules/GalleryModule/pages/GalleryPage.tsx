import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { memo, useEffect, useMemo, useState } from 'react';
import {
    fetchGallery,
    galleryActions,
    GalleryCategories,
    MediaItem,
} from '../slices/GalerySlice/gallerySlice';
import { Button, Input, ThumbnailMedia } from '../../../ui-elments/components';
import { Loader } from '../../../assets/images/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userActions } from '../../AuthModule/slices/UserSlice/userSlice';
import { PresentationModal, PreviewModal } from '../Components';
import { PlayIcon } from '@heroicons/react/16/solid';

interface GalleryPageProps {
    category?: GalleryCategories;
}

const GalleryPage = ({ category = 'all' }: GalleryPageProps) => {
    const { pathname } = useLocation();
    const [isOpenPreview, setIsOpenPreview] = useState(false);
    const [isOpenPresentation, setIsOpenPresentation] = useState(false);
    const [mediaPreview, setMediaPreview] = useState<MediaItem | null>(null);
    const [speedValue, setSpeedValue] = useState('3');

    const { error, isLoading, media, selectedMedia } = useSelector(
        (state: RootState) => state.gallery
    );

    const selectedMediaMemo = useMemo(() => {
        return (
            selectedMedia?.map((item) => ({
                type: item.type,
                url: item.url,
            })) || []
        );
    }, [selectedMedia]);

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleTogglePreviewModal = (item?: MediaItem) => () => {
        if (isOpenPreview === false && item) {
            setMediaPreview(item);
        } else {
            setMediaPreview(null);
        }
        setIsOpenPreview(!isOpenPreview);
    };

    const handleTogglePresentationModal = () => {
        setIsOpenPresentation(!isOpenPresentation);
    };

    const handleCheckboxChange =
        (mediaItem: MediaItem) => (isChecked: boolean) => {
            dispatch(
                galleryActions.toggleMediaSelection({
                    isChecked,
                    media: mediaItem,
                })
            );
        };

    const handleFavoriteClick = (item: MediaItem) => (isFavorite: boolean) => {
        if (!user.isAuthenticated) {
            toast.warning('You must be login to add to favorites');
            navigate('/login');
            return;
        }
        dispatch(userActions.setFavoritesMedia({ isFavorite, media: item }));
    };

    const handleSelectAllClick = () => {
        dispatch(galleryActions.selectAllMedia());
    };

    const handleUnselectAll = () => {
        dispatch(galleryActions.clearSelectedMedia());
    };

    useEffect(() => {
        dispatch(fetchGallery(category));
    }, [category, dispatch]);

    useEffect(() => {
        if (pathname) dispatch(galleryActions.clearSelectedMedia());
    }, [dispatch, pathname]);

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
        <div className="w-full h-full flex flex-col py-8 px-8 sm:px-14 md:px-16 gap-4">
            <div className="flex gap-2">
                <Button
                    size="small"
                    color="secondary"
                    label="Select All"
                    onClick={handleSelectAllClick}
                />
                <Button
                    size="small"
                    color="tertiary"
                    label="Unselect All"
                    onClick={handleUnselectAll}
                    disabled={selectedMedia.length === 0}
                />
            </div>
            {selectedMedia.length > 1 && (
                <div className="flex gap-2 items-end">
                    <div className="w-28">
                        <Input
                            type="number"
                            label="Speed in sec"
                            value={speedValue}
                            onChange={(e) => setSpeedValue(e.target.value)}
                        />
                    </div>
                    <Button
                        iconLeft={<PlayIcon className="size-6" />}
                        label="Presentation"
                        onClick={handleTogglePresentationModal}
                    />
                </div>
            )}

            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 bg-gray-50">
                {media.map((item) => {
                    const { thumbnail, type, id } = item;
                    const isFavorite = user.myFavoritesMedia.some(
                        (item) => item.id === id
                    );

                    const isChecked = selectedMedia.some(
                        (item) => item.id === id
                    );

                    return (
                        <ThumbnailMedia
                            key={id}
                            thumbnail={thumbnail}
                            type={type}
                            onFavoriteClick={handleFavoriteClick(item)}
                            onCheckboxChange={handleCheckboxChange(item)}
                            isFavorite={isFavorite}
                            isChecked={isChecked}
                            onClick={handleTogglePreviewModal(item)}
                        />
                    );
                })}
                <PreviewModal
                    isOpen={isOpenPreview}
                    onClose={handleTogglePreviewModal()}
                    imageUserUrl={mediaPreview?.userUrl}
                    userName={mediaPreview?.userName ?? ''}
                    type={mediaPreview?.type}
                    url={mediaPreview?.url}
                />
                {selectedMediaMemo.length >= 2 && (
                    <PresentationModal
                        isOpen={isOpenPresentation}
                        onClose={handleTogglePresentationModal}
                        title="Presentation"
                        items={selectedMediaMemo}
                        autoPlaySpeed={Number(speedValue) * 1000}
                    />
                )}
            </div>
        </div>
    );
};

export default memo(GalleryPage);
