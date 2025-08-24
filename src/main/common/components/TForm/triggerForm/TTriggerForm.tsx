import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { TDeleteDialog } from "../delete/TDeleteDialog";
import BenEditIcon from "@/main/global/assets/svg/benEditIcon";

type Props = {
  type?: string;
  btn?: boolean;
  addText?: string;
  editText?: string;
  viewText?: string;
  isPage?: boolean;
  passedButton?: React.ReactNode;
  href?: string;
  baseUrl?: string;
  id?: string | number;
  mutateDelete?: (variable: any) => void;
  isPendingDelete?: boolean;
  isAllow?: boolean;
  classNameBtn?: {
    add?: string;
    edit?: string;
    view?: string;
  };
  isShowIconBtn?: boolean;
  iconAfter?: React.ReactNode;
  [key: string]: any;
};
export default function TTriggerForm({
  type = "add",
  btn = false,
  addText,
  editText,
  viewText,
  isPage,
  href,
  baseUrl,
  id,
  mutateDelete,
  isPendingDelete = false,
  classNameBtn,
  isShowIconBtn = true,
  isAllow,
  iconAfter,
  passedButton,
  ...props
}: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // const { isAllowMethod } = useHasPermission({ type });
  const isAllowMethod = () => true;
  const goPage = () => {
    if (isPage) {
      const link = href || baseUrl || pathname;
      const completeLink = `${type}${type !== "add" && id ? `/${id}` : ""}`;
      navigate(href || `${link}/${completeLink}`);
    }
  };

  return (
    <div>
      {type === "delete" &&
        (isAllow || isAllowMethod()) &&
        id &&
        mutateDelete && (
          <TDeleteDialog
            id={id as number}
            mutate={mutateDelete}
            isPending={isPendingDelete}
          />
        )}
      {type === "delete" && (isAllow || isAllowMethod()) && props.onClick && (
        <Button
          type="button"
          className="p-0 m-0"
          variant="ghost"
          onClick={(e) => props.onClick(e)}
        >
          <Trash className="h-4 w-4 text-red-700" />
        </Button>
      )}
      {btn &&
        type === "add" &&
        (isAllow || isAllowMethod()) &&
        (passedButton ? (
          <div
            className=""
            onClick={(e) => {
              goPage();
              props?.onClick(e);
            }}
          >
            {passedButton}
          </div>
        ) : (
          <Button
            type="button"
            size="sm"
            className={cn(
              " lg:flex  shadow-xl font-normal text-sm h-[48px]  gap-2 hover:opacity-70 w-full sm:w-fit",
              classNameBtn?.add
            )}
            onClick={(e) => {
              goPage();
              props?.onClick(e);
            }}
          >
            {isShowIconBtn && <p className="font-normal text-sm">+</p>}
            {addText}
            {iconAfter && iconAfter}
          </Button>
        ))}

      {btn && type === "edit" && (isAllow || isAllowMethod()) && (
        <Button
          type="button"
          size="sm"
          className={cn(
            "h-8 lg:flex  shadow-none  bg-transparent hover:opacity-70 w-full sm:w-fit",
            classNameBtn?.edit
          )}
          onClick={(e) => {
            goPage();
            props?.onClick(e);
          }}
        >
          {isShowIconBtn && <BenEditIcon className="h-4 w-4 text-yellow-700" />}
          {editText}
        </Button>
      )}

      {btn && type === "view" && (isAllow || isAllowMethod()) && (
        <Button
          type="button"
          size="sm"
          className={cn(
            "h-8 lg:flex bg-primary shadow-xl shadow-primary-50/80 hover:bg-primary/90 w-full sm:w-fit",
            classNameBtn?.view
          )}
          onClick={(e) => {
            goPage();
            props?.onClick(e);
          }}
        >
          <Eye className="h-4 w-4 text-green-700" />
          {viewText}
        </Button>
      )}

      {!btn && type === "add" && (isAllow || isAllowMethod()) && (
        <Button
          type="button"
          className="p-0"
          variant="ghost"
          onClick={(e) => {
            goPage();
            props?.onClick(e);
          }}
        >
          <PlusCircle className="h-4 w-4 text-green-700" />
        </Button>
      )}

      {!btn && type === "edit" && (isAllow || isAllowMethod()) && (
        <Button
          type="button"
          className="p-0"
          variant="ghost"
          onClick={(e) => {
            goPage();
            props?.onClick(e);
          }}
        >
          <Pencil className="h-4 w-4 text-yellow-700" />
        </Button>
      )}

      {!btn && type === "view" && (isAllow || isAllowMethod()) && (
        <Button
          type="button"
          className="p-0"
          variant="ghost"
          onClick={(e) => {
            goPage();
            props?.onClick(e);
          }}
        >
          <Eye className="h-4 w-4 text-green-700" />
        </Button>
      )}
    </div>
  );
}
