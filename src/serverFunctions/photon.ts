'use server'

import axios from 'axios'

const limit = 5000

export const savePhotonTime = async ({ search, time }: { search: string; time: number }) => {
  const dbId = process.env.NOTION_API_DB_PHOTON
  if (!dbId || time < limit) {
    return false
  }

  try {
    await axios.post(
      'https://api.notion.com/v1/pages',
      {
        parent: {
          type: 'database_id',
          database_id: dbId,
        },
        properties: {
          Search: {
            type: 'title',
            title: [{ type: 'text', text: { content: search } }],
          },
          Time: {
            type: 'number',
            number: time,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
      }
    )
    return true
  } catch {
    return false
  }
}
