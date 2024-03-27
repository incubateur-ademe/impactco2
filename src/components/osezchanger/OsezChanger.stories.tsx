import { Meta, StoryObj } from '@storybook/react'
import OsezChanger from './OsezChanger'

export default {
  title: 'Components/OsezChanger',
  component: OsezChanger,
} as Meta<typeof OsezChanger>

type Story = StoryObj<typeof OsezChanger>

export const Default: Story = {
  render: () => <OsezChanger />,
}
export const IFrame: Story = {
  render: () => <OsezChanger iframe />,
}
