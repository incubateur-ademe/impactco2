import { NotionAPI } from 'notion-client'

export const getNotionContentProps = async (id: string) => {
  const notion = new NotionAPI()
  const recordMap = await notion.getPage(id)

  const revalidate = process.env.NOTION_CONTENT_REVALIDATE && Number.parseInt(process.env.NOTION_CONTENT_REVALIDATE)
  return {
    props: {
      recordMap,
    },
    revalidate: revalidate && !Number.isNaN(revalidate) ? revalidate : 1,
  }
}
