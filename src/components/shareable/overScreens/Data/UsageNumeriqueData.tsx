import React from 'react'
import NewTabIcon from 'components/base/NewTabIcon'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const UsageNumeriqueData = () => {
  return (
    <>
      <div className={styles.content}>
        <div>
          L'ensemble des calculs sont issus d'une{' '}
          <Link href='https://base-empreinte.ademe.fr/documentation/base-impact'>étude réalisée par NégaOctet</Link>
        </div>
      </div>
      <div className={styles.title}>Hypothèses pour l’email</div>
      <div className={styles.content}>
        On considère un temps de rédaction de 3 minutes, et un seul destinataire par email qui lirait le message en 10
        secondes sur un appareil et un réseau équivalent à celui de l'expéditeur. L'email est considéré stocké pendant
        10 ans côté expéditeur et destinataire. Un poids de 75 ko a été retenu pour un email sans pièce-jointe.
        L'ensemble de l'impact (expéditeur et destinataire) est attribué à l'expéditeur.
      </div>
      <div className={styles.title}>Hypothèses pour le streaming</div>
      <div className={styles.content}>
        On considère que les qualités "basse définition", "haute définition" et "4K" correspondent respectivement à des
        tailles de vidéos de 700 Mo, 3 Go et 7 Go par heure. Les facteurs d'émission correspondants à la transmission
        des données au sein du réseau ont été fournis par NégaOctet. Les calculs relatifs aux data-centers ont été
        réalisés à partir de données qui concernent la plateforme Netflix.
      </div>
      <div className={styles.title}>Hypothèses pour le visioconférence</div>
      <div className={styles.content}>
        On considère 2 personnes par défaut dans la visioconférence et que son impact est seulement celui associé à son
        emplacement dans la visioconférence. Les qualités "audio", "basse définition", "haute définition" correspondent
        respectivement à des tailles de vidéos de 164 Mo, 700 Mo et 3 Go par heure. Concernant la transmission des
        données et les data-centers, les hypothèses utilisées pour le streaming ont été appliquées à la visioconférence.
      </div>
      <div className={styles.content}>
        <div>
          Pour plus de détails, consultez{' '}
          <Link href='/doc/usage-numerique/acv' title='Lien externe : documentation détaillée' target='_blank'>
            la documentation détaillée
            <NewTabIcon />
          </Link>
        </div>
      </div>
    </>
  )
}

export default UsageNumeriqueData
