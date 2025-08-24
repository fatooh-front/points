import { ReactNode } from "react";

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  switchStatus?: ReactNode;
};

export type Option = {
  value: any;
  label: any;
};

export type AttachmentIconProps = {
  className?: string;
};

export type ParamsQuery = {
  [key: string]: any;
};
