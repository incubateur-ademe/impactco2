import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { NotionCommandValidation } from 'utils/notion'
import Stars, { StarsProps } from './Stars'

export default {
  title: 'Components/Stars',
  component: Stars,
} as Meta<typeof Stars>

type Story = StoryObj<typeof Stars>

const Template = (props: Omit<StarsProps, 'value' | 'setValue'>) => {
  const [value, setValue] = useState<number>()
  return <Stars {...props} value={value} setValue={setValue} />
}

const render = (props: Omit<StarsProps, 'value' | 'setValue'>) => <Template {...props} />

export const Default: Story = {
  render: () =>
    render({
      id: 'stars',
      label: 'Label',
      hint: 'Description',
    }),
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
