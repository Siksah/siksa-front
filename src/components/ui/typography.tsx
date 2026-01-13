import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 손글씨 효과를 위한 래퍼 컴포넌트
// 근본적인 해결: 전체 텍스트를 하나로 유지하고 필터를 한 번만 적용
function HandwritingWrapper({
  sketchy,
  filterId,
  children,
}: {
  sketchy: boolean;
  filterId: string;
  children: React.ReactNode;
}) {
  if (!sketchy) {
    return <>{children}</>;
  }

  // 전체 텍스트를 하나의 요소로 유지 (글자 분리 제거)
  // 고해상도 렌더링을 위한 스타일 추가
  return (
    <span
      style={{
        filter: `url(#sketchy-${filterId})`,
        textRendering: 'geometricPrecision',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        display: 'inline-block',
        // 고해상도 렌더링 힌트
        shapeRendering: 'geometricPrecision',
        // GPU 가속으로 부드러운 렌더링
        willChange: 'filter',
        transform: 'translateZ(0)',
      }}
    >
      {children}
    </span>
  );
}

// 태그 파싱 및 스타일 적용 유틸리티
const processDecorations = (text: string) => {
  // <tag>content</tag> 패턴 매칭
  // 지원 태그: orange, b (bold), u (underline), c (circle)
  const regex = /<(orange|b|u|c)>(.*?)<\/\1>/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // 매칭 전 일반 텍스트 추가
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const tag = match[1];
    const content = match[2];
    const key = `${tag}-${match.index}`;

    // 태그별 스타일 적용
    switch (tag) {
      case 'orange':
        parts.push(
          <span key={key} className="!text-[#f73418] font-normal">
            {content}
          </span>
        );
        break;
      case 'b':
        parts.push(
          <span key={key} className="!font-bold !text-[#1c202c]">
            {content}
          </span>
        );
        break;
      case 'u':
        parts.push(
          <span key={key} className="relative inline-block">
            <span className="relative z-10">{processDecorations(content)}</span>
            <img
              src="/assets/images/funnel/highlight_underline.svg"
              alt=""
              className="absolute bottom-[-8px] left-0 w-full h-[12px] z-0 opacity-100"
            />
          </span>
        );
        break;
      case 'c':
        // 한 글자일 때 더 동그랗게 보이도록 비율 조정
        const isSingleChar = content.trim().length === 1;
        parts.push(
          <span key={key} className="relative inline-block">
            <span className="relative z-10">{processDecorations(content)}</span>
            <img
              src="/assets/images/funnel/highlight_circle.svg"
              alt=""
              className={cn(
                "absolute z-0 opacity-100 pointer-events-none",
                isSingleChar
                  ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] max-w-none"
                  : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] max-w-none !scale-x-[1.2]"
              )}
            />
          </span>
        );
        break;
      default:
        parts.push(<span key={key}>{content}</span>);
    }

    lastIndex = regex.lastIndex;
  }

  // 남은 텍스트 추가
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const typographyVariants = cva('font-normal', {
  variants: {
    variant: {
      'title-xl': 'text-[4.375rem] leading-none tracking-normal',
      'title-lg': 'text-[3.4375rem] leading-[1] tracking-normal',
      'title-sm': 'text-[2rem] leading-[1.15] tracking-[-0.3px]',
      'text-lg': 'text-[1.875rem] leading-[1] tracking-normal',
      'text-md': 'text-[1.625rem] leading-[1.2] tracking-[-0.3px]',
      'text-sm': 'text-[1.375rem] leading-7.5 tracking-[-0.3px]',
      caption: 'text-[1.25rem] leading-[1.2] tracking-normal',
    },
  },
});

