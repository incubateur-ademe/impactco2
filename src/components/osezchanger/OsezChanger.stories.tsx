import { Meta, StoryObj } from '@storybook/react'
import { DataProvider } from 'components/providers/DataProvider'
import OsezChanger from './OsezChanger'

export default {
  title: 'Components/OsezChanger',
  component: OsezChanger,
} as Meta<typeof OsezChanger>

type Story = StoryObj<typeof OsezChanger>

export const Default: Story = {
  render: () => (
    <DataProvider>
      <OsezChanger />
    </DataProvider>
  ),
}
export const IFrame: Story = {
  render: () => (
    <DataProvider>
      <OsezChanger iframe />
    </DataProvider>
  ),
}
