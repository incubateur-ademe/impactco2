import classNames from 'classnames'
import React from 'react'
import styles from './Page.module.css'

const PolitiquePage = () => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <h1>Politique de confidentialité</h1>
      <p>
        La simulation et les calculs se font dans votre navigateur Web, donc nous ne collectons aucune données de
        simulation.
      </p>
      <br />
      <p>
        Cependant, nous suivons quelques informations sur votre utilisation du site, telles que les pages consultées, le
        temps passé, les interactions avec nos simulateurs et nos ressources dans l'unique but de l'améliorer.
      </p>
      <br />
      <p>Toutefois ce site n'utilise pas de cookies.</p>
      <br />
      <p>
        Nous sommes ainsi en conformité avec la réglementation « Cookies » de la CNIL et exemptés d’autorisation
        préalable. C’est pour cela que vous n’avez pas eu besoin de cliquer sur un bloc pour accepter le dépôt de
        cookies !
      </p>
    </div>
  )
}

export default PolitiquePage
