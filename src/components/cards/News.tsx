import { useMemo } from 'react'
import Block from 'components/layout/Block'
import ToolCard, { ToolCardProps } from './ToolCard'
import styles from './ToolCards.module.css'

const News = ({ tools }: { tools: ToolCardProps[] }) => {
  const newsTools = useMemo(() => {
    const news = process.env.NEXT_PUBLIC_NEWS
    if (news) {
      const newTools = JSON.parse(news)
      const now = new Date().getTime()
      return tools.filter((tool) => {
        const limit = newTools[tool.slug]
        if (limit) {
          const limitTime = new Date(limit).getTime()
          return now < limitTime
        }
        return false
      })
    }
    return []
  }, [tools])

  return newsTools.length > 0 ? (
    <Block>
      <ul className={styles.newsContainer}>
        {newsTools.map((tool) => (
          <ToolCard
            key={tool.slug}
            slug={tool.slug}
            title={tool.title}
            description={tool.description}
            linkLabel={tool.linkLabel}
            image={tool.image}
            link={tool.link}
            horizontal
          />
        ))}
      </ul>
    </Block>
  ) : null
}

export default News
