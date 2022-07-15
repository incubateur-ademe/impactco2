import React from 'react'

import Button from 'components/base/Button'
import ButtonLink from 'components/base/ButtonLink'

export default function Navigation(props) {
  return (
    <Button.Wrapper spacebetween>
      <ButtonLink
        type='button'
        onClick={props.gotoPrevQuestion}
        disabled={props.curQuestion === 0}
      >
        Précédent
      </ButtonLink>
      <Button type='submit' onClick={props.gotoNextQuestion}>
        Suivant
      </Button>
    </Button.Wrapper>
  )
}
