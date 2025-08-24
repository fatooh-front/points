// import React, { useState } from "react";
// import TFormField from "@/main/common/components/TForm/TFormField";
// import { useGetAllBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
// import {
//   useAddCarExtrakm,
//   useDeleteCarBranchs,
//   useDeleteExtrakm,
//   useGetCarExtrakm,
// } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";
// import { useParams } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import TrashEditIcon from "@/main/global/assets/svg/TrashEditIcon";
// import { X } from "lucide-react";

// // Example branches data (replace with your actual data source)

// export default function CarBranchesForm({ form }: any) {
//   const { id } = useParams();
//   const { mutate: mutateAdd } = useAddCarExtrakm();
//   const { mutate: mutateDelete } = useDeleteExtrakm();
//   const { mutate: mutateDeleteCarBranchs } = useDeleteCarBranchs();
//   const { data: CarBranchesData } = useGetAllBranches();
//   const { data: CarExtrakmData, refetch: refetchCarExtrakm } =
//     useGetCarExtrakm(id);

//   // Refetch after add

//   const [price, setPrice] = useState<number>(0);
//   const [km, setkm] = useState<string>("");

//   const branchesList =
//     CarBranchesData?.data?.map((item) => {
//       return {
//         value: item.branchId,
//         label: item.branchArName,
//         cityId: item.cityId,
//       };
//     }) || [];
//   const CarExtrakmDataList = CarExtrakmData?.data || [];
//   // Add this inside your component

//   // Initialize branches if not already set

//   return (
//     <div className="flex flex-col gap-[26px] mt-[12px] justify-center">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full">
//         {/* ...existing code... */}

//         {/* Branches Section */}
//         {/* <div className="mt-8">
//           <div className="flex justify-between items-center mb-4">
//             <span className="font-bold text-gray-700">جميع الفروع</span>
//             <span className="font-bold text-gray-700">عدد السيارات</span>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             {branchesList?.map(
//               (branch: {
//                 value: string | number | null | undefined;
//                 label: string;
//                 cityId?: string | number | null | undefined;
//               }) => {
//                 console.log(
//                   `branchs.${branch.value}`,
//                   form.watch(`branchs`),
//                   "brancddh"
//                 );

//                 return (
//                   <React.Fragment key={branch.value}>
//                     {/* Left: Input for car count */}{" "}
//                     <div className="flex items-center gap-2 justify-end">
//                       <div
//                         onClick={() => {
//                           !form.watch(`branchs.${branch.value}.branchId`)
//                             ? form.setValue(
//                                 `branchs.${branch.value}.branchId`,
//                                 branch.value
//                               )
//                             : form.setValue(
//                                 `branchs.${branch.value}.branchId`,
//                                 undefined
//                               );

//                           form.setValue(`branchs.${branch.value}.count`, 0);
//                           !form.watch(`branchs.${branch.value}.cityId`)
//                             ? form.setValue(
//                                 `branchs.${branch.value}.cityId`,
//                                 branch.cityId
//                               )
//                             : form.setValue(
//                                 `branchs.${branch.value}.cityId`,
//                                 undefined
//                               );
//                         }}
//                         className="flex flex-1 border px-4 h-[48px] rounded-[8px] items-center gap-2 cursor-pointer"
//                       >
//                         {form.watch(`branchs.${branch.value}.branchId`) &&
//                         form.watch(`branchs.${branch.value}.carBranchId`) ? (
//                           <X
//                             className="text-red-500"
//                             onClick={() => {
//                               mutateDeleteCarBranchs(
//                                 {
//                                   id: form.watch(
//                                     `branchs.${branch.value}.carBranchId`
//                                   ),
//                                 },
//                                 {
//                                   onSuccess: () => {
//                                     form.setValue(
//                                       `branchs.${branch.value}.carBranchId`,
//                                       undefined
//                                     );
//                                   },
//                                 }
//                               );
//                             }}
//                           ></X>
//                         ) : (
//                           <input
//                             type="checkbox"
//                             id={form.watch(`branchs.${branch.value}.branchId`)}
//                             className="form-checkbox accent-[darkgoldenrod] rounded-sm w-5 h-5"
//                             checked={form.watch(
//                               `branchs.${branch.value}.branchId`
//                             )}
//                           />
//                         )}
//                         <label htmlFor="showHome" className="font-medium">
//                           {branch.label}
//                         </label>
//                       </div>{" "}
//                     </div>{" "}
//                     <TFormField
//                       typeField="input"
//                       form={form}
//                       type="number"
//                       name={`branchs.${branch.value}.count`}
//                       className="h-[48px]"
//                       ClassN
//                       // label="عدد الأبواب"
//                       labelInput="ادخل العدد"
//                       placeholder="ادخل العدد"
//                     />
//                     {/* Right: Branch name + icon */}
//                   </React.Fragment>
//                 );
//               }
//             )}
//           </div>
//         </div> */}

