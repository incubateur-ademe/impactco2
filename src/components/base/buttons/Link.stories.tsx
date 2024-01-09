import { Meta, StoryObj } from '@storybook/react'
import Link from './Link'

export default {
  title: 'Components/Link',
  component: Link,
} as Meta<typeof Link>

type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {
    children: 'Follow me',
    href: '/',
  },
}

export const Secondary: Story = {
  args: {
    children: 'em wolloF',
    href: '/',
    priority: 'secondary',
  },
}

export const External: Story = {
  args: {
    children: 'Follow me somewhere else',
    href: '#',
  },
}

export const Button: Story = {
  args: {
    children: 'Click me',
    href: '#',
    asButton: true,
  },
}

export const SmallButton: Story = {
  args: {
    children: 'Quietly click me',
    href: '#',
    asButton: true,
    size: 'sm',
  },
}

export const LargeButton: Story = {
  args: {
    children: 'Hard click me',
    href: '#',
    asButton: true,
    size: 'lg',
  },
}
