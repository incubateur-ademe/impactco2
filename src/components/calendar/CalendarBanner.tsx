import Image from 'next/image'
import { CalendarEvent } from 'src/serverFunctions/calendarEvent'
import { formatCalendarDates } from 'src/utils/dates'
import styles from './CalendarBanner.module.css'

const CalendarBanner = ({ event }: { event: CalendarEvent }) => {
  return (
    <div className={styles.container}>
      <Image
        width={800}
        height={600}
        src={`https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.fr-par.scw.cloud/${event.image}.png`}
        alt=''
        className={styles.image}
      />
      <h1 className={styles.title}>{event.title}</h1>
      <p className={styles.description}>
        {formatCalendarDates(new Date(event.startDate), event.endDate ? new Date(event.endDate) : null)}
      </p>
    </div>
  )
}

export default CalendarBanner
