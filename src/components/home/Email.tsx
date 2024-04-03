import React from 'react'
import Card from 'components/cards/Card'
import Meeting from './Meeting'

const Email = () => {
  return (
    <Card colored>
      <div className='title-h6'>Votre adresse email</div>
      <div>Nous vous recontacterons très prochainement pour échanger.</div>
      <Meeting from='Accueil' />
    </Card>
  )
}

export default Email
