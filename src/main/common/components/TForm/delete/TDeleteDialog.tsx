import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TButton from "@/main/common/components/TForm/TButton";
import { handleDeleteFront } from "@/main/global/utils/curdOperation";
import TrashEditIcon from "@/main/global/assets/svg/TrashEditIcon";

type Props = {
  id?: number | string;
  mutate?: (variable: any) => void;
  isPending?: boolean;
  items?: any;
  setItems?: any;
  handleDeleteFunc?: () => void;
  isAllow?: boolean;
};
export function TDeleteDialog({
  id,
  mutate,
  isPending,
  items,
  setItems,
  handleDeleteFunc,
}: Props) {
  const { i18n, t } = useTranslation("delete");
  // const { isAllowMethod } = useHasPermission({ type: "delete" });
  const handleDelete = () => {
    if (!mutate && id && items && setItems) {
      handleDeleteFront({ id, items, setItems });
    }
    if (mutate && id && !isPending) {
      mutate({ id });
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="p-0 w-[43px] h-[36px] bg-[#E52B2E1F] hover:opacity-70 hover:bg-[#E52B2E1F]"
            variant="ghost"
          >
            <TrashEditIcon className=" text-red-700" />
          </Button>
        </DialogTrigger>
        <DialogContent
          side={`${i18n.language === "ar" ? "right" : "left"}`}
          className="sm:max-w-[425px] max-sm:w-[90%]"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="mb-2">{t("delete.title")}</DialogTitle>
            <DialogDescription>{t("delete.description")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <TButton
                type="submit"
                disabled={isPending}
                onClick={() => {
                  handleDelete();
                  handleDeleteFunc?.();
                }}
              >
                {t("delete.confirm")}
              </TButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
