import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { toast } from "@/components/ui/use-toast";
import { PaginationOptions } from "@/main/common/components/dataTable/types/commonTableTypes";
import { useGetAllCarss } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";

export default function useGetDataOfPage({ type }: ParamsQuery) {
  const { t } = useTranslation("cars");

  const [searchText, setSearchText] = useState<string>(""); //send it
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
  } = useGetAllCarss(
    {
      page: `${(page ?? 1) - 1}`,
      size: limit,
      type,
      searchText,
      // app: searchParams?.get("app") || undefined,
      underOrg: searchParams?.get("underOrg") || undefined,
      search: searchParams.get("search")?.trim() || null,
      // app: searchParams?.get("filter")?.split(",")?.join("=") || "",
      // ...searchParamsSend,
    },
    true,
    searchText,
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
    totalPages: Math.ceil((Number(data?.data?.size) ?? 0) / (limit ?? 1)),
    totalnums: Number(data?.data.size) || 0,
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
    searchText,
    setSearchText,
  };
}
