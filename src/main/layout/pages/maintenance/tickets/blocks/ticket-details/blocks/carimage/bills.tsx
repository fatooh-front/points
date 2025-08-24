import { ImageOff } from "lucide-react";
import React from "react";

interface CarImageSectionProps {
  data: {
    title: string;
    date?: string;
    images?: string[];
    emptyText?: string;
  }[];
}

const CarImageSection: React.FC<CarImageSectionProps> = ({ data }) => (
  <div className=" p-6">
    {data.map(
      ({ title, date, images = [], emptyText = "لا توجد صور مضافة" }) => (
        <div className="w-full border-[#EFEFEF]  rounded-[4px] p-4 border mt-4">
          <div className="flex justify-start gap-2 items-center ">
            <span className="font-semibold text-base">{title}</span>
            {date && (
              <span className="text-gray-500 font-semibold text-base">
                {date}
              </span>
            )}
          </div>
          {images.length > 0 ? (
            <div className="flex gap-2">
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`car image ${idx + 1}`}
                  className="w-20 h-16 rounded object-cover"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <ImageOff size={70} />
              <span>{emptyText}</span>
            </div>
          )}
        </div>
      )
    )}
  </div>
);

export default CarImageSection;
