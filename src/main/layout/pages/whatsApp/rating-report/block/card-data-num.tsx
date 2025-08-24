import { default as tinycolor } from "tinycolor2";

export default function CardDataNum({ item }: { item: any }) {
  const backgroundIconColor = tinycolor(item.color)
    .setAlpha(0.12)
    .toRgbString();

  return (
    <div
      style={{ color: item.color, borderColor: item.color }}
      className="mx-4 py-4 flex border-t-2  gap-4 h-[115px]  "
    >
      <div
        style={{ backgroundColor: backgroundIconColor }}
        className=" w-[50px] h-[50px] rounded-full flex justify-center items-center"
      >
        {<item.icon size={30} color={item.color}></item.icon>}{" "}
      </div>
      <div className=" flex flex-col justify-between  ">
        <p className=" text-[#656565] text-2xl font-semibold">
          {item.num_of_rat}
        </p>
        <p>{item.title}</p>
      </div>
    </div>
  );
}
