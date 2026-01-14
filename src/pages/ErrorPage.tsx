import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <Typography
        variant="title-sm"
        isShadow={false}
        className="text-navy text-center mb-4"
      >
        앗! 문제가 발생했어요
      </Typography>
      <Typography
        variant="text-md"
        isShadow={false}
        className="text-grey-50 text-center mb-8"
      >
        잠시 후 다시 시도해주세요
      </Typography>
      <Button variant="navy" onClick={() => navigate('/')}>
        홈으로 돌아가기
      </Button>
    </div>
  );
}
