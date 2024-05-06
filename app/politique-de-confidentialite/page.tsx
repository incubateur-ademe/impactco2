import React from 'react'
import PolitiquePage from 'src/views/PolitiquePage'
import Suggestion from 'components/layout/Suggestion'

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
