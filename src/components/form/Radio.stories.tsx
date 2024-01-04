import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { NotionCommandValidation } from 'utils/notion'
import Radio, { RadioProps } from './Radio'
import RadioInput from './RadioInput'

export default {
  title: 'Components/Radio',
  component: Radio,
} as Meta<typeof Radio>

type Story = StoryObj<typeof Radio>

const Template = ({ color, ...props }: RadioProps & { color?: 'secondary' }) => {
  const [value, setValue] = useState<string>('')
  return (
    <Radio {...props}>
      <RadioInput
        name='test'
        required
        label='Choix 1'
        value='Choix 1'
        selected={value}
        setSelected={setValue}
        color={color}
      />
      <RadioInput
        name='test'
        required
        label='Choix 2'
        value='Choix 2'
        selected={value}
        setSelected={setValue}
        color={color}
      />
    </Radio>
  )
}

const render = (props: RadioProps, color?: 'secondary') => <Template {...props} color={color} />

export const Default: Story = {
  render: () =>
    render({
      id: 'test',
      label: 'Label',
      hint: 'Description',
    }),
}

export const Required: Story = {
  render: () =>
    render({
      id: 'test',
      label: 'Label',
      required: true,
      hint: 'Description',
    }),
}

const body = NotionCommandValidation.safeParse({})
export const Error: Story = {
  render: () =>
    render({
      id: 'type',
      label: 'Label',
      required: true,
      hint: 'Description',
      errors: body.success ? null : body.error,
    }),
}
