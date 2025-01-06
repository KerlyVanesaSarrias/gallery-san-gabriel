import classNames from 'classnames';
import './Button.tailwind.css';
import { memo } from 'react';
import { LoaderIcon } from './LoaderIcon';

type ButtonColor = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: ButtonColor;
    size?: ButtonSize;
    label: string;
    iconLeft?: JSX.Element;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    color = 'primary',
    size = 'medium',
    label,
    className,
    iconLeft,
    isLoading = false,
    disabled,
    ...restProps
}) => {
    const buttonClasses = classNames(
        'button',
        {
            [`button-color--${color}`]: true,
            [`button-size--${size}`]: true,
        },
        className
    );

    return (
        <button
            className={buttonClasses}
            disabled={isLoading || disabled}
            {...restProps}
        >
            {isLoading && <LoaderIcon />}
            {iconLeft}
            {label}
        </button>
    );
};

export default memo(Button);
