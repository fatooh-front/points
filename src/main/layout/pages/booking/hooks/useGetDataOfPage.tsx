import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { toast } from "@/components/ui/use-toast";
import { PaginationOptions } from "@/main/common/components/dataTable/types/commonTableTypes";
import { useGetAllReservation } from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingQuery";

export default function useGetDataOfPage() {
  const { t } = useTranslation("cars");
  const [selectedServerValue, setSelectedServerValue] = useState<{
    [key: string]: string;
  }>({});
  const [page, setPage] = useState<number | undefined>(1); //send it
  const [limit, setLimit] = useState<number | undefined>(10); // send it
  // const [app, setApp] = useState<string | number | undefined>(); //send it
  // const [underOrg, setUn/derOrg] = useState<string | number | undefined>(); //send it

  // const [search, setSearch] = useState<string | number | undefined>(); //send it
  console.log(selectedServerValue, "dfgdfgdfgdfgdf", "gggg");

  const onSelectedServerValueChange = (selectedValue: any) => {
    console.log("selectedValuewww", selectedValue);
    // setApp(selectedValue?.app);
  };

  const {
    data: data,
    isLoading,
    error,
  } = useGetAllReservation({
    ...selectedServerValue,
    page: (page ?? 1) - 1,
    size: limit,
  });

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
    totalnums: Number(data?.data?.size) || 0,
    currentPage: page,
    limit,
    setPage,
    setLimit,
  };
  console.log(data?.data?.content, "dfgdfgdfgdfgdf", "gggg");

  return {
    t,
    data: data?.data?.content,
    isLoading,
    paginationOptions,
    onSelectedServerValueChange,
    setSelectedServerValue,
    // onSearchChange,
    // onSearch,
  };
}
