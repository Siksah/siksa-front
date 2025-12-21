import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'navy',
        'orange-text',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'default',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'default',
    size: 'sm',
  },
};

export const Active: Story = {
  args: {
    children: 'Active Button',
    variant: 'default',
    size: 'lg',
    className: 'bg-orange-40 hover:bg-orange-40',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'lg',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'lg',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
    size: 'lg',
  },
};

export const Navy: Story = {
  args: {
    children: 'Navy Button',
    variant: 'navy',
    size: 'lg',
  },
};

export const OrangeText: Story = {
  args: {
    children: 'Orange Text Button',
    variant: 'orange-text',
    size: 'lg',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'lg',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'default',
    size: 'lg',
    disabled: true,
  },
};
