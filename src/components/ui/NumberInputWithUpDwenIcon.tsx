export default function CustomNumberInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  return (
    <div className="relative  w-[70px] h-[30px] rounded-[8px]  bg-white border border-input flex items-center justify-center">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full font-semibold  text-[16px]  py-1  text-end border pl-4 border-gray-300 rounded-[8px]  shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
      />
      <div className="absolute right-1 py-[5.75px] top-1/2 -translate-y-1/2 pr-4 flex flex-col items-center justify-center gap-1">
        <button
          onClick={increment}
          type="button"
          className="text-gray-500 hover:text-black "
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.13397 1.25C3.51887 0.583334 4.48113 0.583333 4.86603 1.25L7.4641 5.75C7.849 6.41667 7.36788 7.25 6.59808 7.25H1.40192C0.632124 7.25 0.150998 6.41667 0.535898 5.75L3.13397 1.25Z"
              fill="#8E8E8E"
            />
          </svg>
        </button>
        <button
          onClick={decrement}
          type="button"
          className="text-gray-500 hover:text-black "
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.86603 6.75C4.48113 7.41667 3.51887 7.41667 3.13397 6.75L0.535898 2.25C0.150998 1.58333 0.632123 0.75 1.40192 0.75L6.59808 0.75C7.36788 0.75 7.849 1.58333 7.4641 2.25L4.86603 6.75Z"
              fill="#8E8E8E"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
