import { Meta, StoryObj } from '@storybook/react'
import Equivalent from './Equivalent'

export default {
  title: 'Shopify/Etiquette',
  component: Equivalent,
} as Meta<typeof Equivalent>

type Story = StoryObj<typeof Equivalent>

export const Default: Story = {
  args: {
    baseValue: '1000',
    comparisons: ['random'],
  },
}
