import React, { useEffect } from "react";
import * as Portal from "@radix-ui/react-portal";

interface OverlayProps {
  isOverLay?: boolean;
  zIndex?: number;
}

const Overlay: React.FC<OverlayProps> = ({
  isOverLay = false,
  zIndex = 20,
}) => {
  useEffect(() => {
    if (isOverLay) {
      // Disable scrolling on body when overlay is visible
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when overlay is hidden
      document.body.style.overflow = "";
    }

    // Cleanup to re-enable scrolling when the component unmounts or overlay state changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverLay]);
  return (
    <>
      {isOverLay && (
        <Portal.Root>
          <div
            className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            style={{ zIndex }}
          />
        </Portal.Root>
      )}
    </>
  );
};

export default Overlay;
