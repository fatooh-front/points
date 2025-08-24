import { ComponentType } from "react";
import { default as tinycolor } from "tinycolor2";

export default function CardDataNum({
  title,
  num,
  unit,
  color = "#DBE8FA",
  bgColor,
  Icon,
}: {
  title: string;
  num: string;
  unit: string;
  color: string;
  bgColor?: string;
  Icon: ComponentType<any>;
}) {
  const backgroundColor = tinycolor(color).setAlpha(0.09).toRgbString();
  const backgroundIconColor = tinycolor(color).setAlpha(0.12).toRgbString();

  return (
    <div
      style={{
        backgroundColor: bgColor || backgroundColor,
      }}
      className={` bg-[${
        bgColor || backgroundColor
      }] flex p-6 justify-between it aspect-[264/109]  rounded-xl text-black`}
    >
      <div className=" h-full flex flex-col justify-between">
        <div
          style={{
            borderColor: color,
          }}
          className={` 2xl:text-lg text-base rou border-s-4 ps-1 border-[${color}]  font-medium`}
        >
          {title}
        </div>
        <div className=" flex  items-end gap-2">
          <p className="2xl:text-3xl text-2xl font-semibold"> {num} </p>
          {" " + unit}
        </div>
      </div>
      <div
        style={{
          backgroundColor: backgroundIconColor,
        }}
        className=" rounded-full  justify-center items-center flex h-[50px] w-[50px]"
      >
        {<Icon color={color}></Icon>}
      </div>
    </div>
  );
}
