import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

interface ResultPageProps {
  menuName: string;
  menuDescription: string;
  menuImage?: string;
  onRetry?: () => void;
  onFindRestaurant?: () => void;
}

export function ResultPage({
  menuName,
  menuDescription,
  menuImage,
  onRetry,
  onFindRestaurant,
}: ResultPageProps) {
  return (
    <>
      {/* Content */}
      <div className="flex flex-col flex-1 px-5 pt-24">
        {/* Title */}
        <Typography variant="text-lg" className="text-navy text-center mb-8">
          오늘의 추천 메뉴는..!
        </Typography>

        {/* Menu Card */}
        <div className="flex justify-center mb-6">
          <div className="bg-white border-[0.1875rem] border-orange-30 border-solid rounded-[1.875rem] w-[18.1875rem] h-[28.9375rem] overflow-hidden flex flex-col">
            {/* Card Background Gradient */}
            <div className="bg-gradient-to-t from-orange-40 to-orange-50 border-[0.1875rem] border-orange-10 border-solid rounded-[1.0625rem] m-[0.8125rem_0.875rem] flex-1 flex flex-col items-center justify-center px-4 py-8">
              <Typography
                variant="title-lg"
                className="text-white text-center mb-4"
              >
                {menuName}
              </Typography>
              <Typography
                variant="text-lg"
                className="text-orange-10 text-center mb-auto whitespace-pre-line"
              >
                {menuDescription}
              </Typography>

              {/* Menu Image */}
              {menuImage && (
                <div className="w-full h-[11.25rem] flex items-center justify-center mt-auto">
                  <img
                    src={menuImage}
                    alt={menuName}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex justify-center gap-[2.8125rem] mb-8">
          <button className="w-6 h-6 flex items-center justify-center text-orange-30 hover:text-orange-40 transition-colors">
            <ThumbsUp className="w-6 h-6" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-orange-30 hover:text-orange-40 transition-colors">
            <ThumbsDown className="w-6 h-6" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-orange-30 hover:text-orange-40 transition-colors">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[0.625rem] mt-auto mb-6">
          <Button variant="navy" size="sm" onClick={onRetry} className="flex-1">
            다시하기
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onFindRestaurant}
            className="flex-1"
          >
            식당 찾아보기
          </Button>
        </div>
      </div>
    </>
  );
}
