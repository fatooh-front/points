import { useUpdateUserPassword } from "@/main/global/api/restful/userManagmentAPI/usersManager/useUsersQuery";
import { useAuth } from "@/main/global/store/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
export function useProfileEditPasswordDialog() {
  const { i18n, t } = useTranslation("users");
  const { logout } = useAuth();
  const { mutate, isPending } = useUpdateUserPassword("myId");
  const [open, setOpen] = useState(false);

  const formSchema = z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: t("users.dialog.add.validation.currentPassword") }),
      password: z
        .string()
        .min(1, { message: t("users.dialog.add.validation.password") }),
      passwordConfirm: z
        .string()
        .min(1, { message: t("users.dialog.add.validation.passwordConfirm") }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("users.dialog.add.validation.passwordsMatch"),
      path: ["passwordConfirm"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => {
        console.log("User added successfully");
        form.reset({});
        setOpen(false);
        logout();
      },
      onError: (error) => {
        console.error("Error adding service:", error);
      },
    });
  }

  const fireOnClose = () => {
    form.reset({});
  };

  return {
    open,
    setOpen,
    i18n,
    t,
    form,
    onSubmit,
    fireOnClose,
    isPending,
  };
}