export interface TypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'style'>,
    VariantProps<typeof typographyVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  sketchy?: boolean;
  sketchyIntensity?: number;
  highlightText?: string;
  highlightColor?: string;
  // 커스텀 필터 파라미터 (테스트용)
  filterParams?: {
    morphologyRadius?: number;
    blurStdDev?: number;
    displacementScale?: number;
    transferSlope?: number;
    transferIntercept?: number;
  };
  // Common style props
  isShadow?: boolean;
  shadowColor?: string;
  // Typography-specific props (converted to Tailwind classes)
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  fontStyle?: 'normal' | 'italic';
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
      highlightText,
      highlightColor = 'text-orange-50',
      filterParams,
      isShadow = true,
      shadowColor = '#A6160D',
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle = 'normal',
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
      sketchy !== undefined ? sketchy : (presetStyles?.sketchy ?? false);
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

    // 필터 파라미터 계산 (filterParams가 있으면 우선 사용, 없으면 sketchyIntensity에 따라 조정)
    const finalSketchyIntensity =
      sketchyIntensity !== undefined
        ? sketchyIntensity
        : (presetStyles?.sketchyIntensity ?? 1);

    const morphologyRadius =
      filterParams?.morphologyRadius ??
      0.08 + (finalSketchyIntensity - 1) * 0.04; // 0.08 ~ 0.16
    const blurStdDev =
      filterParams?.blurStdDev ?? 0.15 + (finalSketchyIntensity - 1) * 0.1; // 0.15 ~ 0.35
    const displacementScale =
      filterParams?.displacementScale ?? 6 * finalSketchyIntensity; // 6 ~ 10
    const transferSlope =
      filterParams?.transferSlope ?? 4 + (finalSketchyIntensity - 1) * 1; // 4 ~ 6
    const transferIntercept =
      filterParams?.transferIntercept ??
      -0.5 - (finalSketchyIntensity - 1) * 0.1; // -0.5 ~ -0.7

    // Build className with Tailwind utilities
    const shadowValue = shadowColor.replace('#', '');

    // Use Tailwind arbitrary values with CSS variables
    const fontFamilyClass = finalFontFamily
      ? '[font-family:var(--typography-font-family)]'
      : null;
    const fontSizeClass = finalFontSize
      ? '[font-size:var(--typography-font-size)]'
      : null;
    const fontWeightClass = finalFontWeight
      ? typeof finalFontWeight === 'number'
        ? '[font-weight:var(--typography-font-weight)]'
        : `font-${finalFontWeight}`
      : null;
    const lineHeightClass = finalLineHeight
      ? finalLineHeight === 'normal'
        ? 'leading-normal'
        : '[line-height:var(--typography-line-height)]'
      : null;
    const letterSpacingClass = finalLetterSpacing
      ? finalLetterSpacing === 'normal' || finalLetterSpacing === '0%'
        ? 'tracking-normal'
        : '[letter-spacing:var(--typography-letter-spacing)]'
      : null;

    const baseClasses = [
      'text-white', // 기본 색상 흰색
      'whitespace-nowrap', // 기본값
      variant && typographyVariants({ variant }),
      isShadow && `[text-shadow:2px_2px_2px_#${shadowValue}]`,
      fontStyle === 'italic' && 'italic',
      fontStyle === 'normal' && 'not-italic',
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
      styleProps['--typography-font-family'] = finalFontFamily;
    }
    if (finalFontSize) {
      styleProps['--typography-font-size'] = finalFontSize;
    }
    if (finalFontWeight) {
      styleProps['--typography-font-weight'] = String(finalFontWeight);
    }
    if (finalLineHeight) {
      styleProps['--typography-line-height'] = finalLineHeight;
    }
    if (finalLetterSpacing) {
      styleProps['--typography-letter-spacing'] = finalLetterSpacing;
    }

    // Filter는 HandwritingWrapper에서 각 글자에 적용하므로 여기서는 제거
    const hasStyleProps = Object.keys(styleProps).length > 0;

    const renderChildren = () => {
      // highlightText prop이 있으면 기존 로직 사용
      if (typeof props.children === 'string' && highlightText) {
        const parts = props.children.split(
          new RegExp(`(${highlightText})`, 'gi')
        );
        return (
          <>
            {parts.map((part, index) =>
              part.toLowerCase() === highlightText.toLowerCase() ? (
                <span key={index} className={highlightColor}>
                  {part}
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
          </>
        );
      }
      
      // 문자열인 경우 데코레이션 태그 파싱 수행
      if (typeof props.children === 'string') {
        return processDecorations(props.children);
      }
      
      return props.children;
    };

    return (
      <>
        {finalSketchy && (
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter
                id={`sketchy-${filterId}`}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                colorInterpolationFilters="sRGB"
              >
                {/* 1단계: 잉크 보충 (고해상도 샘플링) */}
                <feMorphology
                  operator="dilate"
                  radius={morphologyRadius}
                  in="SourceGraphic"
                  result="thickened"
                />
                {/* 2단계: 왜곡 맵 (매우 부드러운 노이즈로 자글자글함 최소화) */}
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.01"
                  numOctaves="3"
                  seed="1"
                  result="noise"
                />
                {/* 노이즈 블러 (더 부드러운 변형) */}
                <feGaussianBlur
                  in="noise"
                  stdDeviation="1"
                  result="smoothNoise"
                />
                {/* 3단계: 필압 효과 (부드러운 노이즈 사용) */}
                <feDisplacementMap
                  in="thickened"
                  in2="smoothNoise"
                  scale={displacementScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="distorted"
                />
                {/* 4단계: 부드러운 블러 (자글자글함 최소화) */}
                <feGaussianBlur
                  in="distorted"
                  stdDeviation={blurStdDev}
                  result="blurred"
                />
                {/* 알파 채널 조정 (자연스러운 대비) */}
                <feComponentTransfer in="blurred">
                  <feFuncA
                    type="linear"
                    slope={transferSlope}
                    intercept={transferIntercept}
                  />
                </feComponentTransfer>
              </filter>
            </defs>
          </svg>
        )}
        <Component
          ref={ref as any}
          className={cn(baseClasses)}
          style={hasStyleProps ? styleProps : undefined}
          {...props}
        >
          {finalSketchy ? (
            <HandwritingWrapper sketchy={finalSketchy} filterId={filterId}>
              {renderChildren()}
            </HandwritingWrapper>
          ) : (
            renderChildren()
          )}
        </Component>
      </>
    );
  }
);

Typography.displayName = 'Typography';

function getDefaultTag(
  variant?:
    | 'title-xl'
    | 'title-lg'
    | 'title-sm'
    | 'text-lg'
    | 'text-md'
    | 'text-sm'
    | 'caption'
    | null
): 'h1' | 'h2' | 'p' | 'span' {
  switch (variant) {
    case 'title-lg':
      return 'h1';
    case 'title-sm':
      return 'h2';
    case 'text-lg':
    case 'text-md':
    case 'text-sm':
      return 'p';
    case 'caption':
      return 'span';
    default:
      return 'p';
  }
}

// Typography presets for common use cases
export const typographyPresets = {
  'main-subtitle': {
    fontFamily: '"Nanum AmSeuTeReuDam", sans-serif',
    fontSize: '20px',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: undefined,
    sketchy: true,
    sketchyIntensity: 1,
  },
  'main-title': {
    fontFamily: '"Single Day", sans-serif',
    fontSize: '70px',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: undefined,
    sketchy: true,
    sketchyIntensity: 1,
  },
  'funnel-title': {
    fontFamily: '"Nanum AmSeuTeReuDam", sans-serif',
    fontSize: '24px',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '-0.3px',
    sketchy: true,
    sketchyIntensity: 1,
  },
} as const;

export type TypographyPreset = keyof typeof typographyPresets;

export { Typography, typographyVariants };
