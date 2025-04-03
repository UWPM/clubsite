import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export const Spinner = ({ className, size = "medium" }: SpinnerProps) => {
  const sizeStyles: Record<NonNullable<SpinnerProps["size"]>, string> = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-12 w-12",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* bg-white bg-opacity-60 */}
      
      <div className="border border-zinc-300 shadow-md bg-zinc-50 flex flex-row gap-2 text-sm items-center p-2 rounded-md">
        <Loader2
          className={cn("animate-spin text-primary", sizeStyles[size], className)}
        />
        Submitting
      </div>
    </div>
  );
};

export default Spinner;