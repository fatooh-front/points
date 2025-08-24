// import { useGetCarsBranche } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
// import { get } from "lodash";
// import { useParams } from "react-router-dom";

// interface CarCardProps {
//   brand: string;
//   model: string;
//   year: number;
//   pricePerDay: number;
//   imageUrl: string;
// }

// export function CarCard({
//   brand,
//   model,
//   year,
//   pricePerDay,
//   imageUrl,
// }: CarCardProps) {
//   return (
//     <div className="flex items-center justify-center gap-2 p-2 w-[374px] h-[146px] bg-white border border-[rgba(206,147,26,0.6)] shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded-lg">
//       {/* النصوص */}
//       <div className="flex flex-col justify-center items-end gap-6 w-[169px] h-[130px]">
//         <h3 className="text-[#162A2B] text-[16px] font-medium leading-[30px]">
//           {brand} - {model} - {year}
//         </h3>
//         <span className="text-[#CE931A] text-[20px] font-semibold leading-[37px]">
//           {pricePerDay}/يوم
//         </span>
//       </div>

//       {/* صورة السيارة */}
//       <div className="w-[183px] h-[111px] relative">
//         <img
//           src={imageUrl}
//           alt={`${brand} ${model}`}
//           className="object-contain"
//         />
//       </div>
//     </div>
//   );
// }

// export default function Page() {
//   const { id } = useParams();
//   const carsData = [
//     {
//       brand: "هيونداي",
//       model: "اكسنت",
//       year: 2025,
//       pricePerDay: 960,
//       imageUrl: "/car.png",
//     },
//     {
//       brand: "تويوتا",
//       model: "كامري",
//       year: 2024,
//       pricePerDay: 1200,
//       imageUrl: "/car.png",
//     },
//     {
//       brand: "كيا",
//       model: "سبورتاج",
//       year: 2023,
//       pricePerDay: 1100,
//       imageUrl: "/car.png",
//     },
//     // ممكن تزود داتا اكتر حسب الحاجة
//   ];
//   const { data: CarsBranche } = useGetCarsBranche(id);
//   return (
//     <div className="p-6">
//       {/* العنوان */}
//       <h2 className="text-center text-lg md:text-xl font-medium text-[#162A2B] mb-8">
//         مرحباً بك في فرع{" "}
//         <span className="text-[#CE931A]">فرع العزيزية - مكة</span>، هذه هي
//         السيارات المتاحة اليوم لخدمتك.
//       </h2>

//       {/* شبكة الكروت */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
//         {CarsBranche?.map((car, index) => (
//           <CarCard
//             key={index}
//             brand={car.brand}
//             model={car.model}
//             year={car.year}
//             pricePerDay={car.pricePerDay}
//             imageUrl={car.imageUrl}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
