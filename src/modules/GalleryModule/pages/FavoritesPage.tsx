import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { Button, Input, ThumbnailMedia } from '../../../ui-elments/components';
import { galleryActions, MediaItem } from '../slices/GalerySlice/gallerySlice';
import { userActions } from '../../AuthModule/slices/UserSlice/userSlice';
import { useState } from 'react';
import { PresentationModal, PreviewModal } from '../Components';
import { PlayIcon } from '@heroicons/react/16/solid';

const FavoritesPage = () => {
    const { myFavoritesMedia } = useSelector((state: RootState) => state.user);
    const { selectedMedia } = useSelector((state: RootState) => state.gallery);
    const dispatch = useDispatch<AppDispatch>();
    const [isOpenPreview, setIsOpenPreview] = useState(false);
    const [isOpenPresentation, setIsOpenPresentation] = useState(false);
    const [speedValue, setSpeedValue] = useState('3');
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
    return (
        <div className="w-full h-full flex flex-col py-8 px-8 sm:px-14 md:px-16 gap-4">
            {selectedMedia.length > 1 && (
                <div className="flex gap-2 items-end">
                    <div className="w-28">
                        <Input
                            type="number"
                            label="Speed"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50">
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
                            onCheckboxChange={handleCheckboxChange(item)}
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
                <PresentationModal
                    isOpen={isOpenPresentation}
                    onClose={handleTogglePresentationModal}
                    title="Presentation"
                    items={selectedMedia?.map((item) => ({
                        type: item.type,
                        url: item.url,
                    }))}
                    autoPlaySpeed={Number(speedValue) * 1000}
                />
            </div>
        </div>
    );
};

export default FavoritesPage;
