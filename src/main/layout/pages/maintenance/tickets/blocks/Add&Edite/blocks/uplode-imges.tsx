// import { Progress } from "@/components/ui/progress";
import UplodingLodingCard from "@/components/ui/uploding-loding-card";
import TFileField from "@/main/common/components/TForm/TFileField";
import GalleryAddSVG from "@/main/global/assets/svg/GalleryAddSVG";
// import TrashEditIcon from "@/main/global/assets/svg/TrashEditIcon";
// import { Image } from "lucide-react";
import { useState } from "react";

export default function UplodeImges({ form }: { form: any }) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className=" flex gap-[24px]">
      <div className=" flex-1">
        <p className=" mb-2">صور التقرير</p>
        <TFileField
          form={form}
          name={"logo"}
          type={"image"}
          file={file}
          setFile={setFile}
          rounded={"full"}
          label={""}
          imgeArea={
            <div>
              <div className=" flex justify-center">
                <GalleryAddSVG></GalleryAddSVG>
              </div>
              <p>
                <span className=" text-[#C9972B]">انقر للرفع</span> أو اسحب
                الملف إلى هنا
              </p>
              <p className=" font-normal text-[12px] text-[#7C7C7C]">
                الحجم الأقصى: 25 ميجابايت
              </p>{" "}
            </div>
          }
          // labelDrag={t("banners.dialog.add.dragActive")}
          // labelReplace={t("banners.dialog.add.changeImage")}
          classNameRootProps={"p-1 rounded-sm bg-white  "}
          containerClassName={"w-full h-[148px] rounded-sm"}
        />
        <UplodingLodingCard
          IndicatorClassName="bg-[#C9972B] "
          loadingPercentage={40}
          fileName="HannahBusing_Resume.img"
          fileSize={"200 KB"}
        />
      </div>
      <div className=" flex-1">
        <p className=" mb-2">صور الحادث</p>

        <TFileField
          form={form}
          name={"logo"}
          type={"image"}
          file={file}
          setFile={setFile}
          rounded={"full"}
          label={""}
          imgeArea={
            <div>
              <div className=" flex justify-center">
                <GalleryAddSVG></GalleryAddSVG>
              </div>
              <p>
                <span className=" text-[#C9972B]">انقر للرفع</span> أو اسحب
                الملف إلى هنا
              </p>
              <p className=" font-normal text-[12px] text-[#7C7C7C]">
                الحجم الأقصى: 25 ميجابايت
              </p>{" "}
              {/* <Progress value={55} className="w-[60%]" /> */}
            </div>
          }
          // labelDrag={t("banners.dialog.add.dragActive")}
          // labelReplace={t("banners.dialog.add.changeImage")}
          classNameRootProps={"p-1 rounded-sm bg-white  "}
          containerClassName={"w-full h-[148px] rounded-sm"}
        />
        <UplodingLodingCard
          IndicatorClassName="bg-[#0F9824] "
          loadingPercentage={100}
          fileName="HannahBusing_Resume.img"
          fileSize={"200 KB"}
        />
      </div>
    </div>
  );
}
