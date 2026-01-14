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
    className: {
      control: 'text',
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
    children: <SampleContent />,
  },
};

export const WithClassName: Story = {
  args: {
    className: 'bg-orange-10',
    children: <SampleContent />,
  },
};
