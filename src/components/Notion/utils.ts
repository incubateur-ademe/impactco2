import { NotionAPI } from 'notion-client'

export const getNotionContentProps = async (id: string) => {
  const notion = new NotionAPI()
  return notion.getPage(id)
}
export const getNotionRevalidate = () => {
  const revalidate = process.env.NOTION_CONTENT_REVALIDATE && Number.parseInt(process.env.NOTION_CONTENT_REVALIDATE)
  return revalidate && !Number.isNaN(revalidate) ? revalidate : 1
}
