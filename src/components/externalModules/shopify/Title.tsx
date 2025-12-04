import { HtmlSanitizer } from '../sanitizer'
import styles from './Title.module.css'

const Title = ({
  introduction,
  roundedValue,
  unit,
  intValue,
}: {
  introduction?: string
  roundedValue: number
  unit: string
  intValue: number
}) => {
  return (
    <p className={styles.title}>
      {introduction ? (
        <div
          dangerouslySetInnerHTML={{
            __html: HtmlSanitizer.SanitizeHtml(introduction).replace(intValue, `<b>${roundedValue} ${unit} CO₂e</b>`),
          }}
        />
      ) : (
        <>
          La production de cet article émet{' '}
          <b>
            {roundedValue.toLocaleString()} {unit} CO₂e
          </b>
        </>
      )}
    </p>
  )
}

export default Title
