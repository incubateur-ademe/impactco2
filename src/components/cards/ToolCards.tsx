import ToolCard, { ToolCardProps } from './ToolCard'
import styles from './ToolCards.module.css'

const ToolCards = ({ tools }: { tools: (ToolCardProps | undefined)[] }) => {
  return (
    <ul className={styles.container}>
      {tools
        .filter((tool) => tool !== undefined)
        .map((tool) => (
          <ToolCard
            key={tool.slug}
            slug={tool.slug}
            title={tool.title}
            description={tool.description}
            linkLabel={tool.linkLabel}
            image={tool.image}
            link={tool.link}
          />
        ))}
    </ul>
  )
}

export default ToolCards
