import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  // DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TButton from "@/main/common/components/TForm/TButton";

type Props = {
  title: string;
  description: string;
  confirmText: string;
  isPending?: boolean;

  handleClikeFunc?: () => void;
  isAllow?: boolean;
  openButton: React.ReactNode;
};
export function TOneActionClikeDialog({
  isPending,

  title,
  description,
  confirmText,
  openButton,
  handleClikeFunc,
}: Props) {
  const { i18n } = useTranslation("delete");

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{openButton}</DialogTrigger>
        <DialogContent
          classNameBenEditCloseIcon="!top-2"
          stroke="#fff"
          side={`${i18n.language === "ar" ? "right" : "left"}`}
          className="sm:max-w-[785px] max-sm:w-[90%] !p-0  border-0 shadow-none "
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <div className=" bg-primary border-0 p-[19px] w-full shadow-none ">
            <DialogTitle className="mb-2  text-white text-[18px] font-medium border-0">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="p-[19px]">
            {description}
          </DialogDescription>

          <DialogFooter className="p-[19px]">
            <DialogClose className=" me-10 ">
              <TButton
                className=" w-[138px] bg-white text-[#C9972B] border border-[#C9972B]  "
                type="submit"
                disabled={isPending}
                onClick={() => {
                  // handleDelete();
                }}
              >
                إغلاق
              </TButton>
            </DialogClose>
            <DialogClose>
              <TButton
                className="w-[138px] text-white bg-[#C9972B]"
                type="submit"
                disabled={isPending}
                onClick={() => {
                  // handleDelete();
                  handleClikeFunc?.();
                }}
              >
                {confirmText}
              </TButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
