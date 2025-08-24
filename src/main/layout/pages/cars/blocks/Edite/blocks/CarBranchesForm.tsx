import React from "react";
import { useGetAllBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";

import { X } from "lucide-react";
import { useDeleteCarBranchs } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";
import TFormField from "@/main/common/components/TForm/TFormField";
// Example branches data (replace with your actual data source)

export default function CarBranchesForm({ form }: any) {
  const { data: CarBranchesData } = useGetAllBranches();
  const { mutate: mutateDeleteCarBranchs } = useDeleteCarBranchs();

  // Refetch after add

  const branchesList =
    CarBranchesData?.data?.map((item) => {
      return {
        value: item.branchId,
        label: item.branchArName,
        cityId: item.cityId,
      };
    }) || [];
  // Add this inside your component
  form;

  // Initialize branches if not already set

  return (
    <div className=" rounded-lg  w-full">
      {/* ...existing code... */}

      {/* Branches Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-700">جميع الفروع</span>
          <span className="font-bold text-gray-700">عدد السيارات</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {branchesList?.map(
            (branch: {
              value: string | number | null | undefined;
              label: string;
              cityId: string | number | null | undefined;
            }) => {
              console.log(
                `branchs.${branch.value}`,
                form.watch(`branchs`),
                "brancddh"
              );

              return (
                <React.Fragment key={branch.value}>
                  {/* Left: Input for car count */}{" "}
                  <div className="flex items-center gap-2 justify-end">
                    <div
                      onClick={() => {
                        !form.watch(`branchs.${branch.value}.branchId`)
                          ? form.setValue(
                              `branchs.${branch.value}.branchId`,
                              branch.value
                            )
                          : form.setValue(
                              `branchs.${branch.value}.branchId`,
                              undefined
                            );

                        form.setValue(`branchs.${branch.value}.count`, 0);
                        !form.watch(`branchs.${branch.value}.cityId`)
                          ? form.setValue(
                              `branchs.${branch.value}.cityId`,
                              branch.cityId
                            )
                          : form.setValue(
                              `branchs.${branch.value}.cityId`,
                              undefined
                            );
                      }}
                      className="flex flex-1 border px-4 h-[48px] rounded-[8px] items-center gap-2 cursor-pointer"
                    >
                      {form.watch(`branchs.${branch.value}.branchId`) &&
                      form.watch(`branchs.${branch.value}.carBranchId`) ? (
                        <X
                          className="text-red-500"
                          onClick={() => {
                            mutateDeleteCarBranchs(
                              {
                                id: form.watch(
                                  `branchs.${branch.value}.carBranchId`
                                ),
                              },
                              {
                                onSuccess: () => {
                                  form.setValue(
                                    `branchs.${branch.value}.carBranchId`,
                                    undefined
                                  );
                                },
                              }
                            );
                          }}
                        ></X>
                      ) : (
                        <input
                          type="checkbox"
                          id={form.watch(`branchs.${branch.value}.branchId`)}
                          className="form-checkbox accent-[darkgoldenrod] rounded-sm w-5 h-5"
                          checked={form.watch(
                            `branchs.${branch.value}.branchId`
                          )}
                        />
                      )}
                      <label htmlFor="showHome" className="font-medium">
                        {branch.label}
                      </label>
                    </div>{" "}
                  </div>{" "}
                  <TFormField
                    typeField="input"
                    form={form}
                    type="number"
                    name={`branchs.${branch.value}.count`}
                    className="h-[48px]"
                    ClassN
                    // label="عدد الأبواب"
                    labelInput="ادخل العدد"
                    placeholder="ادخل العدد"
                  />
                  {/* Right: Branch name + icon */}
                </React.Fragment>
              );
            }
          )}
        </div>
      </div>

      {/* ...existing code... */}
    </div>
  );
}
