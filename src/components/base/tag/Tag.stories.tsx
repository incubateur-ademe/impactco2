import { Meta, StoryObj } from '@storybook/react'
import Tag from './Tag'

export default {
  title: 'Components/Tag',
  component: Tag,
} as Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

export const Nouveau: Story = {
  args: {
    text: 'Nouveau',
  },
}
