import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { FunnelStep } from './FunnelStep';
import { funnelStepsById } from '@/data/funnelData';

const meta = {
  title: 'Funnel/FunnelStep',
  component: FunnelStep,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: '390px', height: '844px', margin: '0 auto' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof FunnelStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PartySize: Story = {
  args: {
    data: funnelStepsById['party-size'],
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const PartySizeWithSelection: Story = {
  args: {
    data: funnelStepsById['party-size'],
    selectedValue: 'solo',
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const Taste: Story = {
  args: {
    data: funnelStepsById['taste'],
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const TasteWithSelection: Story = {
  args: {
    data: funnelStepsById['taste'],
    selectedValue: 'hearty',
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const Texture: Story = {
  args: {
    data: funnelStepsById['texture'],
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const Temperature: Story = {
  args: {
    data: funnelStepsById['temperature'],
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const avoid: Story = {
  args: {
    data: funnelStepsById['avoid'],
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const Atmosphere: Story = {
  args: {
    data: funnelStepsById['aftermeal'],
    onSelect: (value) => console.log('Selected:', value),
  },
};
