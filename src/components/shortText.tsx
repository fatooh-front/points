import React from "react";

interface ShortTextProps extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
  minimumLength?: number;
}

export default function ShortText(props: ShortTextProps) {
  return (
    <div>
      <div {...props}>
        {typeof props.children === "string" &&
        props.children.length >= (props.minimumLength || 10)
          ? props.children?.toString().slice(0, props.length || 10) + "..."
          : props.children}
      </div>
    </div>
  );
}
