import { forwardRef } from 'react';

const Button = forwardRef(
    (
        {
            name,
            variant = 'primary',
            size = 'md', 
            className = '',
            disabled = false,
            ...rest
        },
        ref
    ) => {
        const baseClasses = 'btn transition-all duration-200 active:scale-95';
        const variantClass = variant ? `btn-${variant}` : '';
        const sizeClass = size !== 'md' ? `btn-${size}` : '';
        const disabledClass = disabled ? 'btn-disabled' : '';

        return (
            <button
                ref={ref}
                className={`${baseClasses} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
                disabled={disabled}
                {...rest}
            >
                {name}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;