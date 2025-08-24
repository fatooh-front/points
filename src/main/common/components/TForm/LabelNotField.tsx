import { PropsWithChildren } from "react";

function LabelNotField({ children, ...props }: PropsWithChildren) {
  return (
    <p
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block"
      {...props}
    >
      {children}
    </p>
  );
}

export default LabelNotField;
