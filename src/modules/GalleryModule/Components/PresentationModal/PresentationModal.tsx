import { useState, useEffect, useCallback, useMemo } from 'react';
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

    const itemsMemo = useMemo(() => {
        return items;
    }, [items]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsMemo.length);
    }, [itemsMemo.length]);

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + (itemsMemo?.length ?? 0)) % itemsMemo.length
        );
    };

    const currentItem = itemsMemo ? itemsMemo[currentIndex] : undefined;

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
                {itemsMemo.length > 0 && (
                    <div className="relative flex items-center justify-center">
                        <div className="relative flex items-center justify-center w-full h-[500px] bg-gray-200 overflow-hidden">
                            {currentItem?.type === 'image' && (
                                <img
                                    src={currentItem.url}
                                    alt={'Presentation item'}
                                    className="object-contain h-full max-w-full"
                                />
                            )}
                            {currentItem?.type === 'video' && (
                                <video
                                    src={currentItem.url}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                />
                            )}
                        </div>

                        <div className="absolute top-1/2 transform -translate-y-1/2 md:left-4 left-1">
                            <button
                                onClick={handlePrev}
                                className="bg-gray-800 text-white md:p-2 p-1 rounded-full shadow-lg hover:bg-gray-700"
                            >
                                <ChevronLeftIcon className="md:h-6 md:w-6 h-4 w-4" />
                            </button>
                        </div>

                        <div className="absolute top-1/2 transform -translate-y-1/2 md:right-4  right-1">
                            <button
                                onClick={handleNext}
                                className="bg-gray-800 text-white md:p-2 p-1 rounded-full shadow-lg hover:bg-gray-700"
                            >
                                <ChevronRightIcon className="md:h-6 md:w-6 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default PresentationModal;
