import { memo } from 'react';
import { Modal } from '../../../../ui-elments/components';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}
const PreviewModal = ({ isOpen, title, onClose }: PreviewModalProps) => {
    return <Modal isOpen={isOpen} onClose={onClose} title={title}></Modal>;
};

export default memo(PreviewModal);
