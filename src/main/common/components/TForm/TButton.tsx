import { Button } from "@/components/ui/button";
import SubmitLoading from "../SubmitLoading/SubmitLoading";

type TButtonProps = {
  children: React.ReactNode;
  isPending?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function TButton({ children, isPending = false, ...props }: TButtonProps) {
  return (
    <Button
      // type="submit"
      className="flex items-center gap-2 w-full"
      disabled={isPending}
      {...props}
    >
      {isPending && <SubmitLoading />}
      {!isPending && children}
    </Button>
  );
}

export default TButton;
