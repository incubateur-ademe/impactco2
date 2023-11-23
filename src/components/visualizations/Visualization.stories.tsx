import { Meta, StoryObj } from '@storybook/react'
import { DataProvider } from 'components/providers/DataProvider'
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
  render: (args) => (
    <DataProvider>
      <Visualization {...args} />
    </DataProvider>
  ),
}
