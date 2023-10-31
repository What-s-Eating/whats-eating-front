import { classNames } from "@/utils/utils";
import * as React from "react";

type InputProps = {
  isLoading?: boolean;
  variant?: "primary" | "danger" | "outline";
} & React.ComponentPropsWithRef<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { children, className, isLoading, disabled, variant, ...rest },
  ref
) {
  const inputDisabled = isLoading || disabled;

  return (
    <input
      ref={ref}
      disabled={inputDisabled}
      className={classNames(
        className,
        inputDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        "border py-1 px-2 rounded-md focus:outline-none ring-0 disabled:opacity-75",
        "focus:border-primary-500"
      )}
      {...rest}
    >
      {children}
    </input>
  );
});

export default Input;
