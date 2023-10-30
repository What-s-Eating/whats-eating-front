import { classNames } from "@/utils/utils";
import * as React from "react";

type ButtonProps = {
  isLoading?: boolean;
  variant?: "primary" | "danger" | "outline";
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, isLoading, disabled, variant, ...rest },
  ref
) {
  const buttonDisabled = isLoading || disabled;

  return (
    <button
      ref={ref}
      type="button"
      disabled={buttonDisabled}
      className={classNames(
        className,
        buttonDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ...[
          variant === "primary" && [
            "bg-primary-500 hover:bg-primary-600 text-white",
            "focus:ring-primary-500 focus:ring-offset-primary-200 focus:ring-2 focus:ring-offset-2",
          ],
          variant === "danger" && [
            "bg-red-500 hover:bg-red-600 text-white",
            "focus:ring-red-500 focus:ring-offset-red-200 focus:ring-2 focus:ring-offset-2",
          ],
          variant === "outline" && [
            "border border-gray-500 hover:border-gray-600 text-gray-500",
            "focus:ring-gray-500 focus:ring-offset-gray-200 focus:ring-2 focus:ring-offset-2",
          ],
        ],
        "rounded-md px-2 py-1 border"
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.defaultProps = {
  variant: "primary",
};

export default Button;
