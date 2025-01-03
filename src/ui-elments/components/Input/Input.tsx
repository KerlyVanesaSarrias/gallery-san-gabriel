import classNames from 'classnames';
import React from 'react';
import './Input.tailwind.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    value: string | number;
    type?: 'text' | 'number' | 'email' | 'password';
    placeholder?: string;
    errorMessage?: string;
}
const Input: React.FC<InputProps> = ({
    name,
    placeholder = '',
    label,
    errorMessage,
    className,
}) => {
    const inputClasses = classNames(
        'input',
        {
            'input--normal': !errorMessage,
            'input--error': errorMessage,
        },
        className
    );

    const labelClases = classNames(
        'label',
        {
            'label--normal': !errorMessage,
            'label--error': errorMessage,
        },
        className
    );

    const errorClases = classNames('errorMessage');
    return (
        <div>
            <label htmlFor={name} className={labelClases}>
                {label}
            </label>
            <input
                name={name}
                placeholder={placeholder}
                className={inputClasses}
            />
            <span className={errorClases}>{errorMessage}</span>
        </div>
    );
};

export default Input;