//         {/* ...existing code... */}
//       </div>
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full">
//         {/* ...existing code... */}
//         {/* Branches Section */}
//         <div className="mt-8">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-4">
//             <span className="font-bold text-gray-700">باقات للكيلومترات</span>
//           </div>
//           {/* Add new package */}
//           <div className="flex gap-4 items-end mb-4 text-[#898C8E]">
//             {" "}
//             <div className="flex-1   w-full">
//               {" "}
//               <div className="font-bold mb-[16px] text-[#898C8E]">
//                 عدد الكيلومترات الزيادة
//               </div>
//               <Input
//                 onChange={(e) => setkm(e.target.value)}
//                 value={km}
//                 type="number"
//                 name="newKmPackage.extraKm"
//                 className="h-[48px] flex-1 "
//                 placeholder="ادخل عدد الكيلومترات الزيادة"
//               />{" "}
//             </div>{" "}
//             <div className=" flex-1  w-full  ">
//               {" "}
//               <div className="font-bold mb-[16px] text-[#898C8E]">سعرها</div>
//               <Input
//                 onChange={(e) => setPrice(Number(e.target.value))}
//                 value={price}
//                 type="number"
//                 name="newKmPackage.price"
//                 className="h-[48px] flex-1"
//                 placeholder="ادخل السعر"
//               />{" "}
//             </div>
//             <button
//               type="button"
//               className="bg-[#162B29] h-[48px] text-white px-6 py-2 rounded"
//               onClick={() => {
//                 if (price && km && price > 0 && km.length > 0) {
//                   const newPackage = {
//                     carId: id,
//                     price: price,
//                     km: km,
//                   };
//                   mutateAdd(newPackage, {
//                     onSuccess: () => {
//                       refetchCarExtrakm();
//                     },
//                   });
//                   setPrice(0);
//                   setkm("");
//                 }
//               }}
//             >
//               إضافة
//             </button>
//           </div>
//         </div>
//         {/* List of added packages */}
//         <div className=" text-[#898C8E]">
//           <div className="font-bold mb-2 ">تمت إضافتهم</div>
//           <div className="border border-[#D0DADE] rounded-md p-4">
//             {CarExtrakmDataList.map((pkg, idx: number) => (
//               <div>
//                 {" "}
//                 {idx != 0 && <hr className=" w-full border-[#EFEFEF]"></hr>}
//                 <div
//                   key={idx}
//                   className="flex items-center justify-between p-[10px]  py-2"
//                 >
//                   <span className="w-1/3 text-center">{pkg.km} كم</span>{" "}
//                   <span className="w-1/3 text-center">{pkg.price} ر.س</span>
//                   <button
//                     type="button"
//                     className="text-red-500 mr-2 w-[24px] h-[24px]"
//                     onClick={() => {
//                       if (pkg?.kmId) {
//                         mutateDelete(pkg.kmId, {
//                           onSuccess: () => {
//                             refetchCarExtrakm();
//                           },
//                         });
//                       }
//                     }}
//                   >
//                     <TrashEditIcon
//                       height={24}
//                       width={24}
//                       className=" w-[24px] h-[24px] hover:opacity-70"
//                     ></TrashEditIcon>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* ...existing code... */}
//       </div>
//     </div>
//   );
// }
