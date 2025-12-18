import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("font-regular", {
  variants: {
    variant: {
      "title-xl": "text-[4.375rem] leading-none tracking-normal",
      "title-lg": "text-[3.4375rem] leading-none tracking-normal",
      "title-sm": "text-[2rem] leading-[1.15] tracking-[-0.3px]",
      "text-lg": "text-[1.875rem] leading-normal tracking-normal",
      "text-md": "text-[1.625rem] leading-[1.2] tracking-[-0.3px]",
      "text-sm": "text-[1.375rem] leading-[1.875rem] tracking-[-0.3px]",
      caption: "text-[1.25rem] leading-[1.2] tracking-normal",
    },
  },
});

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "style">,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  sketchy?: boolean;
  sketchyIntensity?: number;
  // Common style props
  isShadow?: boolean;
  shadowColor?: string;
  // Typography-specific props (converted to Tailwind classes)
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  fontStyle?: "normal" | "italic";
  lineHeight?: string;
  letterSpacing?: string;
  // Preset prop - applies preset styles
  preset?: TypographyPreset;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      as,
      sketchy,
      sketchyIntensity,
      isShadow = true,
      shadowColor = "#A6160D",
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle = "normal",
      lineHeight,
      letterSpacing,
      preset,
      ...props
    },
    ref
  ) => {
    // Apply preset styles if preset is provided
    const presetStyles = preset ? typographyPresets[preset] : null;

    // Merge preset styles with explicit props (explicit props take precedence)
    // sketchy가 undefined일 때만 preset 사용, 그 외에는 명시적 값 사용
    const finalSketchy =
      sketchy !== undefined ? sketchy : presetStyles?.sketchy ?? false;
    const finalSketchyIntensity =
      sketchyIntensity !== undefined
        ? sketchyIntensity
        : presetStyles?.sketchyIntensity ?? 3;
    const finalFontFamily = fontFamily ?? presetStyles?.fontFamily;
    const finalFontSize = fontSize ?? presetStyles?.fontSize;
    const finalFontWeight = fontWeight ?? presetStyles?.fontWeight;
    const finalLineHeight = lineHeight ?? presetStyles?.lineHeight;
    const finalLetterSpacing =
      letterSpacing ??
      (presetStyles?.letterSpacing !== undefined
        ? presetStyles.letterSpacing
        : undefined);
    const Component = as || getDefaultTag(variant);
    const filterId = React.useId();

    // Build className with Tailwind utilities
    const shadowValue = shadowColor.replace("#", "");

    // Use Tailwind arbitrary values with CSS variables
    const fontFamilyClass = finalFontFamily
      ? "[font-family:var(--typography-font-family)]"
      : null;
    const fontSizeClass = finalFontSize
      ? "[font-size:var(--typography-font-size)]"
      : null;
    const fontWeightClass = finalFontWeight
      ? typeof finalFontWeight === "number"
        ? "[font-weight:var(--typography-font-weight)]"
        : `font-${finalFontWeight}`
      : null;
    const lineHeightClass = finalLineHeight
      ? finalLineHeight === "normal"
        ? "leading-normal"
        : "[line-height:var(--typography-line-height)]"
      : null;
    const letterSpacingClass = finalLetterSpacing
      ? finalLetterSpacing === "normal" || finalLetterSpacing === "0%"
        ? "tracking-normal"
        : "[letter-spacing:var(--typography-letter-spacing)]"
      : null;

    const baseClasses = [
      "text-white", // 기본 색상 흰색
      "whitespace-nowrap", // 기본값
      variant && typographyVariants({ variant }),
      isShadow && `[text-shadow:2px_2px_2px_#${shadowValue}]`,
      fontStyle === "italic" && "italic",
      fontStyle === "normal" && "not-italic",
      fontFamilyClass,
      fontSizeClass,
      fontWeightClass,
      lineHeightClass,
      letterSpacingClass,
      className,
    ].filter(Boolean);

    // CSS variables와 filter를 설정하기 위한 style prop
    // Filter는 런타임 동적 값이므로 style prop으로 직접 설정
    const styleProps: React.CSSProperties & Record<string, string> = {};

    // CSS variables 설정
    if (finalFontFamily) {
      styleProps["--typography-font-family"] = finalFontFamily;
    }
    if (finalFontSize) {
      styleProps["--typography-font-size"] = finalFontSize;
    }
    if (finalFontWeight) {
      styleProps["--typography-font-weight"] = String(finalFontWeight);
    }
    if (finalLineHeight) {
      styleProps["--typography-line-height"] = finalLineHeight;
    }
    if (finalLetterSpacing) {
      styleProps["--typography-letter-spacing"] = finalLetterSpacing;
    }

    // Filter 설정 (가장 중요!)
    if (finalSketchy) {
      styleProps.filter = `url(#sketchy-${filterId})`;
    }

    const hasStyleProps = Object.keys(styleProps).length > 0;

    return (
      <>
        {finalSketchy && (
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter
                id={`sketchy-${filterId}`}
                x="0%"
                y="0%"
                width="100%"
                height="100%"
              >
                <feTurbulence
                  baseFrequency="0.04 0.08"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale={finalSketchyIntensity}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>
        )}
        <Component
          ref={ref as any}
          className={cn(baseClasses)}
          style={hasStyleProps ? styleProps : undefined}
          {...props}
        />
      </>
    );
  }
);

Typography.displayName = "Typography";

function getDefaultTag(
  variant?:
    | "title-xl"
    | "title-lg"
    | "title-sm"
    | "text-lg"
    | "text-md"
    | "text-sm"
    | "caption"
    | null
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

// Typography presets for common use cases
export const typographyPresets = {
  "main-subtitle": {
    fontFamily: '"Nanum AmSeuTeReuDam", sans-serif',
    fontSize: "1.875rem",
    fontWeight: "400",
    lineHeight: "100%",
    letterSpacing: "-0.1em",
    sketchy: true,
    sketchyIntensity: 1,
  },
  "main-title": {
    fontFamily: '"Single Day", sans-serif',
    fontSize: "4.375rem",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: undefined,
    sketchy: true,
    sketchyIntensity: 1,
  },
} as const;

export type TypographyPreset = keyof typeof typographyPresets;

export { Typography, typographyVariants };
