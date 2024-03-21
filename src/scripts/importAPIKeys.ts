import axios from 'axios'
import { prismaClient } from '../utils/prismaClient'

const importFromNotion = async () => {
  if (process.env.AUTO_IMPORT_API_KEY !== 'true') {
    return
  }

  const {
    data: { results },
  } = await axios.post<{
    results: {
      properties: {
        Clé: { title: ({ plain_text: string } | undefined)[] }
        Nom: { rich_text: ({ plain_text: string } | undefined)[] }
      }
    }[]
  }>(
    'https://api.notion.com/v1/databases/0590cbd6751c4814905717009b971774/query',
    {},
    {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      },
    }
  )
  const values = results
    .map((x) => ({
      key: x.properties.Clé.title[0]?.plain_text || '',
      owner: x.properties.Nom.rich_text[0]?.plain_text || '',
    }))
    .filter((x) => x.owner && x.key)

  await Promise.all(
    values.map((value) =>
      prismaClient.apiKey.update({
        data: { owner: value.owner },
        where: {
          id: value.key,
        },
      })
    )
  )
}

importFromNotion()
