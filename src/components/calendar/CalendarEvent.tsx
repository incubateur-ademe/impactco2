'use client'

import { createRoot } from 'react-dom/client'
import { CalendarEvent as CalendarEventType } from 'src/serverFunctions/calendarEvent'
import CopyNotionContent from '../Notion/CopyNotionContent'
import DynamicNotion from '../Notion/DynamicNotion'
import styles from '../Notion/Notion.module.css'

const transformUrl = (url?: string) => {
  if (url) {
    if (url.startsWith('https://file.notion.com')) {
      const [site] = url.split('?')
      const values = site.split('/')
      return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.fr-par.scw.cloud/attachment:${values[values.length - 2]}:${values[values.length - 1]}`
    } else if (url.startsWith('https://app.notion.com')) {
      const [site] = url.split('?')
      const values = site.split('/')
      return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.fr-par.scw.cloud/${values[values.length - 1]}`
    }
  }

  return url
}

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
          const links = ref.getElementsByClassName('notion-file-link')
          Array.from(links).forEach((link) => {
            const initialHref = link.getAttribute('href')
            if (!initialHref) {
              return
            }

            const href = transformUrl(initialHref)
            if (href) {
              link.setAttribute('href', href)
            }
          })
        }}
        recordMap={recordMap}
        mapImageUrl={transformUrl}
      />
    </div>
  )
}

export default CalendarEvent
