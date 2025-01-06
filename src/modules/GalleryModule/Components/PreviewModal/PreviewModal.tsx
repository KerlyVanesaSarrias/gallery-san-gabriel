import { memo, useState } from 'react';
import { Modal } from '../../../../ui-elments/components';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    type?: 'image' | 'video';
    url?: string;
}
const PreviewModal = ({
    isOpen,
    title,
    onClose,
    type,
    url,
}: PreviewModalProps) => {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

    const handleZoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.5, 10));
    };

    const handleZoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.5, 1));
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        setStartDrag({
            x: event.clientX - position.x,
            y: event.clientY - position.y,
        });
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (dragging) {
            setPosition({
                x: event.clientX - startDrag.x,
                y: event.clientY - startDrag.y,
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="md:w-[800px] w-full h-full relative flex flex-col items-center justify-center overflow-hidden">
                {type === 'image' && (
                    <div
                        className="relative cursor-grab active:cursor-grabbing"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={url}
                            alt="preview modal"
                            className="transition-transform duration-300"
                            style={{
                                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                                cursor: dragging ? 'grabbing' : 'grab',
                            }}
                        />
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                            <button
                                onClick={handleZoomOut}
                                className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                -
                            </button>
                            <button
                                onClick={handleZoomIn}
                                className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default memo(PreviewModal);
