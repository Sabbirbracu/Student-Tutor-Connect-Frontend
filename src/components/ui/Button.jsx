const Button = ({ variant = "primary", children, onClick, className = "" }) => {
  const baseStyle =
    "px-6 py-3 rounded-2xl font-semibold transition duration-300";

  let variantStyle = "";

  switch (variant) {
    case "primary":
      variantStyle = "bg-primary text-white hover:opacity-90";
      break;
    case "secondary":
      variantStyle = "bg-accent text-white hover:opacity-90";
      break;
    case "outline":
      // Remove hover here so it can be customized via className
      variantStyle = "border border-gray-300 bg-white text-gray-800";
      break;
    case "gradient":
      variantStyle =
        "bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-green-500 hover:to-blue-600";
      break;
    default:
      variantStyle = "bg-primary text-white";
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
