import Maseges from "./maseges";

export default function Communications() {
  return (
    <div className=" border-e h-full ">
      <div className=" h-[80px] bg-white p-[16px] flex  items-center">
        سجل الإتصالات
      </div>{" "}
      <div className=" bg-[#F3F3F3] h-[calc(100%-80px)] ">
        <Maseges></Maseges>
      </div>
    </div>
  );
}
