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
