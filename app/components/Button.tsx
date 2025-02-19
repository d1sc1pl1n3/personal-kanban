import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  variant = "primary",
  extraClassName = "",
  stretch = false,
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-semibold transition duration-200";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const widthClass = stretch ? "w-full" : "w-auto";

  const mergedClasses = twMerge(
    baseClasses,
    variantClasses[variant],
    widthClass,
    extraClassName
  );

  return (
    <button className={mergedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
