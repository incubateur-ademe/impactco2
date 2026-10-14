'use server'

import { prismaClient } from '../utils/prismaClient'

export const getCalendarEvents = async () => {
  try {
    const events = await prismaClient.calendarEvent.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        startDate: true,
        endDate: true,
        content: true,
      },
      orderBy: { startDate: 'desc' },
    })
    const allEvents = events.map((event) => ({ ...event, hasContent: !!event.content, content: undefined }))
    const now = new Date()
    const upcoming: typeof allEvents = []
    const past: typeof allEvents = []

    allEvents.forEach((event) => {
      const date = event.endDate ? new Date(event.endDate) : new Date(event.startDate)

      const dateUTC = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999))
      if (now <= dateUTC) {
        upcoming.push(event)
      } else {
        past.push(event)
      }
    })

    return { upcoming: upcoming.sort((a, b) => a.startDate.getTime() - b.startDate.getTime()), past }
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return { upcoming: [], past: [] }
  }
}

export type CalendarEvents = Awaited<ReturnType<typeof getCalendarEvents>>['upcoming']

export const getCalendarEventById = async (id: string) =>
  prismaClient.calendarEvent.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      image: true,
      description: true,
      metaImage: true,
      startDate: true,
      endDate: true,
      content: true,
    },
  })
export type CalendarEvent = NonNullable<Awaited<ReturnType<typeof getCalendarEventById>>>
