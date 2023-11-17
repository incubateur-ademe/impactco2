import React from 'react'
import { Icon } from '../icons'
import { Button } from './Information.styles'

const Information = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick}>
      <Icon iconId='information' />
    </Button>
  )
}

export default Information
