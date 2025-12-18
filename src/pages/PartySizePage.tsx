import * as React from "react";
import { User, Users, UsersRound } from "lucide-react";
import { Typography } from "@/components/ui/typography";

interface PartyOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  selected: boolean;
}

export function PartySizePage() {
  const [selectedOption, setSelectedOption] = React.useState<string>("alone");

  const options: PartyOption[] = [
    {
      id: "alone",
      title: "혼자만의 고독한 미식가",
      subtitle: "(혼자)",
      icon: <User className="w-5 h-5" />,
      selected: selectedOption === "alone",
    },
    {
      id: "two",
      title: "딱 한 명의 식사메이트",
      subtitle: "(둘이)",
      icon: <Users className="w-5 h-5" />,
      selected: selectedOption === "two",
    },
    {
      id: "group",
      title: "왁자지껄 그룹",
      subtitle: "(3인 이상)",
      icon: <UsersRound className="w-5 h-5" />,
      selected: selectedOption === "group",
    },
  ];

  return (
    <>
      {/* Content Container */}
      <div className="flex flex-col flex-1 px-5 pt-11">
        {/* Q1 Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center">
            <div className="bg-orange-50 border border-orange-50 border-solid h-[1.4538125rem] rounded-[0.726875rem] w-[3.8111875rem] flex items-center justify-center">
              <Typography
                variant="text-md"
                className="text-white text-center text-[1.5rem] tracking-[1px]"
              >
                Q1.
              </Typography>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="flex justify-center mb-8">
          <Typography
            variant="title-sm"
            className="text-navy text-center tracking-[-0.3px]"
          >
            점심 식사 파티원 수는?
          </Typography>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-[0.625rem] flex-1 pb-24">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex-1 min-h-0 relative rounded-lg ${
                option.selected
                  ? "bg-[#f8e8e4] border-2 border-orange-40"
                  : "bg-white border-2 border-grey-20"
              }`}
            >
              <div className="flex flex-col gap-[0.625rem] items-center justify-center px-[1.875rem] py-[0.9375rem] h-full">
                <div
                  className={`flex items-center justify-center ${
                    option.selected ? "text-orange-50" : "text-grey-30"
                  }`}
                >
                  {option.icon}
                </div>
                <div className="flex flex-col items-center text-center tracking-[-0.3px]">
                  <Typography
                    variant="text-md"
                    className={`leading-[1.2] ${
                      option.selected ? "text-navy" : "text-grey-50"
                    }`}
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    variant="text-sm"
                    className="leading-[1.875rem] text-grey-30"
                  >
                    {option.subtitle}
                  </Typography>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
