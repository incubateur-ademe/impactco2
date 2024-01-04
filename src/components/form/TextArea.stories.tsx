import { Meta, StoryObj } from '@storybook/react'
import { NotionCommandValidation } from 'utils/notion'
import TextArea from './TextArea'

export default {
  title: 'Components/TextArea',
  component: TextArea,
} as Meta<typeof TextArea>

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    label: 'Label',
    hint: 'Description',
  },
}

export const Required: Story = {
  args: {
    label: 'Label',
    required: true,
    hint: 'Description',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Label',
    hint: 'Description',
    color: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    hint: 'Description',
    disabled: true,
  },
}

const body = NotionCommandValidation.safeParse({})
export const Error: Story = {
  args: {
    id: 'type',
    label: 'Label',
    hint: 'Description',
    errors: body.success ? null : body.error,
  },
}
