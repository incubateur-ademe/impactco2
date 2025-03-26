import { useEffect, useRef } from 'react'
import Link from 'components/base/buttons/Link'
import CheckIcon from 'components/base/icons/check-round'
import DeleteIcon from 'components/base/icons/delete'
import styles from './FormResult.module.css'

const FormResult = ({
  success,
  title,
  description,
  back,
}: {
  success: boolean
  title: string
  description: string
  back: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [ref])

  return (
    <div ref={ref}>
      <p className={success ? styles.successTitle : styles.errorTitle}>
        <span className={success ? styles.successIcon : styles.errorIcon}>
          {success ? <CheckIcon /> : <DeleteIcon />}
        </span>
        <span className='text-lg'>
          <b>{title}</b>
        </span>
      </p>
      <p className={styles.description}>{description}</p>
      <Link internal href={success ? '/' : '#'} onClick={success ? undefined : back}>
        {success ? "Revenir à l'accueil" : 'Revenir au formulaire'}
      </Link>
    </div>
  )
}

export default FormResult
