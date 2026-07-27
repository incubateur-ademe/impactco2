'use server'

import axios from 'axios'
import { z } from 'zod'

const AddNpsNoteValidation = z.object({
  note: z.number({ message: 'La note est requise' }).min(0).max(10),
  source: z.string({ message: 'La source est requise' }),
  tracking: z.string({ message: 'Le tracking est requis' }),
  params: z.string().optional(),
})

const UpdateNpsRetourValidation = z.object({
  id: z.string({ message: "L'id est requis" }).min(1),
  text: z.string({ message: 'Le retour est requis' }).min(1),
})

const AddLearnedValidation = z.object({
  choice: z.boolean({ message: 'La réponse est requise' }),
  source: z.string({ message: 'La source est requise' }),
  tracking: z.string({ message: 'Le tracking est requis' }),
  params: z.string().optional(),
})

const AddLearnedChoiceValidation = z.object({
  id: z.string({ message: "L'id est requis" }).min(1),
  choices: z.array(
    z.enum([
      'Étonnement',
      'Impact CO₂ découvert',
      'Idées d’actions',
      'Compréhension des ODG',
      'Connaissance existante',
      'Manque de clarté',
      'Echec de recherche',
      'Désintérêt',
    ]),
    {
      message: 'Le retour est requis',
    }
  ),
})

export const addNpsNote = async ({
  note,
  source,
  tracking,
  params,
}: {
  note: number
  source: string
  tracking: string
  params?: string
}) => {
  const dbId = process.env.NOTION_API_DB_NPS
  const parsed = AddNpsNoteValidation.safeParse({ note, source, tracking, params })

  if (!parsed.success) {
    return null
  }

  if (!dbId || !process.env.NOTION_API_KEY) {
    console.log('Fake NPS note creation', { note, source, tracking, params })
    return null
  }

  try {
    const response = await axios.post<{ id: string }>(
      'https://api.notion.com/v1/pages',
      {
        parent: {
          type: 'database_id',
          database_id: dbId,
        },
        properties: {
          Note: {
            type: 'number',
            number: parsed.data.note,
          },
          Source: {
            type: 'rich_text',
            rich_text: [{ type: 'text', text: { content: parsed.data.source } }],
          },
          Simulateur: {
            type: 'rich_text',
            rich_text: [{ type: 'text', text: { content: parsed.data.tracking } }],
          },
          Parametre: {
            type: 'rich_text',
            rich_text: [{ type: 'text', text: { content: parsed.data.params || '' } }],
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

    return response.data.id
  } catch (error) {
    console.error('Unable to create NPS page in Notion', error)
    return null
  }
}

export const updateNpsRetour = async (id: string, text: string) => {
  const parsed = UpdateNpsRetourValidation.safeParse({ id, text })

  if (!parsed.success) {
    return false
  }

  if (!id || !process.env.NOTION_API_KEY) {
    console.log('Fake NPS retour update', { id, text })
    return false
  }

  try {
    await axios.patch(
      `https://api.notion.com/v1/pages/${parsed.data.id}`,
      {
        properties: {
          Retour: {
            type: 'rich_text',
            rich_text: [{ type: 'text', text: { content: parsed.data.text } }],
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
  } catch (error) {
    console.error('Unable to update NPS retour in Notion', error)
    return false
  }
}

export const addLearned = async ({
  choice,
  source,
  tracking,
  params,
}: {
  choice: boolean
  source: string
  tracking: string
  params?: string
}) => {
  const dbId = process.env.NOTION_API_DB_LEARNED
  const parsed = AddLearnedValidation.safeParse({
    choice,
    source,
    tracking,
    params,
  })

  if (!parsed.success) {
    return null
  }

  if (!dbId || !process.env.NOTION_API_KEY) {
    console.log('Fake learned creation', { choice, source, tracking, params })
    return 'random id'
  }

  try {
    const response = await axios.post<{ id: string }>(
      'https://api.notion.com/v1/pages',
      {
        parent: {
          type: 'database_id',
          database_id: dbId,
        },
        properties: {
          Apprentissage: {
            type: 'rich_text',
            rich_text: [{ type: 'text', text: { content: parsed.data.choice ? 'Oui' : 'Non' } }],
          },
          Source: {
            type: 'rich_text',
            rich_text: [{ type: 'text', text: { content: parsed.data.source } }],
          },
          Simulateur: {
            type: 'rich_text',
            rich_text: [{ type: 'text', text: { content: parsed.data.tracking } }],
          },
          Parametre: {
            type: 'rich_text',
            rich_text: [{ type: 'text', text: { content: parsed.data.params || '' } }],
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

    return response.data.id
  } catch (error) {
    console.error('Unable to create learned page in Notion', error)
    return null
  }
}

export const updateLearnedChoice = async (params: { choices: string[]; id: string }) => {
  const dbId = process.env.NOTION_API_DB_LEARNED
  const parsed = AddLearnedChoiceValidation.safeParse(params)

  if (!parsed.success) {
    return null
  }

  if (!dbId || !process.env.NOTION_API_KEY) {
    console.log('Fake learned choice update', params)
    return true
  }

  try {
    await axios.patch(
      `https://api.notion.com/v1/pages/${parsed.data.id}`,
      {
        properties: {
          'Choix qualifié': {
            type: 'multi_select',
            multi_select: parsed.data.choices.map((choice) => ({ name: choice })),
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
  } catch (error) {
    console.error('Unable to update learned page in Notion', error)
    return null
  }
}
