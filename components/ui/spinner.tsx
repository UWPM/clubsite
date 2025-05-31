import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface SpinnerProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-gray-200 border-t-gray-900",
  {
    variants: {
      size: {
        small: "size-4",
        medium: "size-6",
        large: "size-12",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

export const Spinner = ({ className, size = "medium" }: SpinnerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* bg-white bg-opacity-60 */}

      <div className="flex flex-row items-center gap-2 rounded-md border border-zinc-300 bg-zinc-50 p-2 text-sm shadow-md">
        <Loader2 className={cn(spinnerVariants({ size }), className)} />
        Submitting
      </div>
    </div>
  );
};

export default Spinner;
