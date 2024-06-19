import React from 'react'
import Block from 'components/layout/Block'
import styles from './RendezVous.module.css'

const RendezVous = () => {
  return (
    <Block as='h1' title='Prendre rendez-vous' description='Besoin d’aide ou d’un accompagnement ?'>
      <iframe
        title='Formulaire de prise de rendez-vous'
        className={styles.iframe}
        src={process.env.CONNECT_IFRAME_RDV}
      />
    </Block>
  )
}

export default RendezVous
