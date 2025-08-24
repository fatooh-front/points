import { useState } from "react";
("@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery");
import {
  useAddCarExtrakm,
  useDeleteExtrakm,
  useGetCarExtrakm,
} from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import TrashEditIcon from "@/main/global/assets/svg/TrashEditIcon";

// Example branches data (replace with your actual data source)

export default function CarKmForm({ form }: any) {
  const { id } = useParams();
  const { mutate: mutateAdd } = useAddCarExtrakm();
  const { mutate: mutateDelete } = useDeleteExtrakm();
  const { data: CarExtrakmData, refetch: refetchCarExtrakm } =
    useGetCarExtrakm(id);

  // Refetch after add

  const [price, setPrice] = useState<number>(0);
  const [km, setkm] = useState<string>("");

  const CarExtrakmDataList = CarExtrakmData?.data || [];
  // Add this inside your component
  form;

  // Initialize branches if not already set

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
      {/* ...existing code... */}
      {/* Branches Section */}
      <div className="mt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-700">باقات للكيلومترات</span>
        </div>
        {/* Add new package */}
        <div className="flex gap-4 items-end mb-4 text-[#898C8E]">
          {" "}
          <div className="flex-1   w-full">
            {" "}
            <div className="font-bold mb-[16px] text-[#898C8E]">
              عدد الكيلومترات الزيادة
            </div>
            <Input
              onChange={(e) => setkm(e.target.value)}
              value={km}
              type="number"
              name="newKmPackage.extraKm"
              className="h-[48px] flex-1 "
              placeholder="ادخل عدد الكيلومترات الزيادة"
            />{" "}
          </div>{" "}
          <div className=" flex-1  w-full  ">
            {" "}
            <div className="font-bold mb-[16px] text-[#898C8E]">سعرها</div>
            <Input
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
              type="number"
              name="newKmPackage.price"
              className="h-[48px] flex-1"
              placeholder="ادخل السعر"
            />{" "}
          </div>
          <button
            type="button"
            className="bg-[#162B29] h-[48px] text-white px-6 py-2 rounded"
            onClick={() => {
              if (price && km && price > 0 && km.length > 0) {
                const newPackage = {
                  carId: id,
                  price: price,
                  km: km,
                };
                mutateAdd(newPackage, {
                  onSuccess: () => {
                    refetchCarExtrakm();
                  },
                });
                setPrice(0);
                setkm("");
              }
            }}
          >
            إضافة
          </button>
        </div>
      </div>
      {/* List of added packages */}
      <div className=" text-[#898C8E]">
        <div className="font-bold mb-2 ">تمت إضافتهم</div>
        <div className="border border-[#D0DADE] rounded-md p-4">
          {CarExtrakmDataList.map((pkg, idx: number) => (
            <div>
              {" "}
              {idx != 0 && <hr className=" w-full border-[#EFEFEF]"></hr>}
              <div
                key={idx}
                className="flex items-center justify-between p-[10px]  py-2"
              >
                <span className="w-1/3 text-center">{pkg.km} كم</span>{" "}
                <span className="w-1/3 text-center">{pkg.price} ر.س</span>
                <button
                  type="button"
                  className="text-red-500 mr-2 w-[24px] h-[24px]"
                  onClick={() => {
                    if (pkg?.kmId) {
                      mutateDelete(pkg.kmId, {
                        onSuccess: () => {
                          refetchCarExtrakm();
                        },
                      });
                    }
                  }}
                >
                  <TrashEditIcon
                    height={24}
                    width={24}
                    className=" w-[24px] h-[24px] hover:opacity-70"
                  ></TrashEditIcon>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ...existing code... */}
    </div>
  );
}
