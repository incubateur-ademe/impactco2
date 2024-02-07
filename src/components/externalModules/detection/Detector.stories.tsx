import { Meta, StoryObj } from '@storybook/react'
import Detector from './Detector'

export default {
  title: 'Script/Detector',
  component: Detector,
} as Meta<typeof Detector>

type Story = StoryObj<typeof Detector>

export const Default: Story = {
  args: {
    impact: '486 kg co2e',
  },
}
