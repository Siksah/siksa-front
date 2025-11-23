import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("font-regular", {
  variants: {
    variant: {
      "title-lg": "text-[55px] leading-tight",
      "title-sm": "text-[32px] leading-tight",
      "text-lg": "text-[30px] leading-normal",
      "text-md": "text-[26px] leading-normal",
      "text-sm": "text-[22px] leading-normal",
      caption: "text-[20px] leading-normal",
    },
  },
  defaultVariants: {
    variant: "text-md",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Component = as || getDefaultTag(variant);
    return (
      <Component
        ref={ref as any}
        className={cn(typographyVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

function getDefaultTag(
  variant?: "title-lg" | "title-sm" | "text-lg" | "text-md" | "text-sm" | "caption" | null
): "h1" | "h2" | "p" | "span" {
  switch (variant) {
    case "title-lg":
      return "h1";
    case "title-sm":
      return "h2";
    case "text-lg":
    case "text-md":
    case "text-sm":
      return "p";
    case "caption":
      return "span";
    default:
      return "p";
  }
}

export { Typography, typographyVariants };


