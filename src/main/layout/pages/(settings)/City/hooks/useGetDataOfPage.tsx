import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { toast } from "@/components/ui/use-toast";
import { PaginationOptions } from "@/main/common/components/dataTable/types/commonTableTypes";
import { useGetAllCity } from "@/main/global/api/restful/userManagmentAPI/CityManager/CityQuery";

export default function useGetDataOfPage() {
  const { t } = useTranslation("cities");

  const [page, setPage] = useState<number | undefined>(1); //send it
  const [limit, setLimit] = useState<number | undefined>(10); // send it
  // const [app, setApp] = useState<string | number | undefined>(); //send it
  // const [underOrg, setUn/derOrg] = useState<string | number | undefined>(); //send it

  // const [search, setSearch] = useState<string | number | undefined>(); //send it

  const onSelectedServerValueChange = (selectedValue: any) => {
    console.log("selectedValuewww", selectedValue);
    // setApp(selectedValue?.app);
  };

  const { data: data, isLoading, error, refetch } = useGetAllCity();

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
    totalPages: data?.pages,
    totalnums: data?.total,
    currentPage: page,
    limit,
    setPage,
    setLimit,
  };
  return {
    t,
    data,
    isLoading,
    paginationOptions,
    onSelectedServerValueChange,
    refetch,
    // onSearchChange,
    // onSearch,
  };
}
