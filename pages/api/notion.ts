import * as Sentry from '@sentry/nextjs'
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
      inputs.data.type === 'contact'
        ? {
            parent: {
              type: 'database_id',
              database_id: process.env.NOTION_API_DB_CONTACTS,
            },
            properties: {
              Email: {
                type: 'title',
                title: [{ type: 'text', text: { content: inputs.data.email } }],
              },
              Besoins: {
                type: 'rich_text',
                rich_text: [{ text: { content: inputs.data.needs || 'Non renseigné' } }],
              },
              Structure: {
                type: 'rich_text',
                rich_text: [
                  {
                    text: { content: `${inputs.data.structure}${inputs.data.other ? ` - ${inputs.data.other}` : ''}` },
                  },
                ],
              },
              Origine: {
                type: 'rich_text',
                rich_text: [{ text: { content: inputs.data.from } }],
              },
            },
          }
        : {
            parent: {
              type: 'database_id',
              database_id: process.env.NOTION_API_DB_SUGGESTIONS,
            },
            properties: {
              Type: {
                type: 'title',
                title: [{ type: 'text', text: { content: inputs.data.suggestionType } }],
              },
              Description: {
                type: 'rich_text',
                rich_text: [{ text: { content: inputs.data.text } }],
              },
              Email: {
                type: 'rich_text',
                rich_text: [{ text: { content: inputs.data.email } }],
              },
              Origine: {
                type: 'rich_text',
                rich_text: [{ text: { content: inputs.data.from } }],
              },
              Avis: {
                type: 'number',
                number: inputs.data.suggestionType === 'avis' ? inputs.data.avis : null,
              },
              'Origine du retour': {
                type: 'select',
                select: { name: 'Retour formulaire' },
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
    await Sentry.captureException(e)
    return res.status(500).send('Something went wrong...')
  }
}
