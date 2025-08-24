export default function ErrorPage({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) {
  return (
    <div className="flex flex-col gap-3 h-100dvh-106px w-full justify-center items-center">
      <span className="text-center text-gray-400/70 text-xl md:text-3xl">
        {statusCode}
      </span>
      <p className="text-center text-gray-400/70 text-xl md:text-3xl">
        {message}
      </p>
    </div>
  );
}
