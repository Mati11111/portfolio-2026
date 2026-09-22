const IconButton = ({
  ButtonIcon,
  ButtonFunction,
  ButtonAlt = "",
  ButtonLabel,
  CustomStyle = "",
}) => {
  // Si no es interactivo (sin función), el ícono es decorativo.
  const isInteractive = typeof ButtonFunction === "function";
  const accessibleLabel = ButtonLabel || ButtonAlt;

  return (
    <button
      type="button"
      onClick={ButtonFunction}
      aria-label={accessibleLabel || undefined}
      aria-hidden={isInteractive ? undefined : true}
      tabIndex={isInteractive ? undefined : -1}
      className="p-2 cursor-pointer group"
    >
      <div className="relative w-8 h-8">
        <img
          src={ButtonIcon}
          alt={accessibleLabel}
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
