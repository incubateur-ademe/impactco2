import React from 'react'
import Suggestion from 'components/layout/web/Suggestion'
import PolitiquePage from 'components/pages/PolitiquePage'

export default function Politique() {
  return (
    <>
      <PolitiquePage />
      <Suggestion
        fromLabel='Politique de confidentialité'
        from='/politique-de-confidentialite'
        simulatorName='de la politique de confidentialité'
      />
    </>
  )
}
