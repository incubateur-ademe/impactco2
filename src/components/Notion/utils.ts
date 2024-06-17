import { NotionAPI } from 'notion-client'
import { getRevalidate } from 'utils/revalidate'

export const getNotionContentProps = async (id: string) => {
  const notion = new NotionAPI()
  return notion.getPage(id)
}

export const getNotionRevalidate = () => getRevalidate(process.env.NOTION_CONTENT_REVALIDATE)
