import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Typography } from "@/components/ui/typography";

interface FunnelLayoutProps {
  children: React.ReactNode;
  stepNumber?: number;
  className?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function FunnelLayout({
  children,
  stepNumber,
  className,
  showBack = true,
  onBack,
}: FunnelLayoutProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col overflow-hidden relative",
        // Background is already handled by PageLayout, but keeping it here as a fallback or override if passed via className
        className
      )}
    >


      {/* Header */}
      <div className="flex items-center justify-between px-5 py-2 relative z-10 h-12">
        {showBack && (
          <button onClick={handleBack} className="p-1 -ml-2">
            <ChevronLeft className="w-8 h-8 text-navy" />
          </button>
        )}

        {stepNumber && (
          <div className="absolute left-1/2 -translate-x-1/2 top-4">
             <div className="bg-orange-50 border border-orange-50 border-solid h-[1.45rem] rounded-[0.72rem] w-[3.8rem] flex items-center justify-center">
              <Typography
                variant="text-md"
                className="text-white text-center text-[1.5rem] tracking-[1px] leading-none pb-[2px]"
              >
                Q{stepNumber}.
              </Typography>
            </div>
          </div>
        )}
        
        <div className="w-8" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-y-auto px-5 pb-8">
        {children}
      </div>
    </div>
  );
}
