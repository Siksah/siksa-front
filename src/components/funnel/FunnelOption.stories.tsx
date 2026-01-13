import type { Meta, StoryObj } from '@storybook/react';
import { FunnelOption } from './FunnelOption';

const meta = {
  title: 'Funnel/FunnelOption',
  component: FunnelOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: 'boolean',
    },
    className: {
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

const mockOption = {
  id: 'mock',
  label: '옵션 제목',
  value: 'mock',
};

export const Default: Story = {
  args: {
    option: mockOption,
    isSelected: false,
    onSelect: () => {},
  },
};

export const Selected: Story = {
  args: {
    option: { ...mockOption, label: '선택된 옵션' },
    isSelected: true,
    onSelect: () => {},
  },
};

export const WithIcon: Story = {
  args: {
    option: { 
        ...mockOption, 
        label: '아이콘 포함', 
        icon: 'snowflake' // Mock string icon, implementation might render lucide based on string
    },
    isSelected: false,
    onSelect: () => {},
  },
};

export const WithSubtitle: Story = {
  args: {
    option: { 
        ...mockOption, 
        label: '부제목 포함',
        subLabel: '(부제목)'
    },
    isSelected: false,
    onSelect: () => {},
  },
};
