import React from 'react'
import ToolCard, { ToolCardProps } from './ToolCard'
import styles from './ToolCards.module.css'

const ToolCards = ({ tools }: { tools: ToolCardProps[] }) => {
  return (
    <div className={styles.container}>
      {tools.map((tool) => (
        <ToolCard
          key={tool.slug}
          slug={tool.slug}
          title={tool.title}
          description={tool.description}
          linkLabel={tool.linkLabel}
          image={tool.image}
        />
      ))}
    </div>
  )
}

export default ToolCards
