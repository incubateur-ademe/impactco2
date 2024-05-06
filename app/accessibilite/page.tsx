import React from 'react'
import AccessibilitePage from 'src/views/AccessibilitePage'
import Suggestion from 'components/layout/Suggestion'

export default function Accessibilite() {
  return (
    <>
      <AccessibilitePage />
      <Suggestion fromLabel='Accessibilité' from='/accesibilite' simulatorName="de l'accessibilité du site" />
    </>
  )
}
