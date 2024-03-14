import { Meta, StoryObj } from '@storybook/react'
import Comparateur from './Comparateur'

export default {
  title: 'Meta/Comparateur',
  component: Comparateur,
} as Meta<typeof Comparateur>

type Story = StoryObj<typeof Comparateur>

export const OneItem: Story = {
  args: {
    value: 100,
    comparisons: ['ananas'],
  },
}
