import classNames from 'classnames';
import React, { memo, useRef, useState } from 'react';
import './Input.tailwind.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorMessage?: string;
}
const Input: React.FC<InputProps> = ({
    name,
    placeholder = '',
    label,
    errorMessage,
    className,
    type = 'text',
    ...restProps
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        if (inputRef.current) {
            inputRef.current.type = isPasswordVisible ? 'password' : 'text';
        }
        setIsPasswordVisible((prev) => !prev);
    };

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
        <div className="relative w-full">
            <label htmlFor={name} className={labelClases}>
                {label}
            </label>
            <div className="relative">
                <input
                    ref={inputRef}
                    name={name}
                    placeholder={placeholder}
                    className={inputClasses}
                    type={type}
                    {...restProps}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="input-password absolute top-[10px] right-2"
                    >
                        {isPasswordVisible ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                )}
            </div>
            <span className={errorClases}>{errorMessage}</span>
        </div>
    );
};

export default memo(Input);
