import type { Meta, StoryObj } from '@storybook/react';
import { FunnelOption } from './FunnelOption';
import { BicepsFlexed, Snowflake, Timer } from 'lucide-react';

const meta = {
  title: 'Funnel/FunnelOption',
  component: FunnelOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FunnelOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'default',
    title: '아무거나! 집 나간 입맛',
  },
};

export const Selected: Story = {
  args: {
    value: 'selected',
    title: '튼튼! 건강 챙기는 보양식',
    selected: true,
  },
};

export const WithIcon: Story = {
  args: {
    value: 'with-icon',
    title: '튼튼! 건강 챙기는 보양식',
    icon: <BicepsFlexed className="w-8 h-8 text-current" />,
  },
};

export const WithIconSelected: Story = {
  args: {
    value: 'with-icon-selected',
    title: '이냉치냉! 속 시원한 요리',
    icon: <Snowflake className="w-8 h-8 text-current" />,
    selected: true,
  },
};

export const WithSubtitle: Story = {
  args: {
    value: 'with-subtitle',
    title: '후루룩 뚝딱!',
    subtitle: '(빠르게)',
    icon: <Timer className="w-8 h-8 text-current" />,
  },
};

export const WithSubtitleSelected: Story = {
  args: {
    value: 'with-subtitle-selected',
    title: '혼자만의 고독한 미식가',
    subtitle: '(혼자)',
    selected: true,
  },
};
