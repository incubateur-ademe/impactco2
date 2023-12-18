import { Meta, StoryObj } from '@storybook/react'
import GhostButton from './GhostButton'

export default {
  title: 'Components/GhostButton',
  component: GhostButton,
} as Meta<typeof GhostButton>

type Story = StoryObj<typeof GhostButton>

export const Default: Story = {
  args: {
    icon: 'send-plane',
    children: 'Partager',
  },
}
export const Disabled: Story = {
  args: {
    icon: 'send-plane',
    children: 'Partager',
    disabled: true,
  },
}
