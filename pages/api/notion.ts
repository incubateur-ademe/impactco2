import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { trackAPIRequest } from 'utils/middleware'
import { NotionCommandValidation } from 'utils/notion'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only post queries are allowed.')
  }

  const inputs = NotionCommandValidation.safeParse(req.body)
  if (!inputs.success) {
    res.status(400).json(inputs.error)
    return
  }

  await trackAPIRequest(req, 'notion', JSON.stringify(inputs.data))
  try {
    await axios.post(
      'https://api.notion.com/v1/pages',
      {
        parent: {
          type: 'database_id',
          database_id: process.env.NOTION_API_DB_CONTACTS,
        },
        properties: {
          Email: {
            type: 'title',
            title: [{ type: 'text', text: { content: inputs.data.email } }],
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
    return res.status(201).send('Success')
  } catch (e) {
    console.error(e)
    return res.status(500).send('Something went wrong...')
  }
}
