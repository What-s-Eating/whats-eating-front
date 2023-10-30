import * as React from 'react';

type ButtonProps = {
    isLoading?: boolean;
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    function Button({ children, className, isLoading, disabled, ...rest }, ref) {
        const buttonDisabled = isLoading || disabled;

        return (
            <button
                ref={ref}
                type="button"
                disabled={buttonDisabled}
                className={className}
                {...rest}
            >
                {children}
            </button>
        );
    }
);

export default Button;
