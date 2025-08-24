import { Expand, Minimize } from "lucide-react";
import { useEffect, useState } from "react";

export default function FullMode() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  return (
    <>
      {isFullScreen ? (
        <Minimize onClick={toggleFullScreen} className="cursor-pointer" />
      ) : (
        <Expand onClick={toggleFullScreen} className="cursor-pointer" />
      )}
    </>
  );
}
