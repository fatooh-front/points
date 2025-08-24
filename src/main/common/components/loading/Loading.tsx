import { cn } from "@/lib/utils";
import styles from "./Loader.module.css";

function Loading({ className }: { className?: string }) {
  return (
    <div className="w-full h-100dvh-106px flex justify-center items-center">
      <div className={cn(`${styles.loader}`, className)}></div>
    </div>
  );
}

export default Loading;
