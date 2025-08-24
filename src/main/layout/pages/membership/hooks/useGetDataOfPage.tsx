import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import { toast } from "@/components/ui/use-toast";
import { useGetAllMemberships } from "@/main/global/api/restful/userManagmentAPI/membershipManager/membershipQuery";

export default function useGetDataOfPage() {
  const { t } = useTranslation("cars");

  const onSelectedServerValueChange = (selectedValue: any) => {
    console.log("selectedValuewww", selectedValue);
    // setApp(selectedValue?.app);
  };

  const { data, error, isLoading } = useGetAllMemberships();

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
    data: data?.data.content,
    isLoading,
    onSelectedServerValueChange,
    // onSearchChange,
    // onSearch,
  };
}
