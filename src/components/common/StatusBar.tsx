import * as React from "react";

interface StatusBarProps {
  textColor?: "black" | "white";
}

export function StatusBar({ textColor = "black" }: StatusBarProps) {
  const textColorClass = textColor === "white" ? "text-white" : "text-black";
  const borderColorClass = textColor === "white" ? "border-white" : "border-black";
  const bgColorClass = textColor === "white" ? "bg-white" : "bg-black";

  return (
    <div className="absolute h-[51.527px] left-1/2 top-0 translate-x-[-50%] w-[375px]">
      <div className="absolute h-[51.527px] left-0 right-[64.25%] top-[calc(50%+0.24px)] translate-y-[-50%]">
        <p className={`absolute font-['SF_Pro:Semibold',sans-serif] inset-[33.96%_36.94%_25.28%_36.96%] leading-[20.992px] not-italic text-[16.221px] ${textColorClass} text-center`}>
          9:41
        </p>
      </div>
      <div className="absolute h-[51.527px] left-[64.25%] right-0 top-[calc(50%+0.24px)] translate-y-[-50%]">
        <div className="absolute bottom-[33.33%] contents left-[calc(50%+23.29px)] top-[42.59%] translate-x-[-50%]">
          <div className={`absolute border-[0.954px] ${borderColorClass} border-solid bottom-[33.33%] left-[calc(50%+22.18px)] opacity-[0.35] rounded-[4.103px] top-[42.59%] translate-x-[-50%] w-[23.855px]`} />
          <div className="absolute bottom-[41.01%] left-[calc(50%+35.7px)] top-[51.45%] translate-x-[-50%] w-[1.267px]">
            <div className={`absolute ${bgColorClass} bottom-[37.04%] left-[calc(50%+22.18px)] rounded-[2.385px] top-[46.3%] translate-x-[-50%] w-[20.038px]`} />
          </div>
        </div>
      </div>
    </div>
  );
}

