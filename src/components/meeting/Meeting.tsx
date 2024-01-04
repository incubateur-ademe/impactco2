import React from 'react'
import { Icon } from 'components/osezchanger/icons'
import { Arrow, StyledLink } from './Meeting.styles'

const Meeting = ({ from, fromLabel }: { from?: string; fromLabel: string }) => {
  return (
    <StyledLink asButton href={`/rendez-vous?${from ? `from=${from}&` : ''}fromLabel=${fromLabel}`}>
      Prendre rendez-vous{' '}
      <Arrow>
        <Icon iconId='full-arrow-right' />
      </Arrow>
    </StyledLink>
  )
}

export default Meeting
