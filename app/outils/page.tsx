import React from 'react'
import Outils from 'components/outils/Outils'
import Suggestion from 'components/layout/web/Suggestion'

const OutilsPage = async () => {
  return (
    <>
      <Outils />
      <Suggestion from='/outils' fromLabel='Outils' simulatorName='du site' />
    </>
  )
}

export default OutilsPage
