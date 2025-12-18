import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const backgroundMap: Record<string, string> = {
  "/": "bg-gradient-to-t from-orange-40 via-orange-50 to-orange-60 bg-repeat bg-auto bg-blend-overlay bg-pattern-with-gradient",
  "/party-size": "bg-repeat bg-auto bg-blend-overlay bg-pattern-with-gradient",
  "/loading": "bg-repeat bg-auto bg-blend-overlay bg-pattern-loading",
  "/result": "bg-orange-10 bg-repeat bg-auto bg-blend-overlay bg-pattern-with-gradient",
};

export function PageLayout() {
  const location = useLocation();
  const background = backgroundMap[location.pathname] || "";

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div
        className={cn(
          "w-[23.4375rem] h-[50.75rem] flex flex-col overflow-hidden",
          background
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}

