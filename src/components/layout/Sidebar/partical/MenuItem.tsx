type Props = {
  Icon: React.ReactNode;
  isOpen: boolean;
  label: string;
  _onClick: () => void;
};

export default function MenuItem({ Icon, isOpen, label, _onClick }: Props) {
  return (
    <button
      onClick={_onClick}
      className={`flex items-center gap-2 text-left font-semibold text-gray-600  p-2 rounded hover:bg-lime-300 hover:text-black transition-all hover:cursor-pointer  ${
        !isOpen && "justify-center "
      }`}
    >
      <span
        className={`transition-all  flex items-center justify-center
          ${isOpen ? "w-11" : "w-7 h-7"}
        `}
      >
        {Icon}
      </span>
      {isOpen && <span>{label}</span>}
    </button>
  );
}
