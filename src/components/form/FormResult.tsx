import classNames from 'classnames'
import React from 'react'
import Link from 'components/base/buttons/Link'
import CheckIcon from 'components/base/icons/check'
import CloseIcon from 'components/base/icons/close'
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
  return (
    <div data-testid={`form-result-${success ? 'success' : 'error'}`}>
      <div>
        <div className={classNames(styles.icon, { [styles.error]: !success })}>
          {success ? <CheckIcon /> : <CloseIcon />}
        </div>
        <span className='text-lg'>
          <b>{title}</b>
        </span>
      </div>
      <div className={styles.description}>{description}</div>
      <Link internal href={success ? '/' : '#'} onClick={success ? undefined : back}>
        {success ? "Retourner à l'accueil" : 'Retourner au formulaire'}
      </Link>
    </div>
  )
}

export default FormResult
