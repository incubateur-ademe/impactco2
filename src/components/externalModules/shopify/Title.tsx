import React from 'react'
import { HtmlSanitizer } from '../sanitizer'
import styles from './Title.module.css'

const Title = ({
  introduction,
  roundedValue,
  unit,
  intValue,
}: {
  introduction?: string
  roundedValue: string
  unit: string
  intValue: number
}) => {
  return (
    <p className={styles.title}>
      {introduction ? (
        <div
          dangerouslySetInnerHTML={{
            __html: HtmlSanitizer.SanitizeHtml(introduction).replace(
              intValue,
              `<b>${roundedValue} ${unit} CO<sub>2</sub>e</b>`
            ),
          }}
        />
      ) : (
        <>
          La production de cet article émet{' '}
          <b>
            {roundedValue} {unit} CO<sub>2</sub>e
          </b>
        </>
      )}
    </p>
  )
}

export default Title
