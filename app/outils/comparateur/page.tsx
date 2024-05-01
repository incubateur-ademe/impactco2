import React from 'react'
import ComparateurPage from 'components/outils/comparateur/ComparateurPage'
import Suggestion from 'components/layout/web/Suggestion'

const page = () => {
  return (
    <>
      <ComparateurPage />
      <Suggestion from='/outils/comparateur' fromLabel='Comparateur' simulatorName='du comparateur carbone' />
    </>
  )
}

export default page
