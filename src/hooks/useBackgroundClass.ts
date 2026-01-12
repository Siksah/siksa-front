import { useLocation, matchPath } from 'react-router-dom';

const backgroundMap: Record<string, string> = {
  '/': '', // 메인 페이지는 자체 배경 이미지 사용
  '/question': 'bg-repeat bg-auto bg-blend-overlay bg-pattern-party-size',
  '/loading': 'bg-repeat bg-auto bg-blend-overlay bg-pattern-loading',
  '/result': 'bg-repeat bg-auto bg-blend-overlay bg-pattern-loading',
};

export function useBackgroundClass(): string {
  const { pathname } = useLocation();

  for (const [pattern, className] of Object.entries(backgroundMap)) {
    if (matchPath({ path: pattern, end: pattern === '/' }, pathname)) {
      return className;
    }
  }
  return '';
}
