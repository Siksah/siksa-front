import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'title-lg',
        'title-sm',
        'text-lg',
        'text-md',
        'text-sm',
        'caption',
      ],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleLarge: Story = {
  args: {
    variant: 'title-lg',
    children: 'Title Large (55px)',
  },
};

export const TitleSmall: Story = {
  args: {
    variant: 'title-sm',
    children: 'Title Small (32px)',
  },
};

export const TextLarge: Story = {
  args: {
    variant: 'text-lg',
    children: 'Text Large (30px)',
  },
};

export const TextMedium: Story = {
  args: {
    variant: 'text-md',
    children: 'Text Medium (26px)',
  },
};

export const TextSmall: Story = {
  args: {
    variant: 'text-sm',
    children: 'Text Small (22px)',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption (20px)',
  },
};

export const AllVariants: Story = {
  args: {
    children: '',
  },
  render: () => (
    <div className="space-y-8">
      <Typography variant="title-lg">Title Large - 55px</Typography>
      <Typography variant="title-sm">Title Small - 32px</Typography>
      <Typography variant="text-lg">Text Large - 30px</Typography>
      <Typography variant="text-md">Text Medium - 26px</Typography>
      <Typography variant="text-sm">Text Small - 22px</Typography>
      <Typography variant="caption">Caption - 20px</Typography>
    </div>
  ),
};
