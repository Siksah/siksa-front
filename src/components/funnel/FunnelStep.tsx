import { Typography } from "@/components/ui/typography";
import { FunnelLayout } from "./FunnelLayout";
import { FunnelOption } from "./FunnelOption";

export interface FunnelStepData {
  id: string;
  question: string;
  options: {
    id: string;
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
  }[];
  stepNumber: number;
}

interface FunnelStepProps {
  data: FunnelStepData;
  onSelect: (value: string) => void;
  selectedValue?: string;
  onBack?: () => void;
}

export function FunnelStep({ data, onSelect, selectedValue, onBack }: FunnelStepProps) {
  return (
    <FunnelLayout stepNumber={data.stepNumber} onBack={onBack}>
      {/* Question */}
      <div className="flex justify-center mt-6 mb-8">
        <Typography
          variant="title-sm"
          className="text-navy text-center tracking-[-0.3px]"
          sketchy={true}
        >
          {data.question}
        </Typography>
      </div>

      {/* Options Grid */}
      <div className="flex flex-col gap-[0.625rem] pb-8 flex-1">
        {data.options.map((option) => (
          <FunnelOption
            key={option.id}
            title={option.title}
            subtitle={option.subtitle}
            icon={option.icon}
            selected={selectedValue === option.id}
            onClick={() => onSelect(option.id)}
            className="flex-1"
          />
        ))}
      </div>
    </FunnelLayout>
  );
}
