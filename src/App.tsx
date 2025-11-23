import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Typography Section */}
        <section className="space-y-6">
          <Typography variant="title-lg">Typography</Typography>

          <div className="space-y-4">
            <Typography variant="title-lg">Title Large (55px)</Typography>
            <Typography variant="title-sm">Title Small (32px)</Typography>
          </div>

          <div className="space-y-4">
            <Typography variant="text-lg">
              Text Large (30px) - 큰 본문 텍스트입니다.
            </Typography>
            <Typography variant="text-md">
              Text Medium (26px) - 일반 본문 텍스트입니다. 이 크기는 기본값으로
              사용됩니다.
            </Typography>
            <Typography variant="text-sm">
              Text Small (22px) - 작은 본문 텍스트입니다.
            </Typography>
          </div>

          <div className="space-y-2">
            <Typography variant="caption">
              Caption (20px) - 캡션이나 보조 텍스트에 사용됩니다.
            </Typography>
          </div>

          <div className="space-y-4 border-t border-border pt-4">
            <Typography variant="title-sm">커스텀 태그 예제</Typography>
            <Typography variant="text-lg" as="div">
              div 태그로 렌더링되는 텍스트
            </Typography>
            <Typography variant="text-md" as="span">
              span 태그로 렌더링되는 텍스트
            </Typography>
          </div>
        </section>

        {/* Button Section */}
        <section className="space-y-6 border-t border-border pt-8">
          <Typography variant="title-lg">Button</Typography>

          {/* Button Variants */}
          <div className="space-y-4">
            <Typography variant="title-sm">Variants</Typography>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="navy">Navy</Button>
              <Button variant="orange-text">Orange Text</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Button Sizes */}
          <div className="space-y-4">
            <Typography variant="title-sm">Sizes</Typography>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-4">
            <Typography variant="title-sm">Icon Buttons</Typography>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="icon-sm">S</Button>
              <Button size="icon">M</Button>
              <Button size="icon-lg">L</Button>
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-4">
            <Typography variant="title-sm">Disabled State</Typography>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled Default</Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
