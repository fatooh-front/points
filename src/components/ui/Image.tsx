import React from "react";
import Loading from "@/main/common/components/loading/Loading";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Image({ src, alt = "", ...rest }: ImageProps) {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className={rest.className || ""}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className={
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"
        }
        {...rest}
      />
    </div>
  );
}
