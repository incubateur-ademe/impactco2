import React from 'react'
import Suggestion from 'components/layout/web/Suggestion'
import AccessibilitePage from 'components/pages/AccessibilitePage'

export default function Accessibilite() {
  return (
    <>
      <AccessibilitePage />
      <Suggestion fromLabel='Accessibilité' from='/accesibilite' simulatorName="de l'accessibilité du site" />
    </>
  )
}
