import classNames from 'classnames';
import React from 'react';

export interface DropdownItemProps {
    id: string;
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DropdownItem = ({ label, onClick, ...restProps }: DropdownItemProps) => {
    const buttonClasses = classNames(
        'block w-full px-4 py-2 text-left text-sm text-gray-700',
        {
            'hover:bg-blue-100': onClick,
            'cursor-default': !onClick,
        }
    );

    return (
        <div className="py-1" role="none">
            <button
                className={buttonClasses}
                role="menuitem"
                tabIndex={-1}
                onClick={onClick}
                {...restProps}
            >
                {label}
            </button>
        </div>
    );
};

export default DropdownItem;
