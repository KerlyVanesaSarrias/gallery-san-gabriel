import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { Modal, Text } from '../../../../ui-elments/components';
import {
    MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon,
} from '@heroicons/react/24/solid';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    type?: 'image' | 'video';
    url?: string;
    imageUserUrl?: string;
    userName: string;
}

const PreviewModal = ({
    isOpen,
    onClose,
    type,
    url,
    imageUserUrl,
    userName,
}: PreviewModalProps) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setIsZoomed(false);
            setPosition({ x: 0, y: 0 });
        }
    }, [isOpen]);

    useEffect(() => {
        if (type === 'video' && isOpen && videoRef.current) {
            videoRef.current.play();
        }
    }, [type, isOpen]);

    const handleZoomToggle = () => {
        setIsZoomed((prevZoom) => !prevZoom);
        if (isZoomed) {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (isZoomed && containerRect) {
                const offsetX =
                    ((event.clientX - containerRect.left) /
                        containerRect.width) *
                        2 -
                    1;
                const offsetY =
                    ((event.clientY - containerRect.top) /
                        containerRect.height) *
                        2 -
                    1;
                setPosition({
                    x: -offsetX * 150,
                    y: -offsetY * 150,
                });
            }
        },
        [containerRect, isZoomed]
    );

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        setContainerRect(event.currentTarget.getBoundingClientRect());
    };

    useEffect(() => {
        if (isZoomed) {
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isZoomed, containerRect, handleMouseMove]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="md:w-[800px] h-full w-full relative flex flex-col items-center justify-center overflow-hidden">
                <div className="flex items-center gap-2 mb-2 w-full ">
                    <img
                        className="rounded-full size-12 bg-gray-300"
                        src={
                            imageUserUrl ||
                            'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                        }
                        alt="image user"
                    />
                    <Text size="md" weight="medium">
                        {userName}
                    </Text>
                </div>
                {type === 'image' && (
                    <div
                        className="relative flex items-center justify-center"
                        onMouseEnter={handleMouseEnter}
                        style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={url}
                            alt="preview modal"
                            className="transition-transform duration-300 h-full"
                            style={{
                                transform: isZoomed
                                    ? `scale(2) translate(${position.x}px, ${position.y}px)`
                                    : 'scale(1)',
                                cursor: isZoomed ? 'move' : 'default',
                            }}
                        />
                        <button
                            onClick={handleZoomToggle}
                            className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
                        >
                            {isZoomed ? (
                                <MagnifyingGlassMinusIcon className="h-6 w-6" />
                            ) : (
                                <MagnifyingGlassPlusIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                )}
                {type === 'video' && (
                    <div
                        className="relative flex items-center justify-center"
                        onMouseEnter={handleMouseEnter}
                        style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <video
                            ref={videoRef}
                            src={url}
                            controls
                            autoPlay
                            className="w-full h-full"
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default memo(PreviewModal);
