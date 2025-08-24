function TitleLegendSection({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <span
      className={`absolute px-3 ${className} w-fit text-base font-semibold text-center text-secondry bg-half-half`}
    >
      {title}
    </span>
  );
}

export default TitleLegendSection;
