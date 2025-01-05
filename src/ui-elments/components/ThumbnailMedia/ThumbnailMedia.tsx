import { memo } from 'react';
import { Card } from '../Card';

interface ThumbnailMediaProps {
    thumbnail: string;
}

const ThumbnailMedia = ({ thumbnail }: ThumbnailMediaProps) => {
    return (
        <Card>
            <img src={thumbnail} />
        </Card>
    );
};

export default memo(ThumbnailMedia);
