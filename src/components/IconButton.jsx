const IconButton = ({
  ButtonIcon,
  ButtonFunction,
  ButtonAlt,
  CustomStyle = "",
}) => {
  return (
    <button
      onClick={ButtonFunction}
      aria-label="Toggle dark mode"
      className="p-2 cursor-pointer group"
    >
      <div className="relative w-8 h-8">
        <img
          src={ButtonIcon}
          alt={ButtonAlt}
          className={`
        absolute inset-0 m-auto h-6 w-6
        transition-all duration-300 ease-in-out
        ${CustomStyle}
      `}
        />
      </div>
    </button>
  );
};

export default IconButton;
