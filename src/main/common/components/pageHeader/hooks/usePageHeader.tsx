type Props = {
  title: string;
};

function usePageHeader({ title }: Props) {
  const firstWord = title.split(" ")[0];
  const otherWords = title.split(" ").slice(1).join(" ");
  return { firstWord, otherWords };
}

export default usePageHeader;
