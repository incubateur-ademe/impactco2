import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

type Periodicity = 'day' | 'week' | 'month' | 'year'
type Stats = {
  value: number
  date: Date
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const periodicity = (searchParams.get('periodicity') || 'month') as Periodicity
  const since = searchParams.get('since') ? Number.parseInt(searchParams.get('since') as string) : Number.MAX_VALUE

  const today = new Date()
  const minDate = new Date('2024-03-15')

  const stats: Stats[] = []

  for (var i = 0; i < since; i++) {
    if (today < minDate) {
      break
    }
    let date = today.toISOString().split('T')[0]
    const [allVisits, allEventsByCategory] = await Promise.all([
      await axios
        .post<
          { label: string; nb_visits: number }[]
        >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Actions.getPageUrls&format=JSON&module=API&period=${periodicity}&date=${date}&showColumns=nb_visits&filter_limit=-1`)
        .then((response) => response.data),
      await axios
        .post<
          { label: string; nb_visits: number; nb_events: number }[]
        >(`${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}?idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&method=Events.getCategory&format=JSON&module=API&period=${periodicity}&date=${date}&showColumns=nb_visits,nb_events&filter_limit=-1`)
        .then((response) => response.data),
    ])

    const iframes = allEventsByCategory.filter((event) => event.label.startsWith('IFrame_'))
    stats.push({
      value:
        allVisits
          .filter((visit) => visit.label !== 'iframes')
          .reduce((acc, visit) => acc + Number(visit.nb_visits), 0) +
        iframes.reduce((acc, visit) => acc + Number(visit.nb_visits), 0),
      date: new Date(today),
    })

    switch (periodicity) {
      case 'day':
        today.setDate(today.getDate() - 1)
        break
      case 'week':
        today.setDate(today.getDate() - 7)
        break
      case 'month':
        today.setMonth(today.getMonth() - 1)
        break
      case 'year':
        today.setFullYear(today.getFullYear() - 1)
        break
    }
  }

  const response = NextResponse.json({ description: 'Nombre de visites (IFrame  + site)', stats })
  response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400')

  return response
}
