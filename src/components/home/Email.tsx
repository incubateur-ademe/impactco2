import React from 'react'
import Card from 'components/cards/Card'
import styles from './Email.module.css'
import Meeting from './Meeting'

const Email = () => {
  return (
    <Card colored className={styles.card}>
      <span>Votre adresse email</span>
      <div>Nous vous recontacterons très prochainement pour échanger.</div>
      <Meeting from='Accueil' />
    </Card>
  )
}

export default Email
