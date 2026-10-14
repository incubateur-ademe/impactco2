'use client'

import { createRoot } from 'react-dom/client'
import { CalendarEvent as CalendarEventType } from 'src/serverFunctions/calendarEvent'
import CopyNotionContent from '../Notion/CopyNotionContent'
import DynamicNotion from '../Notion/DynamicNotion'
import styles from '../Notion/Notion.module.css'

const CalendarEvent = ({ event }: { event: CalendarEventType }) => {
  const recordMap = JSON.parse(event.content)
  return (
    <div className={styles.container}>
      <DynamicNotion
        extraHTML={(ref) => {
          const elements = ref.getElementsByClassName('notion-purple_background_co')
          Array.from(elements).forEach((element) => {
            if (element.hasAttribute('data-copy-rendered')) {
              return
            }
            element.setAttribute('data-copy-rendered', 'true')
            const container = document.createElement('div')
            element.appendChild(container)
            const root = createRoot(container)
            root.render(<CopyNotionContent content={element.innerHTML || ''} />)
          })
        }}
        recordMap={recordMap}
        mapImageUrl={(url?: string) => {
          if (url && (url.startsWith('https://file.notion.com') || url.startsWith('https://app.notion.com'))) {
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
