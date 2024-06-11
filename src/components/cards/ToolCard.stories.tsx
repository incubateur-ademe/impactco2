import { Meta, StoryObj } from '@storybook/react'
import ToolCard from './ToolCard'

export default {
  title: 'Components/ToolCard',
  component: ToolCard,
} as Meta<typeof ToolCard>

type Story = StoryObj<typeof ToolCard>

export const Basique: Story = {
  args: {
    title: 'Comparateur',
    slug: 'comparateur',
    description: 'Le bon outil pour obtenir les bons ordres de grandeur',
    linkLabel: 'Visualiser',
  },
}

export const Horizontal: Story = {
  args: {
    horizontal: true,
    title: 'Comparateur',
    slug: 'comparateur',
    description: 'Le bon outil pour obtenir les bons ordres de grandeur',
    linkLabel: 'Visualiser',
  },
}
