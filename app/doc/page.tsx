import React from 'react'
import Doc from 'components/doc/Doc'
import Suggestion from 'components/layout/Suggestion'

const DocPage = () => {
  return (
    <>
      <Doc />
      <Suggestion from='/doc' fromLabel='Doc' simulatorName='de la documentation' />
    </>
  )
}

export default DocPage
