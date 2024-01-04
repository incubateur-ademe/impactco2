import { Meta, StoryObj } from '@storybook/react'
import { NotionCommandValidation } from 'utils/notion'
import Input from './Input'

export default {
  title: 'Components/Input',
  component: Input,
} as Meta<typeof Input>

type Story = StoryObj<typeof Input>

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
