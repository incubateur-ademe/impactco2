import React, { Dispatch, SetStateAction } from 'react'
import Modal from 'components/base/Modal'
import Link from 'components/base/buttons/Link'

export default function DetailsUsagesNumModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Modal setOpen={setOpen}>
      <h2>Les hypothèses sur cette page</h2>
      <p>
        L'ensemble des calculs sont issus d'une{' '}
        <Link
          priority='secondary'
          href='https://base-empreinte.ademe.fr/documentation/base-impact'
          title='Base impact, étude réalisée par Negaoctet'>
          étude réalisée par Négaoctet
        </Link>
        .
      </p>
      <h3>Pour l'email : </h3>
      <p>
        On considère un temps de rédaction de 3 minutes, et un seul destinataire par email qui lirait le message en 10
        secondes sur un appareil et un réseau équivalent à celui de l'expéditeur. L'email est considéré stocké pendant
        10 ans côté expéditeur et destinataire. Un poids de 75&thinsp;ko a été retenu pour un email sans pièce-jointe.
        L'ensemble de l'impact (expéditeur et destinataire) est attribué à l'expéditeur.
      </p>
      <h3>Pour le streaming :</h3>
      <p>
        On considère que les qualités "basse définition", "haute définition" et "4K" correspondent respectivement à des
        tailles de vidéos de 700&thinsp;Mo, 3&thinsp;Go et 7&thinsp;Go par heure. Les facteurs d'émission correspondants
        à la transmission des données au sein du réseau ont été fournis par NégaOctet. Les calculs relatifs aux
        data-centers ont été réalisés à partir de données qui concernent la plateforme Netflix.
      </p>
      <h3>Pour la visioconférence :</h3>
      <p>
        On considère 2 personnes par défault dans la visioconférence et que son impact est seulement celui associé à son
        emplacement dans la visioconférence. Les qualités "audio", "basse définition", "haute définition" correspondent
        respectivement à des tailles de vidéos de 164&thinsp;Mo, 700&thinsp;Mo et 3&thinsp;Go par heure. Concernant la
        transmission des données et les data-centers, les hypothèses utilisées pour le streaming ont été appliquées à la
        visioconférence.
      </p>
    </Modal>
  )
}
