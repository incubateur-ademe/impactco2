'use server'

import axios from 'axios'
import Crisp from 'crisp-api'
import { NotionCommand, NotionCommandValidation } from 'utils/notion'

const saveCrisp = async (feedback: NotionCommand) => {
  const websiteId = process.env.CRISP_WEBSITE_ID
  const id = process.env.CRISP_IDENTIFIER
  const key = process.env.CRISP_KEY
  if (!websiteId || !id || !key) {
    return false
  }

  try {
    const crisp = new Crisp()
    crisp.authenticateTier('plugin', id, key)

    const conversation = await crisp.website.createNewConversation(websiteId)
    await crisp.website.updateConversationMetas(websiteId, conversation.session_id, {
      email: feedback.email,
      segments: [feedback.type, feedback.structure, feedback.suggestionType],
    })
    await crisp.website.sendMessageInConversation(websiteId, conversation.session_id, {
      type: 'text',
      from: 'user',
      origin: 'urn:xavier.desoindre:impact-co2:0',
      content: feedback.text,
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const saveNotion = async (feedback: NotionCommand) => {
  const dbId = process.env.NOTION_API_DB_SUGGESTIONS
  if (!dbId) {
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
          Email: {
            type: 'title',
            title: [{ type: 'text', text: { content: feedback.email } }],
          },
          Structure: {
            type: 'select',
            select: { name: feedback.structure },
          },
          Demande: {
            type: 'select',
            select: { name: feedback.suggestionType },
          },
          Description: {
            type: 'rich_text',
            rich_text: [{ text: { content: feedback.text } }],
          },
          Origine: {
            type: 'rich_text',
            rich_text: [{ text: { content: feedback.from } }],
          },
          'Origine du retour': {
            type: 'select',
            select: { name: feedback.type },
          },
          Accepté: {
            type: 'checkbox',
            checkbox: feedback.accepted,
          },
          Newsletter: {
            type: 'checkbox',
            checkbox: feedback.newsletter,
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
    console.error(error)
    return false
  }
}

export const saveFeedback = async (data: NotionCommand) => {
  const feedback = NotionCommandValidation.safeParse(data)
  if (!feedback.success) {
    return false
  }
  const [crisp, notion] = await Promise.all([saveCrisp(feedback.data), saveNotion(feedback.data)])
  return crisp && notion
}
