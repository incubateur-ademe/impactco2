import React from 'react'
import MagicLink from 'components/base/MagicLink'
import { Icon } from 'components/osezchanger/icons'
import { Description, StyledIcon } from './FormResult.styles'

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
        <StyledIcon $success={success}>
          <Icon iconId={success ? 'check' : 'close'} />
        </StyledIcon>
        <span className='text-lg'>
          <b>{title}</b>
        </span>
      </div>
      <Description>{description}</Description>
      <MagicLink internal to={success ? '/' : '#'} onClick={success ? undefined : back}>
        {success ? "Retourner à l'accueil" : 'Retourner au formulaire'}
      </MagicLink>
    </div>
  )
}

export default FormResult
