import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { FunnelLayout } from './FunnelLayout';
import { Typography } from '@/components/ui/typography';

const meta = {
  title: 'Funnel/FunnelLayout',
  component: FunnelLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    stepNumber: {
      control: 'number',
    },
    showBack: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: '390px', height: '844px', margin: '0 auto' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof FunnelLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div className="flex flex-col items-center justify-center flex-1 gap-4">
    <Typography variant="title-sm" className="text-navy">
      콘텐츠 영역
    </Typography>
    <Typography variant="text-md" className="text-grey-50">
      여기에 콘텐츠가 들어갑니다
    </Typography>
  </div>
);

export const Default: Story = {
  args: {
    stepNumber: 1,
    children: <SampleContent />,
  },
};

export const WithStepNumber: Story = {
  args: {
    stepNumber: 3,
    children: <SampleContent />,
  },
};

export const WithoutStepNumber: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const WithoutBackButton: Story = {
  args: {
    stepNumber: 1,
    showBack: false,
    children: <SampleContent />,
  },
};

export const WithCustomOnBack: Story = {
  args: {
    stepNumber: 2,
    onBack: () => alert('커스텀 뒤로가기 액션'),
    children: <SampleContent />,
  },
};

export const WithCustomHeaderSlots: Story = {
  args: {
    headerLeftSlot: <span className="text-orange-50 font-bold">←</span>,
    headerCenterSlot: (
      <Typography variant="text-md" className="text-navy">
        커스텀 타이틀
      </Typography>
    ),
    headerRightSlot: <span className="text-grey-50">✕</span>,
    children: <SampleContent />,
  },
};
