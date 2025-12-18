import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium font-sans transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0.1875rem] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-orange-60 active:bg-orange-60",
        destructive:
          "bg-destructive text-white hover:bg-destructive focus-visible:ring-destructive/20",
        outline:
          "border border-border bg-background shadow-xs hover:bg-secondary hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-grey-20",
        navy: "bg-navy text-white hover:opacity-90 active:opacity-80",
        "orange-text":
          "bg-white text-orange-50 border-0 hover:bg-grey-10 active:bg-grey-20",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        handwriting:
          "bg-navy text-white font-sans hover:opacity-90 active:opacity-80",
      },
      size: {
        default: "h-[3.3125rem] px-6 text-md has-[>svg]:px-4",
        sm: "w-[10.125rem] h-[3.3125rem] px-[3rem] py-[0.75rem] text-md has-[>svg]:px-4",
        lg: "w-[20rem] h-[4.0625rem] px-[5.3125rem] py-[0.3125rem] text-[2.5rem] has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  sketchy?: boolean;
  sketchyIntensity?: number;
}

// 각 글자에 변형값 생성
function getCharTransform(
  char: string,
  index: number
): {
  rotate: number;
  translateX: number;
  translateY: number;
} {
  const seed = char.charCodeAt(0) + index * 7;
  const rotate = ((seed % 11) - 5) * 0.8; // -4deg ~ +4deg
  const translateX = ((seed % 7) - 3) * 0.5; // -1.5px ~ +1.5px
  const translateY = ((seed % 5) - 2) * 0.4; // -0.8px ~ +0.8px

  return { rotate, translateX, translateY };
}

// 각 글자마다 개별 필터 생성
function createCharFilter(
  filterId: string,
  charIndex: number,
  sketchyIntensity: number
) {
  // 각 글자의 인덱스를 기반으로 다른 seed 생성
  const seed = charIndex * 17;
  const baseFreqX = 0.04 + (seed % 5) * 0.01;
  const baseFreqY = 0.08 + (seed % 7) * 0.01;

  return (
    <filter
      key={`char-${charIndex}`}
      id={`sketchy-${filterId}-${charIndex}`}
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      colorInterpolationFilters="sRGB"
      primitiveUnits="objectBoundingBox"
    >
      {/* 노이즈 생성 - 떨림용 */}
      <feTurbulence
        baseFrequency={`${baseFreqX} ${baseFreqY}`}
        numOctaves="2"
        result="noise"
      />
      {/* 약한 떨림 효과 */}
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={sketchyIntensity * 0.3}
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />
      {/* 굵기 변화를 위한 노이즈 - 획 내 변화를 위해 가로 방향으로 높은 주파수 */}
      <feTurbulence
        baseFrequency={`${3 + (seed % 4) * 0.8} ${0.5 + (seed % 2) * 0.2}`}
        numOctaves="3"
        result="thicknessNoise"
        type="fractalNoise"
      />
      {/* 획 내 굵기 변화 (시작 굵게 -> 얇게 -> 중간 굵게) */}
      <feComponentTransfer in="thicknessNoise" result="thicknessMask">
        <feFuncA
          type="discrete"
          tableValues="0.6 0.2 0.3 0.5 0.4 0.7 0.35 0.6 0.45 0.5"
        />
      </feComponentTransfer>
      {/* 기본 두께 */}
      <feMorphology
        in="displaced"
        operator="dilate"
        radius={0.1}
        result="base"
      />
      {/* 두꺼운 부분 */}
      <feMorphology
        in="displaced"
        operator="dilate"
        radius={0.5 + sketchyIntensity * 0.5}
        result="thick"
      />
      {/* 마스크를 사용해서 굵기 변화 적용 */}
      <feComposite
        in="thick"
        in2="thicknessMask"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="varied"
      />
      {/* 원본 색상 유지하면서 텍스트 영역에만 적용 */}
      <feComposite in="varied" in2="SourceAlpha" operator="in" />
    </filter>
  );
}

// 텍스트를 형태소 단위로 분리하고 각 형태소에 변형 적용
function HandwritingText({
  children,
  sketchyIntensity = 0.7,
}: {
  children: React.ReactNode;
  sketchyIntensity?: number;
}) {
  const text = typeof children === "string" ? children : String(children);
  const chars = text.split("");
  const filterId = React.useId();

  return (
    <>
      {/* SVG 필터 추가 - 각 글자마다 개별 필터 */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {chars.map((char, index) => {
            if (char === " ") return null;
            return createCharFilter(filterId, index, sketchyIntensity);
          })}
        </defs>
      </svg>
      <span style={{ letterSpacing: "-0.05em" }}>
        {chars.map((char, index) => {
          if (char === " ") {
            return <span key={index}> </span>;
          }

          const { rotate, translateX, translateY } = getCharTransform(
            char,
            index
          );

          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                transform: `rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`,
                filter: `url(#sketchy-${filterId}-${index})`,
                isolation: "isolate",
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </>
  );
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  sketchy = false,
  sketchyIntensity = 0.7,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isHandwriting = variant === "handwriting";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isHandwriting && typeof children === "string" ? (
        <HandwritingText sketchyIntensity={sketchyIntensity}>
          {children}
        </HandwritingText>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
