import { Meta, StoryObj } from '@storybook/react'
import Information from './Information'

export default {
  title: 'Components/Information',
  component: Information,
} as Meta<typeof Information>

type Story = StoryObj<typeof Information>

export const Default: Story = {
  args: {},
  argTypes: {
    onClick: { action: 'click' },
  },
}
