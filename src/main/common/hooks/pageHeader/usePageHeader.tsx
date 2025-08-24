import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  switchStatus?: ReactNode;
};

function usePageHeader({ title }: PageHeaderProps) {
  const firstWord = title.split(" ")[0];
  const otherWords = title.split(" ").slice(1).join(" ");
  return { firstWord, otherWords };
}

export default usePageHeader;
