import { memo, useState, useEffect, useCallback } from 'react';
import { Modal } from '../../../../ui-elments/components';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface PresentationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    items: Array<{
        type: 'image' | 'video';
        url: string;
    }>;
    autoPlaySpeed?: number;
}

const PresentationModal = ({
    isOpen,
    onClose,
    title,
    items,
    autoPlaySpeed = 3000,
}: PresentationModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, [items.length]);

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + items.length) % items.length
        );
    };

    const currentItem = items[currentIndex];

    useEffect(() => {
        if (!isOpen) {
            setCurrentIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNext();
        }, autoPlaySpeed);

        return () => {
            clearInterval(intervalId);
        };
    }, [autoPlaySpeed, handleNext]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="md:w-[800px] h-full w-full relative flex flex-col items-center justify-center overflow-hidden">
                {items.length > 0 && (
                    <div className="relative w-full h-full flex flex-col items-center">
                        <div className="relative flex items-center justify-center w-full h-[500px] bg-gray-200 overflow-hidden">
                            {currentItem.type === 'image' && (
                                <img
                                    src={currentItem.url}
                                    alt={'Presentation item'}
                                    className="object-contain h-full max-w-full"
                                />
                            )}
                            {currentItem.type === 'video' && (
                                <video
                                    src={currentItem.url}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                />
                            )}
                        </div>

                        <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
                            <button
                                onClick={handlePrev}
                                className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
                            >
                                <ChevronLeftIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
                            <button
                                onClick={handleNext}
                                className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
                            >
                                <ChevronRightIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                )}

                {items.length === 0 && (
                    <p className="text-center text-gray-500">
                        No items to display
                    </p>
                )}
            </div>
        </Modal>
    );
};

export default memo(PresentationModal);
