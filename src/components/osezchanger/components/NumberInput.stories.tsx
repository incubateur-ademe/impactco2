import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import NumberInput from './NumberInput'

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
} as Meta<typeof NumberInput>

type Story = StoryObj<typeof NumberInput>

const Template = () => {
  const [value, setValue] = useState<number | undefined>()
  return <NumberInput id='nop' value={value} setValue={setValue} tracking='nop' />
}

const render = () => <Template />

export const Default: Story = { render }
