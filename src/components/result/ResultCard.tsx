import React from 'react';

interface ResultCardProps {
  foodName: string;
  description: string;
  illustration?: string;
  onRefresh?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onShare?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  foodName,
  description,
  illustration,
  onRefresh,
  onLike,
  onDislike,
  onShare,
}) => {
  return (
    <div 
      className="relative mx-auto"
      style={{
        width: '294px',
        height: '466px',
      }}
    >
      {/* Card Container with Border and Shadow */}
      <div 
        className="relative w-full h-full rounded-[30px] overflow-hidden"
        style={{
          border: '3px solid #fd9476',
          boxShadow: '5px 5px 5px rgba(250, 80, 45, 0.30)',
        }}
      >
        {/* Card Content Area - Orange Gradient Background */}
        <div 
          className="relative w-full h-[394px] flex flex-col items-center justify-center px-6"
          style={{
            background: 'linear-gradient(to top, #fa502d 0%, #f73418 60%, #e91b0e 100%)',
          }}
        >
          {/* Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-60 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: 'url(/assets/images/result_bg_texture.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Food Name */}
          <div className="relative z-10 text-center mb-2">
            <h2 
              className="text-white"
              style={{
                fontFamily: "'Nanum AmSeuTeReuDam', sans-serif",
                fontSize: '60px',
                fontWeight: 400,
                lineHeight: 1,
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
              }}
            >
              {foodName}
            </h2>
          </div>

          {/* Description */}
          <div className="relative z-10 text-center mb-6">
            <p 
              className="text-white"
              style={{
                fontFamily: "'Nanum AmSeuTeReuDam', sans-serif",
                fontSize: '24px',
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>
          </div>

          {/* Illustration - Positioned in center */}
          <div className="relative z-10 flex items-center justify-center">
            {illustration ? (
              <img 
                src={illustration} 
                alt={foodName}
                className="w-auto h-auto max-w-[180px] max-h-[180px] object-contain"
              />
            ) : (
              <div 
                className="flex items-center justify-center rounded-full bg-white/20"
                style={{
                  width: '160px',
                  height: '160px',
                  border: '3px solid #ffffff',
                }}
              >
                <div className="text-6xl">🍽️</div>
              </div>
            )}
          </div>
        </div>

        {/* Action Icons Row - White Background */}
        <div className="bg-white h-[72px] flex items-center justify-center">
          <div className="flex items-center justify-center gap-[45px]">
            {/* Refresh Icon */}
            <button
              onClick={onRefresh}
              className="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white hover:bg-orange-10 transition-colors"
              style={{
                border: '2px solid #fd9476',
              }}
              aria-label="다시하기"
            >
              <img 
                src="/assets/images/icon_refresh.svg" 
                alt="" 
                className="w-[14px] h-[14px]"
                style={{ 
                  filter: 'invert(68%) sepia(41%) saturate(1845%) hue-rotate(329deg) brightness(101%) contrast(98%)'
                }}
              />
            </button>

            {/* Like Icon */}
            <button
              onClick={onLike}
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-white hover:bg-orange-10 transition-colors"
              style={{
                border: '2px solid #fd9476',
              }}
              aria-label="좋아요"
            >
              <img 
                src="/assets/images/icon_thumbs_up.svg" 
                alt="" 
                className="w-[18px] h-[18px]"
                style={{ 
                  filter: 'invert(68%) sepia(41%) saturate(1845%) hue-rotate(329deg) brightness(101%) contrast(98%)'
                }}
              />
            </button>

            {/* Dislike Icon */}
            <button
              onClick={onDislike}
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-white hover:bg-orange-10 transition-colors"
              style={{
                border: '2px solid #fd9476',
              }}
              aria-label="싫어요"
            >
              <img 
                src="/assets/images/icon_thumbs_down.svg" 
                alt="" 
                className="w-[18px] h-[18px]"
                style={{ 
                  filter: 'invert(68%) sepia(41%) saturate(1845%) hue-rotate(329deg) brightness(101%) contrast(98%)'
                }}
              />
            </button>

            {/* Share Icon */}
            <button
              onClick={onShare}
              className="w-[28px] h-[30px] flex items-center justify-center rounded-full bg-white hover:bg-orange-10 transition-colors"
              style={{
                border: '2px solid #fd9476',
              }}
              aria-label="공유하기"
            >
              <img 
                src="/assets/images/icon_share.svg" 
                alt="" 
                className="w-[16px] h-[18px]"
                style={{ 
                  filter: 'invert(68%) sepia(41%) saturate(1845%) hue-rotate(329deg) brightness(101%) contrast(98%)'
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};