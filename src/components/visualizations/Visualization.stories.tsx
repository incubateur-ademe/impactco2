import { Meta, StoryObj } from '@storybook/react'
import Visualization from './Visualization'

export default {
  title: 'Components/Visualization',
  component: Visualization,
} as Meta<typeof Visualization>

type Story = StoryObj<typeof Visualization>

export const Eau: Story = {
  args: {
    types: ['eauenbouteille', 'eaudurobinet'],
  },
  render: (args) => <Visualization {...args} />,
}
