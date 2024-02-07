import React from 'react'
import Logo from '../Logo'
import SimpleValue from '../SimpleValue'
import { HtmlSanitizer } from '../sanitizer'
import Equal from './Equal'
import styles from './Equivalent.module.css'

const Equivalent = ({
  className,
  baseValue,
  comparison,
  introduction,
}: {
  className?: string
  baseValue: string
  comparison: string
  introduction?: string
}) => {
  const intValue = Number.parseInt(baseValue)
  const value = Number.isNaN(intValue) ? 100000 : intValue

  const unit = value >= 1000 ? 'kg' : 'g'
  const unitValue = value >= 1000 ? value / 1000 : value
  const roundedValue = (Math.round(unitValue * 100) / 100).toLocaleString()

  return (
    <div className={className}>
      <p className={styles.title}>
        {introduction ? (
          <div
            dangerouslySetInnerHTML={{
              __html: HtmlSanitizer.SanitizeHtml(introduction).replace(
                intValue,
                `<b>${roundedValue} ${unit} CO<sub>2</sub>e</b>`
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
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo />
          <div>
            <div className={styles.value}>{roundedValue}</div>
            <div className={styles.label}>
              {unit} CO<sub>2</sub>e
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.equal}>
            <Equal />
          </div>
          <SimpleValue value={value} comparison={comparison} />
        </div>
      </div>
    </div>
  )
}

export default Equivalent
