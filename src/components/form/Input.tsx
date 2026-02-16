'use client'

import classNames from 'classnames'
import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { ZodError } from 'zod'
import ErrorIcon from 'components/base/icons/error'
import useError from './errors'
import styles from './Input.module.css'

const Input = (
  {
    id,
    label,
    hint,
    errors,
    className,
    icon,
    iconAria,
    onIconClick,
    unit,
    unitTitle,
    secondaryUnitStyle,
    padding,
    onUnitClick,
    extraWidth,
    ...inputProps
  }: InputHTMLAttributes<HTMLInputElement> & {
    id: string
    label?: string
    hint?: string
    icon?: ReactNode
    iconAria?: string
    onIconClick?: () => void
    errors?: ZodError<Record<string, unknown>> | null
    unit?: ReactNode
    unitTitle?: string
    secondaryUnitStyle?: boolean
    padding?: 'sm' | 'lg'
    onUnitClick?: () => void
    extraWidth?: string
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const error = useError(id, errors)
  const internalRef = useRef<HTMLInputElement>(null)
  const unitRef = useRef<HTMLButtonElement>(null)
  const [unitDim, setUnitDim] = useState<{ width: number; height: number } | undefined>(undefined)

  // @ts-expect-error: Dans la doc...
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (internalRef.current) {
        internalRef.current.focus()
      }
    },
  }))

  useEffect(() => {
    if (internalRef.current) {
      const blur = () => internalRef.current?.blur()
      const currentRef = internalRef.current
      currentRef.addEventListener('wheel', blur, { passive: true })
      return () => currentRef.removeEventListener('wheel', blur)
    }
  }, [internalRef])

  useEffect(() => {
    if (unit) {
      const onResize = () => {
        if (unitRef.current) {
          const dim = unitRef.current.getBoundingClientRect()
          if (dim.width > 0 && dim.height > 0) {
            setUnitDim({ width: dim.width, height: dim.height })
          }
        }
      }
      window.addEventListener('resize', onResize)
      onResize()

      return () => {
        window.removeEventListener('resize', onResize)
      }
    }
  }, [unit, unitRef])

  return (
    <div className={className}>
      {label && (
        <label className={classNames(styles.label, { [styles.labelError]: !!error })} htmlFor={`input-${id}`}>
          {label}
          {inputProps.required && <span className={styles.required}> *</span>}
          {hint && <span className={classNames(styles.hint, 'text-sm')}>{hint}</span>}
        </label>
      )}
      <div
        className={styles.inputContainer}
        style={{ width: unitDim && extraWidth ? `calc(${extraWidth} + ${unitDim.width}px)` : undefined }}>
        <input
          className={classNames(styles.input, {
            [styles.withIcon]: icon,
            [styles.small]: padding === 'sm',
            [styles.large]: padding === 'lg',
            [styles.inputError]: !!error,
          })}
          title={inputProps.placeholder}
          {...inputProps}
          ref={internalRef}
          id={`input-${id}`}
          data-testid={`input-${id}`}
          style={{
            height: unitDim ? `calc(${unitDim.height}px + 1rem)` : undefined,
            paddingRight: unitDim ? `calc(${unitDim.width}px + 1.5rem)` : '1rem',
          }}
        />
        {icon && (
          <button className={styles.icon} aria-label={iconAria} onClick={onIconClick}>
            {icon}
          </button>
        )}
        {unit && (
          <button
            data-testid={`input-${id}-unit`}
            disabled={!onUnitClick}
            title={unitTitle}
            className={classNames(secondaryUnitStyle ? styles.secondaryUnit : styles.unit, {
              [styles.clickeable]: onUnitClick,
            })}
            ref={unitRef}
            onClick={onUnitClick}>
            {unit}
          </button>
        )}
      </div>
      {error && (
        <div className={classNames(styles.error, 'text-xs')}>
          <ErrorIcon />
          {error}
        </div>
      )}
    </div>
  )
}

export default forwardRef(Input)
