import classNames from 'classnames'
import { track } from 'utils/matomo'
import CustomParam, { CustomParamValue } from './CustomParam'
import styles from './CustomParam.module.css'

const CustomParams = ({
  title,
  hint,
  params,
  visibility,
  setVisibility,
  tracking,
  trackingType,
  integration,
}: {
  title?: string
  hint?: string
  params: Record<string, CustomParamValue>
  visibility?: Record<string, boolean>
  setVisibility?: (values: Record<string, boolean>) => void
  tracking: string
  trackingType: string
  integration?: boolean
}) => {
  return (
    <fieldset>
      {title && (
        <legend className={styles.title}>
          {title} {hint && <span className={classNames(styles.hint, 'text-sm')}>{hint}</span>}
        </legend>
      )}
      {Object.entries(params)
        .filter(([key]) => key !== 'theme')
        .map(([key, param]) => (
          <CustomParam
            key={key}
            tracking={tracking}
            slug={key}
            integration={integration}
            param={param}
            visible={visibility ? visibility[key] : true}
            setVisible={
              setVisibility
                ? (newVisibility) => {
                    track(tracking, `${trackingType} Custom visibility ${key}`, newVisibility ? 'vrai' : 'faux')
                    setVisibility({
                      ...visibility,
                      [key]: newVisibility,
                    })
                  }
                : undefined
            }
          />
        ))}
    </fieldset>
  )
}

export default CustomParams
