import React, { Dispatch, SetStateAction } from 'react'
import Modal from 'components/base/Modal'
import Link from 'components/base/buttons/Link'

export default function DevicesModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Modal setOpen={setOpen}>
      <h2>Moyenne des terminaux</h2>
      <p>Nous utilisons pour la valeur par défaut un agrégat de terminaux spécifique à chaque usage :</p>
      <p>
        <strong>Emails :</strong>
        <br />
        Ordinateur fixe + écran : 24 %
        <br />
        Ordinateur portable : 24 %
        <br /> Tablette : 8 %
        <br />
        Smartphone : 45 %
        <br />
      </p>
      <p>
        <strong>Recherche web :</strong>
        <br />
        Ordinateur fixe + écran : 24 %
        <br />
        Ordinateur portable : 24 %
        <br /> Tablette : 8 %
        <br />
        Smartphone : 45 %
        <br />
      </p>
      <p>
        <strong>Visioconférence :</strong>
        <br />
        Ordinateur fixe + écran : 0 %
        <br />
        Ordinateur portable : 100 %
        <br /> Tablette : 0 %
        <br />
        Smartphone : 0 %
        <br />
      </p>
      <p>
        <strong>Streaming vidéo :</strong>
        <br />
        Ordinateur fixe + écran : 0 %
        <br />
        Ordinateur portable : 15%
        <br /> Tablette : 10 %
        <br />
        Smartphone : 5 %
        <br />
        Télévision : 70 %
        <br />
      </p>
      <p>
        Ces chiffres sont basés sur ces deux études :<br />-{' '}
        <Link href='https://www.arcep.fr/uploads/tx_gspublication/rapport-barometre-numerique-edition-2021.pdf'>
          rapport-barometre-numerique-edition-2021.pdf
        </Link>
        <br />-{' '}
        <Link href='https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix/'>
          factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix
        </Link>
      </p>
    </Modal>
  )
}
