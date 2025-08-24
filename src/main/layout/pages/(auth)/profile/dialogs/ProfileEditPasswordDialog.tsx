import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KeyRound, Save } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useProfileEditPasswordDialog } from "./hooks/useProfileEditPasswordDialog";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import PopupHeader from "@/main/common/components/dialogHeader/PopupHeader";

export function ProfileEditPasswordDialog() {
  const {
    open,
    setOpen,
    i18n,
    t,
    form,
    onSubmit,
    fireOnClose,
    isPending,
    // selectedCountry,
  } = useProfileEditPasswordDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild className="flex items-center justify-center">
        <Button className="p-0" variant="ghost">
          <KeyRound size={25} className="text-gray-700" />
        </Button>
      </DialogTrigger>
      <DialogContent
        isOverLay={open}
        onClose={fireOnClose}
        onInteractOutside={(e: any) => e.preventDefault()}
        onPointerDownOutside={(e: any) => e.preventDefault()}
        side={`${i18n.language === "ar" ? "right" : "left"}`}
        className="min-h-50vh h-fit max-h-100vh-20px w-100vw-20px md:max-w-[400px]"
      >
        <div className="m-0 p-0">
          <Form {...form}>
            <DialogHeader>
              <DialogTitle className="flex gap-5">
                <PopupHeader
                  title={t("users.editPassword.dialog.edit.header")}
                />
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col max-h-full gap-6 pt-3 h-100-31px"
            >
              <div className="flex flex-col md:flex-1 gap-y-3">
                <div className="flex flex-col xs:flex-row justify-between gap-5 w-full">
                  <TFormField
                    typeField="input"
                    type="password"
                    form={form}
                    name="currentPassword"
                    label={t("users.dialog.add.currentPassword")}
                    labelInput={t("users.dialog.add.currentPassword")}
                    autoComplete="new-password"
                  />
                </div>
                <div className="flex flex-col xs:flex-row justify-between gap-5 w-full">
                  <TFormField
                    typeField="input"
                    type="password"
                    form={form}
                    name="password"
                    label={t("users.dialog.add.password")}
                    labelInput={t("users.dialog.add.password")}
                    autoComplete="new-password"
                  />
                </div>
                <div className="flex flex-col xs:flex-row justify-between gap-5 w-full">
                  <TFormField
                    typeField="input"
                    form={form}
                    type="password"
                    name="passwordConfirm"
                    label={t("users.dialog.add.passwordConfirm")}
                    labelInput={t("users.dialog.add.passwordConfirm")}
                    autoComplete="new-password"
                  />
                </div>
                <div className="w-full">
                  <TButton
                    type="submit"
                    className="flex items-center gap-2 w-full mt-[0.45rem]"
                    disabled={isPending}
                  >
                    <Save size={16} />
                    <p> {t("users.dialog.edit.save")}</p>
                  </TButton>
                </div>
              </div>
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
