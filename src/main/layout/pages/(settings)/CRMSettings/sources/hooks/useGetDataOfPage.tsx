import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { toast } from "@/components/ui/use-toast";
import { useGetAllTicketReasons } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsQuery";

export default function useGetDataOfPage({ type }: ParamsQuery) {
  const { t } = useTranslation("cars");
  console.log(type);

  const onSelectedServerValueChange = (selectedValue: any) => {
    console.log("selectedValuewww", selectedValue);
  };

  const { data: data, isLoading, error } = useGetAllTicketReasons({});

  useEffect(() => {
    error &&
      toast({
        variant: "destructive",
        color: "white",
        title: "Uh oh! Something went wrong.",
        description: (error as Error).message,
      });
  }, [error]);

  return {
    t,
    data,
    isLoading,
    // paginationOptions,
    onSelectedServerValueChange,
  };
}
