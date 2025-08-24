import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CountryList from "country-list-with-dial-code-and-flag";
import _ from "lodash";
import { useAddUser } from "@/main/global/api/restful/userManagmentAPI/usersManager/useUsersQuery";
import { getCountry } from "@/main/global/utils/countries/getCountry";
import {
  getIsoCode,
  translateCountryName,
} from "@/main/global/utils/countries/getIsoCodeFromName";
import useCapitalizeFields from "@/main/common/hooks/capitalizeFields/useCapitalizeFields";
import {
  objectToFormData,
  removeEmptyFields,
} from "@/main/global/utils/objectUtils";

const useAddUserPage = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation("auth");
  const { mutateAsync, isPending } = useAddUser({ type: "user" });
  const [file, setFile] = useState<File | null>(null);

  const formSchema = z
    .object({
      firstName: z.string().min(1, {
        message: t("auth.form.validation.firstName"),
      }),
      lastName: z.string().min(1, {
        message: t("auth.form.validation.lastName"),
      }),
      email: z
        .string()
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
          message: t("auth.form.validation.email"),
        })
        .min(1, t("auth.form.validation.requiredEmail"))
        .or(z.literal("")),
      company: z.string().optional().nullable(),
      organization: z.string().optional().nullable(),
      phoneCode: z.string().optional().nullable(),
      phone: z
        .string()
        .regex(/^\d{1,14}$/, {
          message: t("auth.form.validation.phone"),
        })
        .min(1, t("auth.form.validation.requiredPhone"))
        .or(z.literal("")),
      password: z.string().min(1, {
        message: t("auth.form.validation.password"),
      }),
      passwordConfirm: z.string().min(1, {
        message: t("auth.form.validation.passwordConfirm"),
      }),
      country: z.string().optional().nullable(),
      picture: z.instanceof(File).optional().nullable(),
      license: z.string().min(1, {
        message: t("auth.form.validation.license"),
      }),
      is_employee: z.boolean().optional().nullable(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("auth.form.validation.passwordMismatch"),
      path: ["passwordConfirm"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      company: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneCode: CountryList.findByCountryCode(
        getIsoCode(getCountry()) as any
      )[0]?.dialCode,
      phone: "",
      password: "",
      passwordConfirm: "",
      country: translateCountryName(getCountry(), i18n.language as "ar" | "en"),
      picture: undefined,
      license: "",
      is_employee: false,
    },
  });

  const countryValue = useWatch({
    control: form?.control,
    name: "country",
  });

  useEffect(() => {
    if (i18n.language && countryValue) {
      form.setValue(
        "country",
        translateCountryName(countryValue, i18n.language as "ar" | "en")
      );
    }
  }, [i18n.language, form, countryValue]);

  useCapitalizeFields(form);

  console.log("form.formState.errors", form.formState.errors);

  const onSubmit = async (values: FieldValues) => {
    await mutateAsync(objectToFormData(removeEmptyFields(values)), {
      onSuccess: () => {
        form.reset({});
        setFile(null);
      },
    });

    navigate("/user_management");
  };

  return {
    form,
    onSubmit,
    isPending,
    file,
    setFile,
  };
};

export default useAddUserPage;
