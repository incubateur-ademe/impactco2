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
      },
      orderBy: { startDate: 'desc' },
    })

    const now = new Date()
    const upcoming: typeof events = []
    const past: typeof events = []

    events.forEach((event) => {
      const startDate = new Date(event.startDate)

      const startDateUTC = new Date(
        Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), 23, 59, 59, 999)
      )
      if (now <= startDateUTC) {
        upcoming.push(event)
      } else {
        past.push(event)
      }
    })

    return { upcoming, past }
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
      startDate: true,
      endDate: true,
      content: true,
    },
  })
export type CalendarEvent = NonNullable<Awaited<ReturnType<typeof getCalendarEventById>>>
