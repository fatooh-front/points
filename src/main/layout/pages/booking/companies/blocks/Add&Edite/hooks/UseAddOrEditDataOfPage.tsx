import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useGetCompanyRequest } from "@/main/global/api/restful/userManagmentAPI/CompanyRequestManager/CompanyRequestQuery";
import { CompanyRequest } from "@/main/global/api/restful/userManagmentAPI/CompanyRequestManager/CompanyRequestTypes";

export function UseAddOrEditReservationDetails() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, refetch } = useGetCompanyRequest(id);

  const schema = z.object({
    requestId: z.number(),
    companyName: z.string(),
    activity: z.string(),
    city: z.string(),
    responsibleName: z.string(),
    mobile: z.string(),
    email: z.string().email(),
    notes: z.string().nullable().optional(),
    carsNumber: z.number(),
    months: z.number(),
    addedDate: z.string(),
    requestStatus: z.number(),
    brandsCount: z.number(),
    brands: z.array(
      z.object({
        brandId: z.number(),
        brandName: z.string(),
      })
    ),
  });

  const form = useForm<CompanyRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      requestId: 0,
      companyName: "",
      activity: "",
      city: "",
      responsibleName: "",
      mobile: "",
      email: "",
      notes: null,
      carsNumber: 0,
      months: 0,
      addedDate: "",
      requestStatus: 0,
      brandsCount: 0,
      brands: [],
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data);
    }
  }, [data?.data, form]);
  const onReset = () => {
    if (data?.data) {
      form.reset(data.data);
    }
  };
  return {
    form,
    refetch,
    onReset,
    isLoading: isLoading,
  };
}
