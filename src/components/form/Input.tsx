import classNames from 'classnames'
import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { ZodError } from 'zod'
import { Icon, IconId } from 'components/osezchanger/icons'
import styles from './Input.module.css'
import { Error, Hint, Label, NotRequired } from './Input.styles'
import useError from './errors'

const Input = ({
  id,
  label,
  hint,
  errors,
  className,
  icon,
  large,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string
  icon?: IconId
  label?: string
  hint?: string
  maxWidth?: string
  color?: 'secondary'
  background?: 'white'
  errors?: ZodError | null
  large?: boolean
}) => {
  const error = useError(id, errors)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      const blur = () => ref.current?.blur()
      const currentRef = ref.current
      currentRef.addEventListener('wheel', blur)
      return () => currentRef.removeEventListener('wheel', blur)
    }
  }, [ref])

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={`input-${id}`} $error={!!error}>
          {label}
          {!inputProps.required && <NotRequired> - Facultatif</NotRequired>}
          {hint && <Hint className='text-sm'>{hint}</Hint>}
        </Label>
      )}
      <div className={styles.inputContainer}>
        <input
          className={classNames(styles.input, { [styles.withIcon]: icon, [styles.large]: large })}
          {...inputProps}
          ref={ref}
          id={`input-${id}`}
        />
        {icon && (
          <div className={styles.icon}>
            <Icon iconId={icon} />
          </div>
        )}
      </div>
      {error && (
        <Error className='text-xs'>
          <Icon iconId='error' />
          {error}
        </Error>
      )}
    </div>
  )
}

export default Input
