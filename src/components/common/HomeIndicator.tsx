import * as React from "react";

interface HomeIndicatorProps {
  color?: "black" | "white";
}

export function HomeIndicator({ color = "black" }: HomeIndicatorProps) {
  const bgColor = color === "white" ? "bg-white" : "bg-[#191919]";

  return (
    <div className="absolute h-[22px] left-0 top-[790px] w-[375px]">
      <div className="absolute inset-0 overflow-clip">
        <div className={`absolute ${bgColor} bottom-[8px] h-[5px] left-[calc(50%+0.5px)] rounded-[100px] translate-x-[-50%] w-[134px]`} />
      </div>
    </div>
  );
}

