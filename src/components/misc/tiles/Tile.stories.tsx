import { Meta, StoryObj } from '@storybook/react'
import boissons from '../../../data/categories/boisson.json'
import Tile from './Tile'

export default {
  title: 'Components/Tile',
  component: Tile,
} as Meta<typeof Tile>

type Story = StoryObj<typeof Tile>

export const Eau: Story = {
  args: {
    equivalent: boissons.find((boisson) => boisson.slug === 'eauenbouteille'),
    weight: 1000,
  },
  argTypes: {
    removeEquivalent: { action: 'removed' },
  },
}
