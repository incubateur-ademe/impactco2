'use client'

import { CalendarEvent as CalendarEventType } from 'src/serverFunctions/calendarEvent'
import DynamicNotion from '../Notion/DynamicNotion'
import styles from '../Notion/Notion.module.css'

const CalendarEvent = ({ event }: { event: CalendarEventType }) => {
  const recordMap = JSON.parse(event.content)
  return (
    <div className={styles.container}>
      <DynamicNotion
        recordMap={recordMap}
        mapImageUrl={(url?: string) => {
          if (url && url.startsWith('https://file.notion.com')) {
            const params = new URL(url).searchParams
            const id = params.get('id')
            return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.fr-par.scw.cloud/${id}.png`
          }
          return url
        }}
      />
    </div>
  )
}

export default CalendarEvent
