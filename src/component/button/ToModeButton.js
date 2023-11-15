const ModeButton = ({ onClick, label }) => (
  <button
    className="w-full h-[35px] h4tag md:h5tag lg:h5tag font-bold rounded placeholder:text-sm border border-gray hover:border-colorText active:bg-colorText active:bg-opacity-10"
    onClick={onClick}
  >
    {label}
  </button>
);

export default ModeButton;
