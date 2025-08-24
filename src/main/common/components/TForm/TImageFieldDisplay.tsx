type TImageFieldDisplay = {
  label?: string;
  alt: string;
  src: string;
  [key: string]: any;
};

export default function TImageFieldDisplay({
  label,
  alt,
  src,
  ...props
}: TImageFieldDisplay) {
  return (
    <div className="flex flex-col gap-2 w-full lg:min-w-[380px] lg:w-1/2 shrink-0 ">
      {label && (
        <h3 className="block text-sm font-medium leading-none text-neutral-600">
          {label}
        </h3>
      )}
      <div className="w-full lg:min-w-[400px] shrink-0">
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className="block w-full aspect-[1.62] rounded-lg"
          {...props}
        />
      </div>
    </div>
  );
}
