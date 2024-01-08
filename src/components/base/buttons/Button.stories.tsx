import { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
} as Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Click me',
  },
}

export const Small: Story = {
  args: {
    children: 'Quietly click me',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Hard click me',
    size: 'lg',
  },
}

export const Secondary: Story = {
  args: {
    children: 'em kcilC',
    priority: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Dont click me',
    disabled: true,
  },
}

export const LinkButton: Story = {
  args: {
    children: 'Follow me',
    asLink: true,
  },
}
