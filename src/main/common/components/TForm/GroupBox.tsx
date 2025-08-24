export default function GroupBox({
  children,
  title,
}: {
  children?: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex flex-col gap-5 w-full">
      {title && (
        <h2 className="py-3 px-7 text-center rounded-lg bg-primary-600/20 text-xl font-bold text-secondry truncate">
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-5 justify-start p-7 rounded-lg xl:min-w-[400px] w-full  h-[500px] overflow-y-autp bg-primary-100/5 shadow-addgroup overflow-auto">
        {children}
      </div>
    </div>
  );
}
