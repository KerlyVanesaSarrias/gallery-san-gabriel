import classNames from 'classnames';
import './Button.tailwind.css';
import { memo } from 'react';

type ButtonColor = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: ButtonColor;
    size?: ButtonSize;
    label: string;
    iconLeft?: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({
    color = 'primary',
    size = 'medium',
    label,
    className,
    iconLeft,
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
        <button className={buttonClasses} {...restProps}>
            {iconLeft}
            {label}
        </button>
    );
};

export default memo(Button);
