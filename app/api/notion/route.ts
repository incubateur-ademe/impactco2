import * as Sentry from '@sentry/nextjs'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { trackAPIRequest } from 'utils/middleware'
import { NotionCommandValidation } from 'utils/notion'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const inputs = NotionCommandValidation.safeParse(body)
  if (!inputs.success) {
    return NextResponse.json(inputs.error, { status: 400 })
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
              Accepté: {
                type: 'checkbox',
                checkbox: inputs.data.accepted,
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
    return NextResponse.json('Success', { status: 201 })
  } catch (e) {
    console.error(e)
    await Sentry.captureException(e)
    return NextResponse.json('Something went wrong...', { status: 501 })
  }
}
