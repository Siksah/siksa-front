import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { FunnelStep } from './FunnelStep';
import { funnelData } from '@/data/funnelData';

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

// Get steps by ID helper for story
const getStep = (id: number) => funnelData.steps.find(s => s.id === id)!;

export const Q1_PartySize: Story = {
  args: {
    step: getStep(1),
    currentStepIndex: 0,
    totalSteps: 6,
    onSelectOption: (option) => console.log('Selected:', option),
  },
};

export const Q1_PartySize_Selected: Story = {
  args: {
    step: getStep(1),
    currentStepIndex: 0,
    totalSteps: 6,
    selectedOptionId: '1-1',
    onSelectOption: (option) => console.log('Selected:', option),
  },
};

export const Q2_Need: Story = {
  args: {
    step: getStep(2),
    currentStepIndex: 1,
    totalSteps: 6,
    onSelectOption: (option) => console.log('Selected:', option),
  },
};

export const Q3_Texture: Story = {
  args: {
    step: getStep(3),
    currentStepIndex: 2,
    totalSteps: 6,
    onSelectOption: (option) => console.log('Selected:', option),
  },
};

export const Q4_Temperature: Story = {
  args: {
    step: getStep(4),
    currentStepIndex: 3,
    totalSteps: 6,
    onSelectOption: (option) => console.log('Selected:', option),
  },
};

export const Q5_Dislike: Story = {
  args: {
    step: getStep(5),
    currentStepIndex: 4,
    totalSteps: 6,
    onSelectOption: (option) => console.log('Selected:', option),
  },
};

<<<<<<< HEAD
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
=======
export const Q6_Routine: Story = {
  args: {
    step: getStep(6),
    currentStepIndex: 5,
    totalSteps: 6,
    onSelectOption: (option) => console.log('Selected:', option),
>>>>>>> origin/main
  },
};
