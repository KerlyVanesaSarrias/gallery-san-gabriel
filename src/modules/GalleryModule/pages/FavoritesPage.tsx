import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import {
    Button,
    Input,
    Text,
    ThumbnailMedia,
} from '../../../ui-elments/components';
import { galleryActions, MediaItem } from '../slices/GalerySlice/gallerySlice';
import { userActions } from '../../AuthModule/slices/UserSlice/userSlice';
import { useEffect, useMemo, useState } from 'react';
import { PresentationModal, PreviewModal } from '../Components';
import { PlayIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
    const { myFavoritesMedia } = useSelector((state: RootState) => state.user);
    const { selectedMedia } = useSelector((state: RootState) => state.gallery);
    const dispatch = useDispatch<AppDispatch>();
    const [isOpenPreview, setIsOpenPreview] = useState(false);
    const [isOpenPresentation, setIsOpenPresentation] = useState(false);
    const [speedValue, setSpeedValue] = useState('3');
    const [mediaPreview, setMediaPreview] = useState<MediaItem | null>(null);

    const selectedMediaMemo = useMemo(() => {
        return (
            selectedMedia?.map((item) => ({
                type: item.type,
                url: item.url,
            })) || []
        );
    }, [selectedMedia]);

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

    useEffect(() => {
        dispatch(galleryActions.clearSelectedMedia());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full h-full flex flex-col py-8 px-8 sm:px-14 md:px-16 gap-4 bg-gray-50">
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
            {myFavoritesMedia.length === 0 && (
                <div className="flex flex-col gap-2 w-full justify-center items-center pt-10">
                    <Text>There are no favorites here yet</Text>
                    <Link to="/gallery">
                        <Button label="Go to Gallery" />
                    </Link>
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

export default FavoritesPage;
