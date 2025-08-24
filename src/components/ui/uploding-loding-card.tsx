import TrashEditIcon from "@/main/global/assets/svg/TrashEditIcon";
import { Progress } from "./progress";
import { Image } from "lucide-react";

interface UplodingLodingCardProps {
  loadingPercentage: number;
  fileName: string;
  fileSize: string;
  IndicatorClassName: string;
}

export default function UplodingLodingCard({
  loadingPercentage,
  fileName,
  fileSize,
  IndicatorClassName,
}: UplodingLodingCardProps) {
  return (
    <div className=" p-3 w-full h-[88px] bg-white rounded-[6px] mt-[8px]">
      <div className=" flex justify-between items-center">
        <div className=" flex gap-3">
          <Image strokeWidth={0.75} />
          {fileName}
        </div>
        <TrashEditIcon></TrashEditIcon>
      </div>
      <p className=" text-[#7C7C7C] font-normal text-[12px]">{fileSize}</p>

      <div className=" flex gap-3 items-center">
        <Progress
          IndicatorClassName={IndicatorClassName || "bg-[#C9972B]"}
          value={loadingPercentage}
          className="flex-1"
        />
        <p className="">% {loadingPercentage} </p>
      </div>
    </div>
  );
}
