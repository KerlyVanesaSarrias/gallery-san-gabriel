import { memo } from 'react';
import { Card } from '../Card';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Checkbox } from '../Checkbox';
import { PlayCircleIcon } from '@heroicons/react/16/solid';

interface ThumbnailMediaProps {
    thumbnail: string;
    type: 'image' | 'video';
}

const ThumbnailMedia = ({ thumbnail, type }: ThumbnailMediaProps) => {
    return (
        <Card
            noPadding
            className="max-w-96 max-h-80 w-full aspect-video relative"
        >
            <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-25 transition-opacity duration-300">
                <Checkbox className="top-1 left-1 absolute z-20" />
                <HeartIcon className="size-5 absolute right-1 top-1 text-white font-bold z-20" />
                {type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <PlayCircleIcon className="size-10 cursor-pointer text-white opacity-60 hover:opacity-100" />
                    </div>
                )}
            </div>
            <img className="size-full object-cover" src={thumbnail} />
        </Card>
    );
};

export default memo(ThumbnailMedia);
