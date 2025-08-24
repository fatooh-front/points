import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { toast } from "@/components/ui/use-toast";
import { PaginationOptions } from "@/main/common/components/dataTable/types/commonTableTypes";
import { useGetAllLeads } from "@/main/global/api/restful/userManagmentAPI/CustomerServiceManager/CustomerServiceQuery";

export default function useGetDataOfPage({ type }: ParamsQuery) {
  const { t } = useTranslation("cars");
  console.log(type);

  const [page, setPage] = useState<number | undefined>(1); //send it
  const [limit, setLimit] = useState<number | undefined>(10); // send it

  const [searchParams] = useSearchParams();

  const onSelectedServerValueChange = (selectedValue: any) => {
    console.log("selectedValuewww", selectedValue);
  };

  const {
    data: data,
    isLoading,
    error,
  } = useGetAllLeads({ page: (page ?? 1) - 1, size: limit });

  console.log(
    searchParams.get("filter")?.split(",").join("="),
    "ssssssssssssssssssssssss"
  );

  useEffect(() => {
    error &&
      toast({
        variant: "destructive",
        color: "white",
        title: "Uh oh! Something went wrong.",
        description: (error as Error).message,
      });
  }, [error]);

  const paginationOptions: PaginationOptions = {
    totalPages: data?.data?.totalPages,
    totalnums: data?.data?.size,
    currentPage: page,
    limit,
    setPage,
    setLimit,
  };
  console.log(data?.data?.content, "datsadasda");

  return {
    t,
    data: data?.data?.content || [],
    isLoading,
    paginationOptions,
    onSelectedServerValueChange,
  };
}
