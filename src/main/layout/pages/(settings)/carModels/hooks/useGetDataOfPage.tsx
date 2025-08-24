import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { toast } from "@/components/ui/use-toast";
import { PaginationOptions } from "@/main/common/components/dataTable/types/commonTableTypes";
import { useGetAllCarsModels } from "@/main/global/api/restful/userManagmentAPI/carsModelsManager/carsModelsQuery";

export default function useGetDataOfPage({ type }: ParamsQuery) {
  const { t } = useTranslation("cars");

  const [page, setPage] = useState<number | undefined>(1); //send it
  const [limit, setLimit] = useState<number | undefined>(10); // send it
  // const [app, setApp] = useState<string | number | undefined>(); //send it
  // const [underOrg, setUn/derOrg] = useState<string | number | undefined>(); //send it

  // const [search, setSearch] = useState<string | number | undefined>(); //send it
  const [searchParams] = useSearchParams();

  const onSelectedServerValueChange = (selectedValue: any) => {
    console.log("selectedValuewww", selectedValue);
    // setApp(selectedValue?.app);
  };

  // const onSearchChange = (searchValue: any) => {
  //   console.log("searchValueChangewww", searchValue);
  // };

  // const onSearch = (searchValue: any) => {
  //   console.log("searchValueClickkwww", searchValue);
  //   setSearch(searchValue);
  // };

  // const searchParamsSend = searchParams.get("search")?.trim()
  //   ? {
  //       "search[key]": "firstName",
  //       "search[value]": searchParams.get("search")?.trim() || null,
  //     }
  //   : {};

  
  const {
    data: data,
    isLoading,
    error,
  } = useGetAllCarsModels(
    {
      page,
      limit,
      type,
      // app: searchParams?.get("app") || undefined,
      underOrg: searchParams?.get("underOrg") || undefined,
      search: searchParams.get("search")?.trim() || null,
      // app: searchParams?.get("filter")?.split(",")?.join("=") || "",
      // ...searchParamsSend,
    },
    true,
    "&" + searchParams?.get("filter")?.split(",")?.join("=") || ""
  );

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
    // onSearchChange,
    // onSearch,
  };
}
