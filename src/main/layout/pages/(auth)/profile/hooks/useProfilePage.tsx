import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CountryList from "country-list-with-dial-code-and-flag";
import _ from "lodash";
import { useUpdateProfile } from "@/main/global/api/restful/userManagmentAPI/usersManager/useUsersQuery";
import useMyProfileStore from "@/main/global/store/profile/useMyProfileStore";
import { useAuth } from "@/main/global/store/auth/useAuth";
import {
  getIsoCode,
  translateCountryName,
} from "@/main/global/utils/countries/getIsoCodeFromName";
import { getCountry } from "@/main/global/utils/countries/getCountry";
import { getStateOptions } from "@/main/global/utils/countries/getCountriesCities";
import useCapitalizeFields from "@/main/common/hooks/capitalizeFields/useCapitalizeFields";
import {
  objectToFormData,
  removeEmptyFields,
} from "@/main/global/utils/objectUtils";

const useProfilePage = () => {
  const { i18n, t } = useTranslation("auth");
  const { mutateAsync, isPending } = useUpdateProfile();
  const [file, setFile] = useState<File | null>(null);
  const [StateOptions, setStateOptions] = useState<any>([]);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const { profile } = useMyProfileStore();
  console.log("profile", profile);

  const setUser = useAuth((store) => store.setUser);

  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  const createFormSchema = () => {
    const baseSchema = z.object({
      firstName: z
        .string()
        .min(1, { message: t("auth.form.validation.firstName") }),
      lastName: z
        .string()
        .min(1, { message: t("auth.form.validation.lastName") }),
      email: z.string().email({ message: t("auth.form.validation.email") }),
      phoneCode: z.string().optional().nullable(),
      phone: z.union([
        z
          .string()
          .regex(/^\d{1,14}$/, { message: t("auth.form.validation.phone") }),
        z.number(),
      ]),
      country: z
        .string()
        .min(1, { message: t("auth.form.validation.country") }),
      picture: z.instanceof(File).optional().nullable(),
    });

    const organizationFields = z.object({
      city: z.string().min(1, { message: t("auth.form.validation.city") }),
      orgName: z
        .string()
        .min(1, { message: t("auth.form.validation.orgName") }),
      category: z
        .string()
        .min(1, { message: t("auth.form.validation.category") }),
      address: z
        .string()
        .min(1, { message: t("auth.form.validation.address") }),
      region: z.string().min(1, { message: t("auth.form.validation.region") }),
    });

    const optionalFields = z.object({
      city: z.string().optional().nullable(),
      orgName: z.string().optional().nullable(),
      category: z.string().optional().nullable(),
      address: z.string().optional().nullable(),
      region: z.string().optional().nullable(),
    });

    if (profile?.organization) {
      // If organization data is present, assume it's a organization
      return baseSchema.merge(organizationFields);
    } else {
      // For admin or user, use optional fields
      return baseSchema.merge(optionalFields);
    }
  };

  const formSchema = createFormSchema();

  const form = useForm<z.infer<ReturnType<typeof createFormSchema>>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneCode: CountryList.findByCountryCode(
        getIsoCode(getCountry()) as any
      )[0]?.dialCode,
      phone: "",
      country: translateCountryName(getCountry(), i18n.language as "ar" | "en"),
      picture: undefined,
      // city: "",
      // orgName: "",
      // category: "",
      // address: "",
      // region: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        email: profile?.email,
        phoneCode: profile?.phoneCode,
        phone: profile?.phone,
        country: profile?.country,
        picture: undefined,
        city: profile?.city,
        orgName: profile?.organization?.orgName,
        category: profile?.organization?.category?.id,
        address: profile?.organization?.address,
        region: profile?.organization?.region?.id,
      });
    }
  }, [profile, form]);

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
      setStateOptions(getStateOptions(countryValue));
      console.log(
        "getStateOptions(countryValue)",
        getStateOptions(countryValue)
      );
      if (
        profile?.city &&
        getStateOptions(countryValue)
          .map((el) => el.value)
          .includes(_.capitalize(profile?.city))
      ) {
        form.setValue("city", _.capitalize(profile?.city));
      }
    }
  }, [i18n.language, form, countryValue]);

  useCapitalizeFields(form);

  console.log("form.formState?.errors", form.formState?.errors);

  const onSubmit = async (values: FieldValues) => {
    // const values = profile?.type === "organization" ? {} : {}
    console.log("values@@@", values);
    await mutateAsync(objectToFormData(removeEmptyFields(values)), {
      onSuccess: () => {
        // form.reset({});
        // setFile(null);
        setIsReadOnly(true);
      },
    });

    // navigate("/");
  };

  const filterOption = (option: any, inputValue: string) => {
    const countryLabel = option?.label?.props?.label;
    return (
      countryLabel?.toLowerCase()?.includes(inputValue?.toLowerCase()) ||
      option?.value?.toLowerCase()?.includes(inputValue?.toLowerCase())
    );
  };

  return {
    form,
    onSubmit,
    isPending,
    file,
    setFile,

    filterOption,

    StateOptions,
    type: profile?.type,
    isReadOnly,
    setIsReadOnly,
    picture: profile?.picture,
  };
};

export default useProfilePage;
