import ToolCard, { ToolCardProps } from './ToolCard'
import styles from './ToolCards.module.css'

const ToolCards = ({ tools }: { tools: (ToolCardProps | undefined)[] }) => {
  return (
    <ul className={styles.container}>
      {tools
        .filter((tool) => tool !== undefined)
        .map((tool) => (
          <ToolCard key={tool.slug} {...tool} />
        ))}
    </ul>
  )
}

export default ToolCards
