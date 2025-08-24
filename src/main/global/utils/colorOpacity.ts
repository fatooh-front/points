import { default as tinycolor } from "tinycolor2";
const colorOpacity = (color: string, opacity?: number) => {
  console.log(color, "dffffffffffffffff");

  const backgroundIconColor: string = tinycolor(color)
    .setAlpha(opacity || 0.3)
    .toRgbString();
  console.log(backgroundIconColor, "dffffffffffffffff");

  return backgroundIconColor;
};
export default colorOpacity;
